# readdanielscott.com

Official Daniel Scott author site. Static-first build for Cloudflare Pages, designed as a reader-routing homepage for the full Daniel Scott catalog.

## Live/repo

- GitHub: https://github.com/DukeDawg/readdanielscott.com
- Intended production domain: https://www.readdanielscott.com
- Amazon author page: https://www.amazon.com/Daniel-Scott/e/B0B6QCQ8RV

## Cloudflare Pages settings

- Framework preset: None
- Build command: leave blank
- Build output directory: `public`
- Production branch: `main`

## Current homepage content

The redesigned homepage is organized around three reader decisions: what is new, where to start, and how deep to go. It preserves the noir case-file identity while putting the newest release, the strongest series opener, the complete HCU boxed set, and the reader-list conversion path above the full catalog.

The four reader entry lanes are:

1. **Heinous Crimes Unit** — 9-book FBI procedural / serial-killer series plus complete Books 1–9 boxed set.
2. **A Murderous Mind** — 3-book psychological thriller trilogy.
3. **A Desperate Man** — 3-book FBI manhunt trilogy.
4. **Dark Pursuits** — 4-book supernatural thriller series, now including *A Friend in Debt*.

The page includes Amazon purchase/follow links, verified current catalog counts, full reading orders, the new 1–9 HCU boxed set, MailerLite reader signup, working contact form, SEO/canonical metadata, a bespoke Open Graph card, schema.org Person JSON-LD, and responsive mobile navigation.

## Next wiring tasks

- Connect GitHub repo to Cloudflare Pages and attach `readdanielscott.com` / `www.readdanielscott.com`.
- Add analytics/Search Console verification once Cloudflare is live.


## Reader signup wiring

The reader-list signup form posts directly to MailerLite's embedded webform endpoint:

- Form container: `mlb2-41418069`
- Account path: `2307208`
- Form ID: `187756443655472148`
- Action: `https://assets.mailerlite.com/jsonp/2307208/forms/187756443655472148/subscribe`

The public form intentionally keeps only the email field and MailerLite's required hidden fields: `ml-submit=1` and `anticsrf=true`. The site's own `script.js` submits the form with `fetch()`, displays MailerLite validation errors inline, and calls `ml_webform_success_41418069()` on success so the success state can use the site's own styling instead of MailerLite's bulky default embed CSS.

## Back-of-book reader page

The dedicated back-matter signup URL is:

- `https://www.readdanielscott.com/readers/`

It uses the separate MailerLite form David supplied for readers coming from the back of a book:

- Form container: `mlb2-41467195`
- Account path: `2307208`
- Form ID: `187841015656220137`
- Action: `https://assets.mailerlite.com/jsonp/2307208/forms/187841015656220137/subscribe`

The page is static at `public/readers/index.html` and uses the same direct-submit handler in `public/script.js`, with `data-mailerlite-success="ml_webform_success_41467195"` selecting the page-specific success state.

## Contact form wiring

The reader contact form posts to the Cloudflare Pages Function at `/api/contact`.

Required Cloudflare Pages environment variables/secrets:

- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key
- `RESEND_API_KEY` — Resend API key
- `CONTACT_TO_EMAIL` — destination inbox, e.g. `david@imperiumdominion.org`
- `CONTACT_FROM_EMAIL` — verified Resend sender, e.g. `Reader Mail <reader-mail@readdanielscott.com>`
- `CONTACT_SITE_NAME` — optional label used in the email subject/body

Also replace `REPLACE_WITH_TURNSTILE_SITE_KEY` in the public HTML with the Turnstile site key for this domain.

Cloudflare Pages build remains static-first:

- Build command: leave blank
- Build output directory: `public`
- Functions directory: `functions`
