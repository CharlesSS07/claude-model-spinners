# claude-model-spinners

**Your Claude Code spinner now tells you how smart your model is.**

Running Haiku on low effort?

```
✻ Eating paste…
```

Opus on max?

```
✻ Fixing the bug you haven't found yet…
```

Fable?

```
✻ Communing with the weights…
```

## Install

In a Claude Code terminal session, run:

```
/plugin install model-spinners --marketplace CharlesSS07/claude-model-spinners
```

Press `y` to add the marketplace, then pick a scope (user scope = every session). It turns on right away, no restart needed.

## How smart is smart?

Your model gets a base score, and your effort level nudges it up or down:

| | low | medium | high | xhigh | max |
|---|---|---|---|---|---|
| **Haiku**  | 🫠 vegetative | 🫠 vegetative | 🫠 vegetative | 🤪 dim | 🤪 dim |
| **Sonnet** | 🤪 dim | 🛹 scrappy | 🛹 scrappy | 🧐 thoughtful | 🧐 thoughtful |
| **Opus**   | 🛹 scrappy | 🧐 thoughtful | 🧐 thoughtful | 🧙 sage | 🧙 sage |
| **Fable**  | 🧙 sage | 🔮 oracular | 🔮 oracular | 🔮 oracular | 🔮 oracular |

Each tier has its own pile of verbs:

| Tier | Sounds like |
|---|---|
| 🫠 **vegetative** | Umm · Ahhh · Oh right yup · Licking the screen · Spelling "cat" with a K · Confidently hallucinating |
| 🤪 **dim** | Winging it · Copy-pasting from Stack Overflow · Commenting out the failing test · Dilly-dallying |
| 🛹 **scrappy** | Goofing around · Asking codex · sudo rm -rf / -ing · Force-pushing to main · --no-verify-ing |
| 🧐 **thoughtful** | Deliberating · Delegating · Weighing tradeoffs · Writing the test first · Ruminating |
| 🧙 **sage** | Grokking · Steelmanning · Holding the whole codebase in mind · Transmogrifying |
| 🔮 **oracular** | Divining · Scrying · Remembering the future · Solving it before you asked |

All 189 of Claude Code's stock spinner verbs are still in there, each sorted into the pile it deserves. The cooking ones (Sautéing, Julienning) and dance moves (Moonwalking, Sock-hopping) went to Sonnet. Honking and Waddling went where you'd expect. Then there are 80-odd new ones on top.

## Make it yours

Every verb lives in [`hooks/verbs.ts`](hooks/verbs.ts). Add your own, fork it, and send a PR with your best ones.

## Hacking on it

```sh
git clone https://github.com/CharlesSS07/claude-model-spinners
claude --plugin-dir ./claude-model-spinners   # run Claude Code with your local copy
claude plugin test ./claude-model-spinners    # run the tests
claude plugin validate ./claude-model-spinners
```

It's a Claude Code [function-hooks plugin](https://code.claude.com/docs). A `ui.render` hook rewrites the `Spinner` word. A `turn.step` hook records which effort level the main loop is using.

Caveat: Claude Code doesn't expose the effort level until the first model request of a session, so the very first spinner assumes medium.

## License

MIT
