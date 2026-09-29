# Third-party notices and asset provenance

- **GSAP 3.15.0 / ScrollTrigger** — GreenSock Standard No Charge License. Commercial website use is permitted by the published terms. GSAP is not described as MIT/open source. https://gsap.com/community/standard-license/
- **Lenis 1.3.26** — MIT. https://github.com/darkroomengineering/lenis
- **DM Sans / Fontsource** — font under SIL Open Font License 1.1; Fontsource tooling/metadata under its packaged license. Font self-hosted from @fontsource-variable/dm-sans 5.3.0. https://github.com/googlefonts/dm-fonts and https://fontsource.org/fonts/dm-sans
- **Vite 7.3.6** — MIT. https://github.com/vitejs/vite

Exact dependency versions and transitive packages are in package-lock.json. Installed packages retain their license files.

## Visual assets

Hero portrait and working section concepts were generated for this project using OpenAI image generation on 2026-09-29. Public runtime assets are 720px and 1200px WebP derivatives of the same portrait. No stock-person likeness, testimonial or real customer identity is claimed. Do not caption as a real Wellyn user.

Brand wordmarks are live type. Small icons are original, code-native line drawings. The orbit diagrams are original DOM/SVG graphics. Hims About (https://www.hims.com/about) informed editorial scale, narrative structure and motion ambition; no Hims images, videos, branding, text or source code were copied into the site.

## Generation briefs

- Hero concept: pale lavender #e6e6f4 corporate hero, quiet white pill nav, dark aubergine oversized “A little more you.”, natural sunlit portrait in oval, fine orbital text, original human-centered AI identity.
- Vision concept: white large typographic statement, lavender emphasis on “personal”, centered support text and mint intention band.
- Approach concept: mint canvas, four personal-context circles around “you”, prominent editorial headline, three sequential steps. Diagram recreated as semantic markup and SVG.
- Wellyn concept: dark aubergine introduction, oversized wordmark, pale interactive routine panel, no invented metrics, explicit in-development status.
- Portrait extraction: recreate only the concept’s smiling adult woman with short natural curls and ivory linen shirt in sunlight; portrait crop, clear blue sky, no graphics or text. Original generation source retained in the user’s Codex generated-images directory; runtime copies are in this repository.

## Lifecycle scene — 2026-09-30

Original image generated with the built-in OpenAI image generation tool. It depicts three generations through their hands and is illustrative brand imagery, not real users or results. Project assets: `public/images/chapters-800.webp` and `public/images/chapters-1440.webp`. No stock photo or film footage was used. Responsive WebP encoding uses Sharp; this is an asset preparation tool and is not shipped to the browser.

The exact generation prompt is recorded in `docs/lifecycle-image-prompt.md`. Original PNG remains in the Codex generated-images directory. The site references only the project-local WebP assets.

Prettier 3.9.9 (MIT) was added as a development-only formatting tool. Package license files and the lockfile record dependencies.

## Curation product scenes — 2026-09-30

Two original generic product cutouts were generated with the built-in OpenAI image-generation tool: `public/images/curation-gel.webp` and `public/images/curation-cream.webp`. They are illustrative profiles, not real products, merchant inventory or a Wellyn skincare line. Package labels are blank; all product text is live HTML. Full prompts and source paths are in `docs/curation-image-prompts.md`. Alpha is preserved in optimized WebP copies. No Hims, Hers or MEDVi product images, videos or packaging designs were copied.

## Social sharing card

`public/images/dawnstar-social.png` is a 1200×630 browser export of `design/social-card.html`. It reuses this project's original hero portrait, self-hosted DM Sans and existing lavender/plum identity. It introduces no third-party image or new generated person. The editable HTML source is retained for deterministic re-export; it is not a production page.
