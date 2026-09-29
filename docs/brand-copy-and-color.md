# Dawnstar / Wellyn — positioning, copy and color

2026-09-30. Current positioning and copy following the company-scope clarification and wording audit.

This document is the current wording reference. [Service storytelling](service-storytelling.md) and the [Hims home audit](hims-home-visual-audit.md) preserve research and earlier implementation rationale; their suggested labels and scene expansions are not instructions to expand the corporate page. Verification at the end of this document describes an earlier pass.

## Positioning

**Dawnstar is an AI wellness company building more personal care for every stage of life. Wellyn is its first service in development: product curation and purchase guidance, with care that continues afterward.**

The founder clarified that product discovery, curation and purchase decisions are the core of Wellyn. Routines demonstrate continuity after a purchase; they must not replace the core proposition in the story or the first product example. The intended future business includes product sales/affiliate commerce, with Shopify considered for the service build. This corporate page does not implement those transactions.

## Message hierarchy

1. **Company identity:** `An AI wellness company` appears in the hero. Keep `A little more you.` as the emotional headline. Explain the actual work immediately: `We’re building AI to help you choose personal care products that fit your life.`
2. **Purpose:** `Personal care. For every one of us.` expresses access. `Personal attention shouldn’t be a luxury.` explains premium care in terms of attention to preferences, budget and everyday life.
3. **Mechanism:** `A shortlist. Shaped around you.` introduces personal context, product comparison and ongoing support. The descriptions explicitly discuss recommendations in development.
4. **First service:** `Curated for you. Chosen by you.` keeps user control clear. Describe Wellyn as `Your personal wellness AI`, followed by product comparison, deciding what to buy and using what someone already owns. `Starting with skincare` and `In development` are adjacent.
5. **Continuity:** `Care for every chapter.` expresses long-term lifecycle wellness, including a child's first lotion and later-life needs, while preserving the distinction between ambition and the first skincare use case.
6. **Principles:** `Fewer products to compare.`, `A reason for each suggestion.` and `Support after the purchase.` express the intended product standard. Commercial relationships and missing information should be visible, and a useful recommendation may be to keep existing products.

Footer description: **AI for everyday wellness.** Avoid repeating a slogan at every transition.

## Agent, coach or guide

The current public wording is **Your personal wellness AI**. **Personal wellness agent** is a possible long-term product direction, and **coach** describes a future routine/habit-support role. `Guide` was an interim description; it is understandable but too narrow to carry the full product identity. This is positioning advice, not a founder-approved final category name or a claim that an agent has been implemented.

Coach overemphasizes ongoing behavior relative to Wellyn’s core purchase-decision role. Agent can fit broader research and comparison work, but its delegated tasks, tools, data sources and approval boundaries are still undefined. [Anthropic’s primary explanation](https://www.anthropic.com/engineering/building-effective-agents) distinguishes agents that dynamically direct process and tool use from predefined workflows while recognizing varied usage of the term. The current illustrative page is a fixed interaction, not an agent.

Before describing the shipped product as an agent, define what it can research, compare, remember and change, what requires confirmation and how it communicates uncertainty. Automatic purchasing is not an implied requirement.

## Copy rules

- Keep a few distinctive brand headlines; make supporting text and controls concrete.
- Do not stack abstract phrases such as `personal intelligence`, `thoughtful commerce`, `more life`, `next chapter` and `built with intention`.
- Explain AI through its intended work: compare information, narrow options, explain trade-offs, support use. Do not substitute generic intelligence claims for a clear benefit.
- Use development language for planned behavior. The homepage is a company introduction, not a catalog or a launched app.
- Make controls describe what this page does. The local example compares two illustrative profiles; it does not search a catalog or generate a recommendation.

The brand uses “premium” to mean personal attention, considered choices and continuity. It should remain welcoming. There are no invented concierge teams, clinical guarantees, patented matching systems, laboratories, real customer quotes, eligibility promises or claims that AI already equals a licensed professional.

## Product preview

The default Wellyn panel is **Compare products**, followed by **See the routine**. A visitor can change an illustrative texture preference, compare two product profiles, see reasons and trade-offs and carry the same selection into a routine. Weather changes prompt a check-in without silently replacing the chosen product.

These are generic illustrative profiles, not actual retailer products. No invented price, stock availability, match percentage, scientific effectiveness score, checkout success or live recommendation is shown. The notice says responses are preset and this is not a live AI recommendation. No profile data is sent to a server.

## Color assessment and implemented roles

The earlier combination was coherent but gave two large green sections as much visual weight as the lavender identity and dark service scene. In this design assessment, that emphasis leaned toward a skincare brand and weakened the sense of one corporate system.

| Color | Token | Role |
| --- | --- | --- |
| Lavender | `#E7E3F1` | Primary identity: hero, footer, emphasis and selected product context |
| Plum ink | `#28232E` | Main type and controls; dark Wellyn product introduction |
| White | `#FFFFFF` | Clear, open company vision and principles |
| Soft neutral | `#F1F0F5` | AI explanation scene and quiet supporting surfaces |
| Warm paper | `#F7F5EF` | Human lifecycle scene and product preview interior |
| Sage | `#DCE5D9` | Small state/status accents only: selection marker, routine selection, development dot |

The green full-section backgrounds were removed. Whites and warm paper act as neutral surfaces, not competing brand accents. Existing photography remains untinted. Motion, precise typography and clear explanations carry the technology identity together with the wording; no unrelated neon accent or decorative technology motif was added.

## Historical verification — earlier positioning pass

| Step | Surface | Current health / finding |
| --- | --- | --- |
| 1 | Hero / company vision | Clearer AI identity and democratization message; hero layout retains its existing spacing |
| 2 | AI approach | Product shortlist and choice rationale are now explicit; former large green field is a quiet neutral |
| 3 | Wellyn discovery → decision → care | Core value now appears first; preference, comparison and selected-product transfer work locally |
| 4 | Lifecycle / principles | Broader ambition and continued care remain distinct from launch-ready features; principle headings prioritize the buying decision |

Evidence is in `/private/tmp/dawnstar-positioning-20260930/`. Images were captured from the running local site and opened for inspection. The initial approach capture showed the hero instead and was rejected/replaced. Accepted files include `04-after-hero.png`, `06-after-vision.png`, `07-after-approach.png`, `08-after-principles.png`, `09-mobile-curation.png`, and `11-small-mobile-routine.png`. The final desktop preview is captured separately after the last copy adjustment.

Checked in Codex In-app Browser at 1440×900, 1280×720, 390×844 and 320×740. No horizontal document overflow or broken internal targets observed. Preference changes select the corresponding profile; manually choosing an alternative gives a trade-off explanation. Selection transfers to the routine and survives period/weather changes. Keyboard activation and selected-state attributes were checked. On a small screen the continuation action brings the new view's title and controls into view.

Selected computed color pairs: primary text on paper **14.06:1**, secondary text on selected product **5.36:1**, inactive view label on paper **4.59:1**, caption on plum **8.53:1**. These checks do not constitute a complete accessibility certification.

No public deployment, live recommendation backend, purchase flow or service launch was performed. Device/browser coverage remains limited to this local review environment.

Final checks: `npm run check`, `npm run build`, and `git diff --check` passed. Final production JS is 146.24kB (54.60kB gzip), CSS 29.31kB (7.33kB gzip), with no added runtime dependency. No console warnings/errors were observed during the new flow checks. Pointer selection also verified with motion enabled. `13-final-lifecycle.png` and `14-final-curation.png` were inspected and accepted as final desktop evidence. The preview is left on Wellyn with products shown first and motion enabled.
