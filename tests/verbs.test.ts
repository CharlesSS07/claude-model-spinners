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

describe('bad input', () => {
  test('a missing model falls back to sonnet instead of throwing', async () => {
    expect(tierFor(undefined as unknown as string, 'high')).toBe(2)
    expect(tierFor(null as unknown as string, 'max')).toBe(3)
  })

  test('prototype keys are not effort levels', async () => {
    for (const effort of ['constructor', 'toString', '__proto__', 'hasOwnProperty']) {
      expect(tierFor('claude-haiku-5-5', effort)).toBe(0)
      expect(tierFor('claude-opus-5-5', effort)).toBe(3)
    }
    expect(PILES[0]).toContain(pickVerb(tierFor('claude-haiku-5-5', 'constructor'), 'x'))
  })

  test('pickVerb takes a missing seed', async () => {
    expect(PILES[2]).toContain(pickVerb(2, undefined as unknown as string))
    expect(pickVerb(2, undefined as unknown as string)).toBe(pickVerb(2, ''))
  })

  test('effort levels ignore case', async () => {
    expect(tierFor('claude-opus-5-5', 'MAX')).toBe(4)
    expect(tierFor('claude-fable-5-1', 'LOW')).toBe(4)
    expect(tierFor('claude-sonnet-5-5', 'XHigh')).toBe(3)
  })
})

describe('register', () => {
  test('rewrites the Spinner word from the main loop\'s tier', async ($, on) => {
    on('session.model', async () => ({ value: 'claude-sonnet-5-5' }))
    let drawn: string | undefined
    on('ui.render', { component: 'Spinner' }, async (_, e) => {
      drawn = e.props.word
      return { type: 'Text', children: [e.props.word] }
    })
    on('turn.step', async function* (_, e) {
      return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: null }
    })

    const spin = async (word: string) => {
      await $.ui.render({
        surface: 'terminal', component: 'Spinner', requestId: 'main',
        props: { word, message: null, suffix: '…', mode: 'thinking' },
      })
      return drawn
    }
    const step = async (effort: 'low' | 'max', agentId?: string) => {
      const stream = $.turn.step({ turnId: 't', index: 0, model: 'claude-sonnet-5-5', effort, messageCount: 1, agentId })
      for await (const _ of stream) {}
      await stream.result
    }

    // Before any request the effort is unknown: Sonnet's medium.
    expect(await spin('Sauteing')).toBe(pickVerb(2, 'Sauteing'))
    await step('low')
    expect(await spin('Sauteing')).toBe(pickVerb(1, 'Sauteing'))
    // A subagent's effort leaves the main loop's alone.
    await step('max', 'agent-1')
    expect(await spin('Baking')).toBe(pickVerb(1, 'Baking'))
    await step('max')
    expect(await spin('Baking')).toBe(pickVerb(3, 'Baking'))
  })
})
