# RansomWatch

Public ransomware claim dashboard aggregating RansomLook and Ransomware.live. Claims are not independently confirmed incidents. No stolen content, screenshots, onion URLs or raw leak-site links are republished.

## Data

- RansomLook: https://www.ransomlook.io/api/posts?days=30 — 30-day public posts feed. Data © RansomLook, licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Records normalized, deduplicated and adapted. https://www.ransomlook.io/about
- Ransomware.live: https://api.ransomware.live/v2/recentvictims — recent endpoint with an upstream result limit. https://www.ransomware.live
- Original ransomwatch repository is archived and is not used as a live source.

Feeds overlap and have different coverage windows. Deduplication matches normalized organization name + group, retains original source attribution, and keeps earliest discovery. It can miss differently spelled names. Country and industry enrichments are copied only when supplied, not inferred. Source status, last success and collection times are visible. Per-provider records are retained for a rolling 30 days; cache eviction can reduce retained history. Failed sources retain cached records and show stale status. All-source failure without cache fails collection rather than publishing fabricated data.

## Run locally

Node.js 22 or newer; no packages or secrets required.

```sh
node --test scripts/collect.test.mjs
node scripts/collect.mjs
```

Serve `site/` with a local static server, or open `site/index.html` directly (initial data loads via data.js; refresh requires HTTP hosting).

## GitHub Pages

Create a public repository, push these files to `main`, and select **Settings → Pages → Source → GitHub Actions**. Run **Collect intelligence and publish dashboard** under Actions. The workflow collects and deploys hourly at minute 17, on pushes, or on manual dispatch. GitHub can delay scheduled runs; this is periodically refreshed intelligence, not real-time streaming. Public repository schedules may be disabled after prolonged inactivity; GitHub Actions status is authoritative.

The Refresh button reloads the latest published snapshot; it does not start a server-side collection. To collect on demand run the workflow. No credentials are shipped to the browser.
