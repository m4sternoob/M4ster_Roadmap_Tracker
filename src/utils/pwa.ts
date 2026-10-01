import { Workbox } from 'workbox-window';
import { openDB } from 'idb';

interface PWAInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('installed', (event: any) => {
        if (!event.isUpdate) {
          console.log('Service worker installed for offline support');
        } else {
          console.log('Service worker updated');
          // Show update available notification
          showUpdateNotification();
        }
      });

      wb.addEventListener('waiting', () => {
        console.log('Service worker waiting to activate');
      });

      wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      wb.register().catch((error: any) => {
        console.log('Service worker registration failed:', error);
      });
    });
  }
}

function showUpdateNotification() {
  // Create a subtle notification banner
  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.className =
    'fixed bottom-4 right-4 z-50 bg-primary-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in';
  banner.innerHTML = `
    <span>New version available!</span>
    <button id="sw-update-btn" class="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm font-medium">Refresh</button>
    <button id="sw-dismiss-btn" class="text-white/70 hover:text-white">✕</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('sw-update-btn')?.addEventListener('click', () => {
    window.location.reload();
  });

  document.getElementById('sw-dismiss-btn')?.addEventListener('click', () => {
    banner.remove();
  });

  // Auto-dismiss after 30 seconds
  setTimeout(() => banner.remove(), 30000);
}

export async function initOfflineDB() {
  return openDB('m4ster-tracker-offline', 1, {
    upgrade(db) {
      // Store for pending mutations when offline
      db.createObjectStore('pending-mutations', { keyPath: 'id', autoIncrement: true });
      // Store for cached issues
      const issueStore = db.createObjectStore('cached-issues', { keyPath: 'id' });
      issueStore.createIndex('by-status', 'status');
      issueStore.createIndex('by-epic', 'epicId');
      issueStore.createIndex('by-sprint', 'sprintId');
    },
  });
}

export async function queueMutation(mutation: { type: string; payload: any }) {
  const db = await initOfflineDB();
  await db.add('pending-mutations', { ...mutation, timestamp: Date.now() });
}

export async function processPendingMutations() {
  const db = await initOfflineDB();
  const mutations = await db.getAll('pending-mutations');

  for (const mutation of mutations) {
    try {
      // Process based on mutation type
      // This would sync with the actual store
      console.log('Processing mutation:', mutation);
      await db.delete('pending-mutations', mutation.id);
    } catch (error) {
      console.error('Failed to process mutation:', mutation, error);
    }
  }
}

export function installPWA() {
  let deferredPrompt: PWAInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as PWAInstallPromptEvent;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    hideInstallButton();
    deferredPrompt = null;
  });

  function showInstallButton() {
    if (document.getElementById('pwa-install-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'pwa-install-btn';
    btn.className =
      'fixed bottom-4 left-4 z-40 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 animate-slide-in';
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Install App
    `;
    btn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install outcome:', outcome);
        deferredPrompt = null;
        hideInstallButton();
      }
    });
    document.body.appendChild(btn);

    // Auto-hide after 10 seconds if not clicked
    setTimeout(hideInstallButton, 10000);
  }

  function hideInstallButton() {
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.remove();
  }
}

export function setupOnlineOfflineHandlers() {
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    console.log('Network status:', isOnline ? 'online' : 'offline');

    // Show offline indicator
    let indicator = document.getElementById('offline-indicator');
    if (!isOnline) {
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.className =
          'fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white text-center py-1 text-sm animate-slide-in';
        indicator.textContent = 'You are offline. Changes will sync when reconnected.';
        document.body.prepend(indicator);
      }
    } else if (indicator) {
      indicator.remove();
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

export function initPWA() {
  registerServiceWorker();
  initOfflineDB().catch(console.error);
  installPWA();
  setupOnlineOfflineHandlers();
}
