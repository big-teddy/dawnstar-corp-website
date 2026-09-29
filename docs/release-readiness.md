# Release readiness

2026-09-30, pre-deployment snapshot. Earlier visual/interaction checks did not cover all publication requirements. This document records checks completed before pushing the redesign. Deployment status and the production commit should be verified through GitHub and Vercel.

## Local publication work

- Current public Wellyn wording: `Your personal wellness AI`. Search description and service introduction use the same positioning.
- Canonical and Open Graph URL: `https://dawnstarcorp.com/`. This domain was confirmed in the original repository metadata and the current publicly accessible site, not inferred solely from an email address.
- Open Graph and X/Twitter large-image metadata includes the company title, description, image, dimensions and alternative description.
- Original 1200×630 social image is `public/images/dawnstar-social.png`; editable source is `design/social-card.html`. It is a browser-rendered brand composition using the existing portrait and typography.
- `public/robots.txt` and `public/sitemap.xml` use the same canonical root. The site is one page; in-page fragments are not separate sitemap entries.
- Local verification passed: syntax/format/build and diff checks; eight built image/script/style references exist; canonical, Open Graph and X/Twitter image URLs agree; actual PNG signature and 1200×630 dimensions match the declared metadata; sitemap parses and matches robots. The browser export was normalized from its returned JPEG encoding into a real PNG before this check.
- The production preview loads the share image at its final path. Updated service copy renders without horizontal overflow or console warnings/errors at the desktop viewport. Previous responsive layout and interaction checks remain applicable; this pass changes wording and publication assets only.

## Operational evidence and limits

- The existing public domain loaded over HTTPS in the in-app browser. It still serves the old DawnStar Global / Launching 2025 site. This confirms the existing endpoint, not the new build in production.
- A public MX lookup returned `1 smtp.google.com.`. This confirms a domain-level mail route only. It does **not** verify the existence, deliverability or monitoring of `contact@dawnstarcorp.com`. No test email was sent.
- The connector initially returned no projects, but the authenticated Vercel CLI confirmed the existing `dawnstar-corp-website` project (`prj_AunG8OzFz7NBiienclDwkagfLCux`) in `joshs-projects-741675c7`. Its production URL is `https://dawnstarcorp.com`.
- GitHub production deployment history confirms the same Vercel project. The repository's default branch is `main`; the last production commit before this redesign was `1e583222e92afee44cb85743fee8ab7d781c2b58`.
- The user explicitly authorized pushing the completed redesign to GitHub and deploying it to the existing Vercel production site. No DNS changes or test emails are required for this update.

## Before production cutover

1. Publish through the existing Vercel project, using the committed `vercel.json` configuration to build and serve `dist/`.
2. Verify the actual deployment URL before changing production: homepage, assets, direct fragment links, share image, robots and sitemap responses. Keep preview deployments out of indexing through the hosting platform’s preview controls; production canonical metadata alone is not a preview privacy control.
3. Mailbox delivery and monitoring remain unverified; domain MX is not sufficient evidence. This is recorded separately from deploying the authorized website update.
4. After authorized publication, verify the canonical domain serves the new build and inspect sharing previews. Local asset presence does not prove a remote crawler can fetch it.

## Repeatable local checks

Run `npm run check`, `npm run build` and `git diff --check`. Inspect the built HTML metadata and confirm every local image/script/style reference resolves inside `dist/`. Confirm the social image is 1200×630, the sitemap root matches the canonical and robots points to that sitemap. Check the local production preview, including one mobile width. Previous full interaction verification is documented separately; repeat affected paths when new changes warrant it.
