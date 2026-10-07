// Spinner verbs sorted by brainpower: the best of Claude Code's stock verbs,
// each in the pile it deserves, plus a lot of worse (and better) ones.

export type Tier = 0 | 1 | 2 | 3 | 4 | 5

export const TIER_NAMES = [
  'vegetative',
  'dim',
  'scrappy',
  'thoughtful',
  'sage',
  'oracular',
] as const

export const PILES: Record<Tier, readonly string[]> = {
  // Haiku at low effort: the lights are on, nobody is home.
  0: [
    'Honking', 'Waddling', 'Discombobulating',
    'Umm', 'Ahhh', 'Oh right yup', 'Drooling', 'Eating paste',
    'Licking the screen', 'Forgetting the question', 'Counting on fingers',
    'Chewing crayons', 'Walking into a glass door', 'Mouth-breathing',
    'Asking mom', 'Reading it upside down', 'Typing with mittens',
    'Pressing all the buttons', 'Forgetting how to blink',
    'Confidently hallucinating', 'Spelling "cat" with a K',
    'Nodding along', 'Thinking about lunch', 'Asking what a function is',
    'Reading the same line for the fourth time', 'Pressing Enter to see what happens',
    'Looking for the semicolon', 'Scratching butt', 'Scratching butt and sniffing fingers',
  ],
  // Haiku that's trying, or Sonnet phoning it in.
  1: [
    'Dilly-dallying', 'Flibbertigibbeting', 'Tomfoolering', 'Whatchamacalliting',
    'Winging it', 'Trying the other end', 'Copy-pasting from Stack Overflow',
    'Adding console.logs everywhere', 'Ignoring the error', 'Hoping',
    'Mashing tab', 'Turning it off and on', 'Commenting out the failing test',
  ],
  // Sonnet's natural habitat: fast, loose, dangerous.
  2: [
    'Vibing', 'Moonwalking', 'Sock-hopping', 'Beboppin\'', 'Shenaniganing',
    'Razzmatazzing', 'Boondoggling', 'Gitifying', 'Onioning',
    'Goofing around', 'Asking codex', 'sudo rm -rf / -ing', 'Shipping it',
    'Force-pushing to main', 'Skipping the tests', 'YOLO-ing',
    'Monkey-patching', 'Duct-taping', 'Hotfixing prod', '--no-verify-ing',
    'Rebasing recklessly', 'Vibe coding',
  ],
  // Opus on a normal day, or Sonnet trying really hard.
  3: [
    'Architecting', 'Bloviating', 'Cerebrating', 'Choreographing', 'Clauding',
    'Cogitating', 'Contemplating', 'Deciphering', 'Deliberating', 'Elucidating',
    'Imagining', 'Mulling', 'Orchestrating', 'Perambulating', 'Philosophizing',
    'Pondering', 'Pontificating', 'Reticulating', 'Ruminating',
    'Delegating', 'Weighing tradeoffs',
  ],
  // Opus at max, or Fable taking it easy.
  4: [
    'Channeling', 'Crystallizing', 'Levitating', 'Manifesting', 'Metamorphosing',
    'Photosynthesizing', 'Quantumizing', 'Sublimating', 'Transfiguring',
    'Transmogrifying', 'Transmuting',
    'Grokking', 'Steelmanning', 'Proving it formally', 'Holding the whole codebase in mind',
    'Anticipating your next question', 'Fixing the bug you haven\'t found yet',
    'Seeing the architecture', 'Deleting code gracefully',
  ],
  // Fable proper.
  5: [
    'Enchanting', 'Prestidigitating',
    'Divining', 'Prophesying', 'Scrying', 'Communing with the weights',
    'Transcending', 'Beholding', 'Remembering the future', 'Folding spacetime',
    'Knowing', 'Seeing every branch at once', 'Unasking the question',
    'Consulting the Akashic records', 'Ascending', 'Becoming',
    'Reading the prophecy in your stack trace', 'Solving it before you asked',
  ],
}

export type Effort = 'low' | 'medium' | 'high' | 'xhigh' | 'max'

const MODEL_BASE: Record<string, number> = { haiku: 0, sonnet: 2, opus: 3, fable: 5 }
const EFFORT_BUMP: Record<Effort, number> = { low: -1, medium: 0, high: 0, xhigh: 1, max: 1 }

export function modelFamily(model: string): keyof typeof MODEL_BASE {
  const m = String(model ?? '').toLowerCase()
  for (const family of ['fable', 'opus', 'sonnet', 'haiku'] as const) {
    if (m.includes(family)) return family
  }
  return 'sonnet'
}

/** A level as given, or an integer thinking budget mapped onto the levels. */
export function normalizeEffort(effort: string | number | undefined): Effort {
  if (typeof effort === 'number') {
    if (effort < 4_000) return 'low'
    if (effort < 16_000) return 'medium'
    if (effort < 32_000) return 'high'
    return 'max'
  }
  const level = typeof effort === 'string' ? effort.toLowerCase() : ''
  return Object.hasOwn(EFFORT_BUMP, level) ? (level as Effort) : 'medium'
}

export function tierFor(model: string, effort: string | number | undefined): Tier {
  const score = (MODEL_BASE[modelFamily(model)] ?? 2) + EFFORT_BUMP[normalizeEffort(effort)]
  return Math.max(0, Math.min(5, score)) as Tier
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Picks from the tier's pile, keyed on the engine's own sampled word so the
 * choice holds steady for a turn and changes with the next one.
 */
export function pickVerb(tier: Tier, seed: string): string {
  const pile = PILES[tier]
  return pile[hash(String(seed ?? '')) % pile.length] ?? 'Thinking'
}
