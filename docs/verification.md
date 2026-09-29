# Latest positioning pass — 2026-09-30

The latest work is recorded in [Brand copy and color](brand-copy-and-color.md), including AI-company messaging, curation-first preview behavior, palette roles, current screenshots and checks. Earlier passes remain below for history.

# Latest refinement — 2026-09-30

See [the quality review](quality-review-2026-09-30.md) for the latest audit, fixes, responsive checks, motion regression evidence and payload sizes. The record below is the earlier draft verification and remains for history. Its motion-pause check did not cover reading-position retention; that defect was discovered and corrected in this refinement.

# Verification — 2026-09-29

## Result

Local implementation ready for design review. Static production build passes. This is a first working direction, not an assertion that the user has approved the final brand/design. No deployment, GitHub push or PR was performed.

## Browser checks

Checked with Codex In-app Browser:

- 1536×1024: concept-sized desktop hero, vision, all three approach stages, Wellyn and footer. Browser scrollbar occupies 15 CSS pixels; content width is 1521px.
- 1280×720: hero CTA bottom at 691px, inside viewport. Pinned stage height 720px and step controls visible. Lower padding increased to avoid the motion toggle. No sustained horizontal overflow after ScrollTrigger resize settles.
- 768×1024: tablet uses the stacked layout and mobile navigation; no horizontal overflow.
- 390×844: hero, mobile navigation, diagram controls, Wellyn routine and footer; no horizontal overflow.
- Navigation: internal targets exist; section links and back-to-top work. Menu opens/closes; Escape closes and returns focus.
- Approach: desktop buttons navigate the pinned timeline; on mobile buttons change diagram and text directly. Correct selected state is announced.
- Routine: Evening changes the three visible rows; dry and warm weather selections change the associated description and note. Works with motion disabled.
- Motion pause: stops choreography, removes pin spacing, reveals content and keeps controls usable. Resume restores motion. Preference persists locally. CSS and JS handle `prefers-reduced-motion`; OS preference switching was not independently emulated.
- Disclosure: “A daily rhythm” expands and exposes its content.
- Contact: Copy email reports the actual address; existing mailto destination retained. No email was sent and mailbox delivery was not tested.
- Direct section URL: production reload at #wellyn lands at section top (observed 0.109px rounding difference). Fixed the initial fragment/GSAP pin-spacing/Lenis dimension timing issue.
- Production: font reports loaded, hero image complete with nonzero natural width, no broken internal anchors, no console warnings/errors observed.

## Build and payload

- `npm run build`: passed (Vite 7.3.6).
- `node --check script.js`: passed.
- `git diff --check`: passed.
- Dependency installation audit: 0 reported vulnerabilities at install time.
- Main JS: 141.96 kB / 53.39 kB gzip. CSS: 23.07 kB / 6.00 kB gzip. Font: 36.93 kB. Hero image: 71.9 kB (720px), 133.6 kB (1200px). These are build/asset sizes, not measured performance scores.
- No cross-browser matrix, physical-device test or Lighthouse score claimed.

## Fidelity ledger

Working references: `design/hero-concept.png`, `vision-concept.png`, `approach-concept.png`, `wellyn-concept.png`. Actual renders: `desktop-hero.png`, `desktop-vision.png`, `desktop-approach.png`, `desktop-wellyn.png`, `mobile-hero.png`, `mobile-wellyn.png`.

| Comparison | Evidence / initial difference | Action / disposition |
| --- | --- | --- |
| Hero hierarchy | Concept has dominant “you.”; first render was undersized | Increased desktop type to 22vw; separately capped short-laptop type so CTA stays visible. Reopened latest render with view_image alongside concept. |
| Hero palette and composition | Lavender ground, dark type, white pill navigation, right oval portrait | Preserved exact palette tokens and asymmetric composition. Generated portrait asset separately; face crop differs slightly from conceptual artwork. No tinted overlay. |
| Hero copy and navigation | Concept and rendered headings, support text, nav and primary CTA compared | Same visible copy. Added only the accessible motion control; no extra badge, claims or metrics. |
| Vision emphasis | Initial CSS variable animation had no explicit destination value, leaving highlight invisible | Set explicit final scale; verified lavender highlight in final production screenshot. White background preserved. |
| Approach geometry and behavior | Concept uses four context circles and three stages; laptop stage initially too tall | Real DOM/SVG keeps diagram metaphor; added actual converge/reveal/return choreography. Short viewport sizing and tablet breakpoint corrected. |
| Wellyn panel | Concept contains phone clock/avatar/cream thumbnails, plus a tilted frame | Intentionally omitted fictitious identity/device chrome; use meaningful line icons, real controls, explicit conceptual status and weather selection. Scroll tilt settles to upright for use. |
| Typography / controls | Concept has refined sans and clear rounded controls | Self-hosted variable DM Sans; live HTML type and consistent control typography. Concept-to-implementation wordmark scale is responsive rather than pixel-identical. |
| Footer / disclosures | Concept offers abbreviated intention/footer strip | Expanded into three open disclosure rows and genuine contact actions as recorded in design spec. No dummy policies, social links or signup success screen. |

Visual assessment: coherent, usable first implementation with the intended corporate hierarchy, color rhythm and purposeful motion. Hims was a structural and motion reference, not a fidelity target for copying proprietary design or assets. Final brand approval remains the user's review decision.
