# Dawnstar — motion direction

2026-09-29. Implementation proposal authorized by the user; generated concepts are working references, not an assertion of user design signoff.

## Brand / scope
Corporate website for Dawnstar Corp. Wellyn is the first service, in development. Initial US/English skincare guidance. No medical, clinical, patent, lab, efficacy, customer-count or live-service claims. Existing repository contact address retained: contact@dawnstarcorp.com.

## Design lock
- Desktop concept canvases: 1536 × 1024. Fluid implementation and laptop/mobile adaptations.
- DM Sans variable, modern editorial grotesk. Body 18–22px; main heading 7.8vw; hero `you.` 18vw; large Wellyn 15vw. Slight negative tracking.
- Ink #28252b; lavender #e6e6f4; mint #dceacb; white #fff; cream only inside demo #f7f5ef. Never wash hero photograph with a tint.
- Gutters 5vw / mobile 24px. Controls 48px+ tall, rounded pills, 15–17px. No cards except the single interactive product concept.
- Text wordmarks (no invented raster logo), thin elliptical lines as a persistent motion motif, open typography blocks.
- Icon inventory: arrow up-right/down; four 1.5px stroke icons sun, bottle, heart, feedback wave; play/pause, menu. Inline SVG currentColor, 24px control / 38px diagram, decorative icons hidden from assistive technology.

## Scenes / motion
1. Lavender human hero. Copy: `A little more you.`; `We’re building AI that makes everyday wellness feel personal.`; `Meet Wellyn`; `Thoughtfully human. Intelligently personal.` Nav: dawnstar / Our vision / Our approach / Wellyn / Get in touch. Oval portrait, orbital text and line rotation, intro text reveal, scroll transforms portrait/ellipses. No extra hero badges.
2. White vision: `Personal care should feel personal. Not complicated.` Word-by-word scroll reveal; lavender emphasis grows into place. Supporting copy exactly from vision concept.
3. Mint approach. `Your life. Your skin. Your kind of care.` Orbit diagram of environment, shelf, preferences and feedback, centered on `you`. Desktop pinned sequence: understand → simple plan → evolving loop. Visible step controls allow direct navigation; compact mobile interaction without long pinning. All explanation remains in DOM.
4. Dark Wellyn: `Less searching. More living.` Large brand, developer-state label; real HTML routine demo. Morning/evening and climate scenarios are local illustrative states, explicitly marked a concept. Scroll tilt resolves into usable straight panel; no motion while interacting.
5. Intention open rows: clearer choices, daily rhythm, room to change. Concise product principles, editable disclosure details.
6. Lavender contact: `Let’s shape what’s next.` Mailto link and copy address button. Large company wordmark. No fake email signup backend, fabricated privacy policy or unavailable social links.

## Intentional concept adaptations
- Use semantic functional HTML, no phone hardware, fictitious avatar, fake OS clock or decorative cream thumbnails from generated demo. Small line icons replace thumbnails to communicate routine roles.
- Add weather controls and a clearly visible `Illustrative concept` label to explain the user's specific seasonal idea truthfully.
- Intention band extended to open disclosure rows to explain the company's commitments; footer expanded for real contact.
- Mobile hero becomes stacked type and portrait; large diagram becomes 2×2 context with center, and steps selected by buttons.
- Focus/keyboard controls and global motion pause added as accessibility requirements. OS reduced motion defaults to paused, content remains visible.

## Assets / libraries
- Hero: original AI-generated editorial portrait extracted via image generation from the concept; illustrative person, not customer testimonial. WebP responsive sizes, no Hims proprietary assets.
- GSAP + ScrollTrigger: official Standard No Charge license; commercial site use permitted. Not described as MIT.
- Lenis: MIT. DM Sans: OFL, self-hosted via Fontsource. Vite: MIT. Lockfile committed with source.
- Reference: https://www.hims.com/about — structure and motion ambition, not a pixel clone.

## Responsive / functionality
No horizontal overflow at 390, 768, 1440/1536 widths. Scroll links work without JS. Text and content default visible. Keyboard reachable menu/demos/disclosures/contact. Motion pause rebuilds GSAP context, resets transforms and stops Lenis. Only transforms/opacity animated where practical. Images include dimensions and lazy loading where below fold. Product concept is local only; no user inputs collected or external AI requests.

## Refinement — 2026-09-30

The founder approved the working direction as a strong draft and requested professional design/technical refinement. The palette and core composition remain; this is a detail and interaction pass, not a new visual identity.

- Hero type responds to both viewport width and height. The CTA and lower signpost have independent space; the text descender has additional breathing room. Small mobile layouts omit the tiny curved ornament lettering.
- Desktop approach pin now spans 950–1300px rather than 1900px, adapting to viewport height. Context nodes physically converge at the person's position, then a staggered plan resolves; feedback restores the orbit. Desktop pin requires at least 901px width and 640px height.
- Static center alignment uses CSS `translate`, independent of GSAP's animated transform. Motion toggles preserve the visible scene and selected stage; repeated rebuilds restore and dispose contexts cleanly.
- Ambient hero loops pause outside the viewport and when the document is hidden. The decorative vision thread is scroll driven, not continuously looping.
- Wellyn's frame settles before interaction; the background orbit is visually subdued. The description now distinguishes wellness ambition from the first skincare use case.
- New short company scene after Wellyn: **Care for every chapter.** Three generations' hands express lifecycle wellness. The original generated editorial image expands from the established oval motif into an open photograph while its framing slowly settles. No video file or filmed customer story is claimed.
- Mobile approach controls appear before the diagram, keeping the selected state close to its visual result. Primary controls have 44px minimum targets. Paragraphs in the demo are slightly larger.
- Source HTML/CSS/JS is formatted. `npm run check` covers JavaScript syntax and source formatting. No new runtime dependency was introduced.

Long-term founder direction is preserved in `wellyn-product-direction.md`. The new scene is a company vision, not a launched all-ages service.


## Positioning and color refinement — later 2026-09-30

`brand-copy-and-color.md` is the current authority for copy and palette; it supersedes the earlier mint scene assignments and routine-first product preview above. Product curation now precedes buying decisions and ongoing care. The existing narrative/motion system remains, with updated scene wording and a two-view local product example.
