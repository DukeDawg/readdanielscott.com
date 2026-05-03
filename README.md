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

The homepage is organized around four reader entry lanes:

1. **Heinous Crimes Unit** — 9-book FBI procedural / serial-killer series plus Books 1–8 boxed set.
2. **A Murderous Mind** — 3-book psychological thriller trilogy.
3. **A Desperate Man** — 3-book FBI manhunt trilogy.
4. **Dark Pursuits** — 3-book supernatural thriller trilogy.

The page includes Amazon purchase/follow links, SEO title/description/canonical metadata, Open Graph/Twitter metadata, schema.org `Person` JSON-LD, a placeholder reader-list form, reader FAQ, and a mobile-first static design.

## Next wiring tasks

- Connect GitHub repo to Cloudflare Pages and attach `readdanielscott.com` / `www.readdanielscott.com`.
- Replace the placeholder signup form with the real email provider/list.
- Add real cover/social-card assets when ready.
- Add analytics/Search Console verification once Cloudflare is live.


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
