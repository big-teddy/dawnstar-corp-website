# Service storytelling and product display

2026-09-30. Team review following the founder’s request for deeper Hims & Hers / MEDVi research. This document supersedes the earlier narrow device-frame treatment of the Wellyn preview. Company positioning and the lavender/plum identity remain as defined in `brand-copy-and-color.md`.

## What was researched

Follow-up: [Hims homepage direct visual audit](hims-home-visual-audit.md) records the subsequent section-by-section browser review, its exact limits and the implications for a more image-led Wellyn chapter. The implemented direction below predates that follow-up; the new scene recommendations are not yet implemented.

Three parallel reviews covered Hims & Hers, MEDVi and the existing implementation. Research used official home, company, service, product, app and public intake pages. The lead also viewed Hims About, Hims’s AI app page, MEDVi’s home and product-lineup page in the live browser, including scrolling through their service scenes. Mobbin section previews were opened and visually examined. Public intake content was read only; no account, health answers or purchase was submitted.

| Source | Observation | Adaptation for Dawnstar |
| --- | --- | --- |
| [Hims About](https://www.hims.com/about) | Large human imagery and typography carry company purpose into personal-care examples. Scrolling alternates open statements with immersive imagery. | Preserve the company-first narrative, human portrait, large statement, AI explanation, Wellyn demonstration and lifecycle ambition. |
| [Hims AI app](https://www.hims.com/weight-loss/app) | A person’s context is connected to concrete interface scenes and continuing support. Simulated interactions are explicitly identified. | Put an editable example preference next to the resulting choice; carry the same product into the next view. Label this scripted concept honestly. |
| [Hims product detail](https://www.hims.com/weight-loss/wegovy-pill) and [Hims hair](https://www.hims.com/hair-loss) | Product forms and everyday usage distinctions make options easier to compare. | Use consistent texture, format and consideration fields; no invented match scores. |
| [Hers skincare](https://www.forhers.com/skin-care) | Product selection connects to assessment, professional guidance and later use. | Make purchase understanding the starting point and routine support the continuation. |
| [MEDVi home](https://home.medvi.org/) | Product cutouts, human images and service-support scenes work together. Future categories are marked Coming Soon. | Use original product cutouts and distinguish the first service in development from the long-term lifecycle vision. |
| [MEDVi product lineup](https://glp1.medvi.org/#product-lineup) | Large isolated products share a consistent card structure with comparable attributes and actions. | Replace small line icons with two legible product profiles and a neighboring explanation panel. |
| [MEDVi intake](https://glp1.medvi.org/intake) and [About](https://home.medvi.org/about-us) | Public content includes preferences and uncertainty, while the company narrative discusses access and convenience. Intake order/branching was not exercised. | Let the visitor change one clear preference and review an alternative. Avoid turning a company page into a survey or store. |
| [Mobbin: Hims mission/product section](https://mobbin.com/sites/sections/296c6a7b-4ebc-40c9-ad0d-141c96d79ab1) | The viewed preview juxtaposes purpose copy and a tangible product scene. | Service imagery must demonstrate what the company does. |
| [Mobbin: Shopify Editions](https://mobbin.com/sites/sections/343c8a14-0b30-457b-b2f3-8a169dbb1c2d) | The viewed preview shows product recommendations inside a conversational shopping example. | Tie AI to a visible product decision. Its dense cinematic composition was not adopted for this short corporate preview. |

Hims/Hers and MEDVi publicly describe provider-led telehealth offerings. They should not be described as neutral, autonomous AI skincare curators. Wellyn’s proposed role—helping someone understand and select wellness products—is distinct. Their medical claims, testimonials, commercial results and clinical infrastructure were not transferred.

## Implemented direction

- Wellyn introduction remains a company product-in-development story: “Curated for you. Chosen by you.” Copy explicitly includes AI, product and ingredient information, preferences, budget and everyday life.
- The previous maximum-450px device mockup becomes a full-width curation scene. `Explore the concept` now leads into that scene.
- Two original, unbranded product images make the comparison tangible. Live HTML supplies names and attributes. They represent fictional product profiles, not Wellyn-manufactured inventory or merchant offers.
- “Less searching. More understanding.” introduces an editable texture preference, the two options, selection feedback, reasoning and a trade-off.
- Selecting a different preference changes the highlighted option and reason. A visitor can still select the alternative. The same selected image and product name appear in the routine view and persist across morning/evening and weather choices.
- Motion brings the two products into place with a short stagger and settles their rotation; the controls themselves remain stationary. Selection scales the relevant image subtly. Routine transitions preserve the selected object visually. Pausing motion clears transition transforms and preserves reading position.
- Mobile retains both product images. Secondary product text was enlarged after independent screenshot review. Actions now read `Compare option` and `Selected` to match their behavior.

## Scope and provenance

The interaction is a local scripted concept. No AI inference, catalog, ingredient validation, prices, affiliate destinations, checkout or clinical feature is implemented. The page states that the products are illustrative and Wellyn is in development. The longer-term ingredient, budget and existing-shelf context is clearly expressed as the product vision, not simulated as working intelligence.

Built-in image generation produced `public/images/curation-gel.webp` and `public/images/curation-cream.webp`. Exact prompts and source paths are in [curation-image-prompts.md](curation-image-prompts.md). Together the optimized transparent assets add approximately 55 KB. No new runtime dependency or external media request was introduced.
