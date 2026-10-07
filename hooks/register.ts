import type { Register } from 'claude-code'

import { pickVerb, tierFor } from './verbs'

export const register: Register = on => {
  // The main loop's effort, as the last model request sent it. Unknown until
  // the first request, where the tier falls back to the model's medium.
  let effort: string | number | undefined

  on('turn.step', async function* ($, e, next) {
    if (!e.agentId) effort = e.effort
    return yield* next(e)
  })

  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const tier = tierFor(await $.session.model(), effort)
    const word = pickVerb(tier, e.props.word)
    return next({ ...e, props: { ...e.props, word } })
  })
}
