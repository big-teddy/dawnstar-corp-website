# Dawnstar Corp

A corporate introduction for Dawnstar and its first service in development, Wellyn. English-language, responsive, motion-led single-page experience. The Wellyn product-curation and routine preview is an illustrative local interaction; there is no AI backend, checkout, account creation or email collection.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Vite builds the static site into `dist/`. Deploy with build command `npm run build` and output directory `dist` (Vercel configuration included). No environment variables required.

Production: [dawnstarcorp.com](https://dawnstarcorp.com/). The existing Vercel project is `dawnstar-corp-website` under `joshs-projects-741675c7`, connected to the GitHub repository's `main` branch.

## Structure

- `index.html`: semantic content, navigation, corporate narrative and demo structure.
- `style.css`: design system and responsive layouts.
- `script.js`: GSAP/ScrollTrigger choreography, Lenis desktop scrolling, accessible menu, motion preference and product comparison, selection transfer and routine states.
- `public/images/`: responsive, original generated editorial portrait, lifecycle imagery and transparent curation product assets.
- `design/`: working concept and implementation screenshots for review.
- `docs/brand-copy-and-color.md`: current AI positioning, product-curation copy and color roles.
- `docs/research-library.md`: retained research index and company-page versus future-service scope.
- `docs/release-readiness.md`: publication checks, verified domain and remaining operational evidence.
- `design/social-card.html`: editable source for the 1200×630 sharing image in `public/images/dawnstar-social.png`.
- `docs/service-storytelling.md`: current service research, product-display direction and scope.
- `docs/curation-image-prompts.md`: original product-image prompts and provenance.
- `docs/design-spec.md`: copy, visual/motion direction and intentional design adaptations.
- `docs/wellyn-product-direction.md`: founder lifecycle-wellness direction for the future service.
- `docs/verification.md`: checks performed and their limits.
- `THIRD_PARTY_NOTICES.md`: asset provenance and library licenses.

## Motion and accessibility

Hero orbit choreography, scroll-linked typography, a three-stage pinned diagram on desktop, product reveal and footer reveal. Touch scrolling stays native. On mobile the three-stage diagram is controlled directly by buttons. Operating-system reduced motion disables choreography by default. The persistent motion toggle saves the preference locally and preserves the current reading position and approach stage. Ambient loops pause outside their scene and when the tab is hidden. Without JavaScript, company content, disclosure rows and mail links remain available; the routine demo requires JavaScript.

## Content status

Wellyn is visibly marked **In development**. No customers, clinical results, research facilities, patents or launch dates are claimed. `contact@dawnstarcorp.com` is retained from the original repository; mailbox delivery has not been tested. The portrait is generated editorial imagery, not a customer endorsement.
