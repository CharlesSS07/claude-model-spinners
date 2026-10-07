// Spinner verbs sorted by brainpower. Every stock Claude Code verb lives in
// exactly one pile; the rest are new.

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
    // stock
    'Befuddling', 'Bunning', 'Discombobulating', 'Flummoxing', 'Honking',
    'Lollygagging', 'Waddling', 'Wibbling',
    // new
    'Umm', 'Ahhh', 'Oh right yup', 'Huh', 'Drooling', 'Eating paste',
    'Licking the screen', 'Staring blankly', 'Forgetting the question',
    'Counting on fingers', 'Sounding it out', 'Chewing crayons',
    'Walking into a glass door', 'Mouth-breathing', 'Buffering',
    'Asking mom', 'Losing the thread', 'Reading it upside down',
    'Typing with mittens', 'Pressing all the buttons', 'Forgetting how to blink',
    'Confidently hallucinating', 'Spelling "cat" with a K',
    'Nodding along', 'Thinking about lunch', 'Asking what a function is',
    'Reading the same line for the fourth time', 'Pressing Enter to see what happens',
    'Looking for the semicolon', 'Scratching butt', 'Scratching butt and sniffing fingers',
  ],
  // Haiku that's trying, or Sonnet phoning it in.
  1: [
    // stock
    'Dilly-dallying', 'Fiddle-faddling', 'Flibbertigibbeting', 'Frolicking',
    'Gallivanting', 'Hullaballooing', 'Kerfuffling', 'Meandering', 'Moseying',
    'Doodling', 'Noodling', 'Puttering', 'Scampering', 'Scurrying',
    'Skedaddling', 'Slithering', 'Smooshing', 'Tomfoolering', 'Topsy-turvying',
    'Wandering', 'Whatchamacalliting', 'Zigzagging', 'Canoodling',
    // new
    'Winging it', 'Guessing', 'Trying the other end',
    'Copy-pasting from Stack Overflow', 'Adding console.logs everywhere',
    'Ignoring the error', 'Hoping', 'Mashing tab', 'Turning it off and on',
    'Commenting out the failing test', 'Doing my best',
  ],
  // Sonnet's natural habitat: fast, loose, dangerous.
  2: [
    // stock
    'Actioning', 'Baking', 'Beboppin\'', 'Blanching', 'Boogieing',
    'Boondoggling', 'Booping', 'Bootstrapping', 'Brewing', 'Caramelizing',
    'Churning', 'Combobulating', 'Cooking', 'Crunching', 'Doing', 'Drizzling',
    'Finagling', 'Flambéing', 'Frosting', 'Garnishing', 'Gitifying',
    'Grooving', 'Hashing', 'Herding', 'Hyperspacing', 'Jitterbugging',
    'Julienning', 'Kneading', 'Leavening', 'Marinating', 'Moonwalking',
    'Newspapering', 'Onioning', 'Pouncing', 'Proofing', 'Razzle-dazzling',
    'Razzmatazzing', 'Recombobulating', 'Sautéing', 'Schlepping', 'Seasoning',
    'Shenaniganing', 'Shimmying', 'Simmering', 'Sock-hopping', 'Spinning',
    'Stewing', 'Swirling', 'Swooping', 'Tinkering', 'Twisting', 'Vibing',
    'Whirring', 'Whisking', 'Working', 'Wrangling', 'Zesting',
    // new
    'Goofing around', 'Asking codex', 'sudo rm -rf / -ing', 'Shipping it',
    'Force-pushing to main', 'Skipping the tests', 'Speedrunning',
    'YOLO-ing', 'Monkey-patching', 'Duct-taping', 'Hotfixing prod',
    '--no-verify-ing', 'Rebasing recklessly', 'Vibe coding',
  ],
  // Opus on a normal day, or Sonnet trying really hard.
  3: [
    // stock
    'Accomplishing', 'Architecting', 'Bloviating', 'Burrowing', 'Calculating',
    'Catapulting', 'Cerebrating', 'Choreographing', 'Clauding', 'Cogitating',
    'Composing', 'Computing', 'Concocting', 'Considering', 'Contemplating',
    'Crafting', 'Creating', 'Cultivating', 'Deciphering', 'Deliberating',
    'Determining', 'Effecting', 'Elucidating', 'Embellishing', 'Envisioning',
    'Fermenting', 'Forging', 'Forming', 'Galloping', 'Generating',
    'Germinating', 'Gesticulating', 'Harmonizing', 'Hatching', 'Ideating',
    'Imagining', 'Improvising', 'Incubating', 'Inferring', 'Infusing',
    'Mulling', 'Musing', 'Mustering', 'Nesting', 'Orchestrating',
    'Perambulating', 'Percolating', 'Perusing', 'Philosophizing', 'Polishing',
    'Pondering', 'Pontificating', 'Processing', 'Puzzling', 'Reticulating',
    'Roosting', 'Ruminating', 'Sketching', 'Spelunking', 'Sprouting',
    'Synthesizing', 'Tempering', 'Thinking', 'Thundering', 'Unfurling',
    'Unraveling',
    // new
    'Delegating', 'Weighing tradeoffs',
  ],
  // Opus at max, or Fable taking it easy.
  4: [
    // stock
    'Actualizing', 'Beaming', 'Billowing', 'Cascading', 'Channeling',
    'Coalescing', 'Crystallizing', 'Ebbing', 'Flowing', 'Fluttering',
    'Gusting', 'Ionizing', 'Levitating', 'Manifesting', 'Metamorphosing',
    'Misting', 'Nebulizing', 'Nucleating', 'Orbiting', 'Osmosing',
    'Photosynthesizing', 'Pollinating', 'Precipitating', 'Propagating',
    'Quantumizing', 'Sublimating', 'Symbioting', 'Transfiguring',
    'Transmogrifying', 'Transmuting', 'Undulating', 'Warping', 'Whirlpooling',
    // new
    'Grokking', 'Steelmanning', 'Proving it formally', 'Holding the whole codebase in mind',
    'Anticipating your next question', 'Fixing the bug you haven\'t found yet',
    'Seeing the architecture', 'Deleting code gracefully',
  ],
  // Fable proper.
  5: [
    // stock
    'Enchanting', 'Prestidigitating',
    // new
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
  const m = model.toLowerCase()
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
  return effort && effort in EFFORT_BUMP ? (effort as Effort) : 'medium'
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
  return pile[hash(seed) % pile.length] ?? 'Thinking'
}
