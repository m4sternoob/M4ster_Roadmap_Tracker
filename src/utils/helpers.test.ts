import { describe, it, expect } from 'vitest';
import { generateIssueKey, generateEpicKey, formatDate, isOverdue, initials } from '@/utils/helpers';

describe('helpers', () => {
  describe('generateIssueKey', () => {
    it('generates correct issue key', () => {
      const project = {
        key: 'MT',
        nextIssueNumber: 1,
      } as any;
      expect(generateIssueKey(project)).toBe('MT-1');
    });

    it('increments with nextIssueNumber', () => {
      const project = {
        key: 'RT',
        nextIssueNumber: 42,
      } as any;
      expect(generateIssueKey(project)).toBe('RT-42');
    });
  });

  describe('generateEpicKey', () => {
    it('generates correct epic key', () => {
      const project = {
        key: 'MT',
        epics: [],
      } as any;
      expect(generateEpicKey(project)).toBe('MT-E1');
    });

    it('increments with epic count', () => {
      const project = {
        key: 'MT',
        epics: [{}, {}, {}],
      } as any;
      expect(generateEpicKey(project)).toBe('MT-E4');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date string', () => {
      const result = formatDate('2024-01-15T10:30:00Z');
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });
  });

  describe('isOverdue', () => {
    it('returns false for future date', () => {
      const future = new Date(Date.now() + 86400000).toISOString();
      expect(isOverdue(future)).toBe(false);
    });

    it('returns true for past date', () => {
      const past = new Date(Date.now() - 86400000).toISOString();
      expect(isOverdue(past)).toBe(true);
    });

    it('returns false for undefined', () => {
      expect(isOverdue(undefined)).toBe(false);
    });
  });

  describe('initials', () => {
    it('extracts initials from full name', () => {
      expect(initials('John Doe')).toBe('JD');
      expect(initials('Alice')).toBe('A');
      expect(initials('  Bob  Smith  ')).toBe('BS');
    });

    it('handles multiple spaces', () => {
      expect(initials('John  Middle  Doe')).toBe('JM');
    });
  });
});