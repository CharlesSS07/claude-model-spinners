import { describe, expect, test } from 'claude-code/testing'

import { PILES, pickVerb, tierFor } from '../hooks/verbs'

describe('tierFor', () => {
  test('ranks model and effort together', async () => {
    expect(tierFor('claude-haiku-5-5', 'low')).toBe(0)
    expect(tierFor('Haiku 5.5', 'high')).toBe(0)
    expect(tierFor('claude-sonnet-5-5', 'low')).toBe(1)
    expect(tierFor('claude-sonnet-5-5', 'high')).toBe(2)
    expect(tierFor('claude-sonnet-5-5', 'max')).toBe(3)
    expect(tierFor('claude-opus-5-5', 'high')).toBe(3)
    expect(tierFor('claude-opus-5-5', 'xhigh')).toBe(4)
    expect(tierFor('claude-fable-5-1', 'low')).toBe(4)
    expect(tierFor('claude-fable-5-1', 'max')).toBe(5)
  })

  test('maps thinking budgets and unknowns', async () => {
    expect(tierFor('claude-opus-5-5', 1_000)).toBe(2)
    expect(tierFor('claude-opus-5-5', 64_000)).toBe(4)
    expect(tierFor('claude-opus-5-5', undefined)).toBe(3)
    expect(tierFor('some-other-model', 'medium')).toBe(2)
  })
})

describe('piles', () => {
  test('hold each verb once, every pile stocked', async () => {
    const all = Object.values(PILES).flat()
    expect(new Set(all).size).toBe(all.length)
    for (const pile of Object.values(PILES)) {
      expect(pile.length).toBeGreaterThan(10)
    }
    expect(PILES[0]).toContain('Scratching butt')
  })

  test('pickVerb is stable per seed and stays in its pile', async () => {
    expect(pickVerb(0, 'Sauteing')).toBe(pickVerb(0, 'Sauteing'))
    expect(PILES[5]).toContain(pickVerb(5, 'Baking'))
  })
})
