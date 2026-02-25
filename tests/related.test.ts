import { describe, it, expect } from 'vitest';
import { getRelatedPages, keyForPath, copyFor } from '../src/lib/related';

describe('related pages algorithm', () => {
  it('returns at most 3 related items', () => {
    const items = getRelatedPages('/services/settlement-support');
    expect(items.length).toBeLessThanOrEqual(3);
  });

  it('does not include the current page', () => {
    const items = getRelatedPages('/services/settlement-support');
    expect(items.every((i) => i.link !== '/services/settlement-support')).toBe(true);
  });

  it('is deterministic for the same path', () => {
    const a = getRelatedPages('/services/aged-care');
    const b = getRelatedPages('/services/aged-care');
    expect(JSON.stringify(a)).toEqual(JSON.stringify(b));
  });
});

describe('copy customization', () => {
  it('customizes copy for settlement-support', () => {
    const key = keyForPath('/services/settlement-support');
    const text = copyFor(key);
    expect(text.toLowerCase()).toContain('australia');
    expect(text.toLowerCase()).toContain('housing');
  });

  it('falls back to default when key unknown', () => {
    const text = copyFor(null);
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(10);
  });
});

