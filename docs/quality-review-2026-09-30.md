# Dawnstar quality review — 2026-09-30

## Professional assessment

The first draft established a coherent company identity: confident typography, human photography, a restrained lavender/mint/ink palette, and a clear introduction to Wellyn. The next quality gain was in the execution of that idea: responsive spacing, meaningful choreography, interaction stability and precise language about the service's stage.

This pass materially improves those areas. It is a refined local corporate-site implementation, not a claim of industry-leading quality, a complete accessibility certification, or a launched product. A device/browser performance pass remains appropriate before public release.

## Audited journey and current health

| Step | Description | Initial finding | Current health |
| --- | --- | --- | --- |
| 1 | Arrive at the hero | CTA and lower signpost collided at some viewport heights; descender spacing was tight | Improved: height-aware type, dedicated lower space, refined small-screen ornaments |
| 2 | Read the company vision | Strong hierarchy; words were initially very faint during scroll | Good: earlier, clearer reveal; subdued accent still preserves the editorial rhythm |
| 3 | Understand the approach | 1900px pinned sequence was long relative to its visible changes; mostly fade-based transitions | Improved: 950–1300px adaptive sequence, context converges into a plan, feedback returns to the person; mobile controls precede the diagram |
| 4 | Explore Wellyn | Ornament competed with content; description implied skincare was the entire company ambition | Good: reduced ornament contrast, calmer demo reveal, broader wellness direction with skincare explicitly first; all interactions remain illustrative |
| 5 | Understand the longer horizon | Lifecycle direction had no expression | Added: a concise company-vision scene with original imagery, photo expansion and slow framing change; no live all-ages service claim |
| 6 | Read principles and contact | Working native disclosures/contact; could benefit from stronger technical consistency | Good: disclosure layout refresh and scroll dimensions synchronized; real contact copy action verified |

## Highest-priority defect fixed

Pausing motion in Wellyn removed a 1900px pin spacer above it and sent the reader into the footer. The rebuilt motion controller records the visible scene before changing layout and restores its viewport position afterward. During verification, Wellyn's top remained **0.094px** before and after pause, and after resume. Pausing/resuming while the second approach stage was selected preserved the plan and selected button.

The static diagram's center uses CSS `translate`, independently of GSAP transforms. Rebuilds dispose old animation contexts and ticker callbacks. Routine row animations are cleared when motion changes. External URL-fragment changes synchronize Lenis immediately so an in-flight scroll cannot pull the reader away from the requested section. Ambient hero loops stop when their scene is offscreen or the document is hidden.

## Creative decisions

- Preserve the approved first draft's identity and typography, rather than introduce another unrelated design direction.
- Use web-native motion for this company page: visitors control pacing by scrolling and can pause it. A video file was not necessary for the specific story and was not created.
- Use one original generated image of three generations' hands for the new lifecycle scene. It is symbolic brand imagery, not a customer story or evidence of outcomes.
- Separate the broad future ambition from the focused starting point in the visible copy and founder notes.
- Keep the page concise. The new scene is approximately offset on desktop by shortening the pinned sequence.

## Verification and evidence

Browser: Codex In-app Browser. Final inspected CSS viewports: 1440×900, 1280×720, 768×1024, 390×844 and 320×740. Extra short-height behavior was inspected while resizing. Viewport snapshots were evaluated after reload where the browser's resize transition temporarily differed from the requested size.

Verified navigation, mobile menu and Escape focus return, desktop and mobile approach selection, motion pause/resume and stage retention, morning/evening example routines, cool/dry and warm/humid choices, disclosure expansion, and contact-address copy feedback. No email was sent. Images loaded, anchor targets resolved, and no horizontal document overflow was observed at the checked sizes. No warning/error entries were observed in the browser console.

On the final 1280×720 hero, the CTA bottom was **570.32px** and lower signpost top **634px**, leaving **63.68px**. The pinned approach's stage controls ended at **662.11px**, within the 720px viewport.

Evidence screenshots were deliberately kept outside the source repository:

- `/private/tmp/dawnstar-polish-20260930/01-before-hero.png` — initial desktop issue.
- `/private/tmp/dawnstar-polish-20260930/04-before-motion-jump.png` — initial pause jump.
- `/private/tmp/dawnstar-polish-20260930/08-after-chapters.png` — new desktop lifecycle scene.
- `/private/tmp/dawnstar-polish-20260930/13-final-mobile-plan.png` — mobile control order.
- `/private/tmp/dawnstar-polish-20260930/16-final-laptop-hero.png` — short-desktop spacing correction.
- `/private/tmp/dawnstar-polish-20260930/17-final-laptop-plan.png` — pinned plan at laptop size.
- `/private/tmp/dawnstar-polish-20260930/19-final-tablet-chapters-settled.png` — tablet lifecycle composition.

## Build and practical limits

- `npm run check`, `npm run build`, `git diff --check`: passed.
- Main JS: **144.60kB / 54.11kB gzip**; CSS: **25.69kB / 6.63kB gzip**. The new lifecycle WebP is **42.2kB at 800px / 110.5kB at 1440px**, lazy loaded with responsive sources.
- No new runtime dependency. Prettier is development-only; source formatting and checks are repeatable.
- No physical-device matrix, Safari/Firefox matrix, Lighthouse measurement or assistive-technology certification was performed. OS reduced-motion handling is implemented but changing the actual OS setting was not tested independently; the manual static path was tested.
- No public deployment, push or PR was made. The local preview is the deliverable.
