# binolabs type

This branch (`binolabs`) is a modified version of
[Monkeytype](https://github.com/monkeytypegame/monkeytype), copyright Miodec
and the Monkeytype contributors. It is distributed under the
[GNU General Public License v3.0](LICENSE), the same license as upstream.

It is hosted at https://type.binolabs.com. That site serves this branch,
and its complete corresponding source is this repository:
https://github.com/mabino/monkeytype/tree/binolabs

"Monkeytype" and its logo belong to the upstream project. This build is not
affiliated with or endorsed by it, and is renamed "binolabs type" so it is not
mistaken for the official site.

## Modifications (GPL-3.0 §5(a))

Modified by Michael Bino, starting 2026-11-11. Changes from upstream:

- **Frontend only.** Built without the backend, Firebase, or reCAPTCHA.
  Accounts, leaderboards and result history are unavailable; settings and
  personal bests stay in the browser's local storage. `/api/configuration`
  serves upstream's secure-by-default `BASE_CONFIGURATION` (generated at
  build time); every other `/api/` call is answered locally with a 503.
- **No third-party services.** Sentry, Google Analytics, ad networks, the
  merch banner, server PSAs, GitHub release checks (and the footer version
  button) and the cookie-consent modal are disabled in code,
  and `docker/binolabs/nginx.conf` sets a `'self'`-only Content-Security-Policy
  as a backstop. Search indexing is off (`robots.txt`, `X-Robots-Tag`).
- **Branding.** Renamed to "binolabs type" in the header, page title and PWA
  manifest. Adds a `binolabs` theme, which is the default. Ads default to off.
- **Credits.** The footer links to binolabs, this source, upstream Monkeytype,
  and this notice. The About page says it is a modified build and keeps the
  upstream credits.
- **Packaging.** `docker/binolabs/` holds the static nginx image.
