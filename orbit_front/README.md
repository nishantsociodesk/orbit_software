Upfront Storefront (Electronics)

## Backend (Storefront API)

Set these environment variables before running the app:

- `NEXT_PUBLIC_API_BASE_URL` (example: `http://localhost:5000`)
- `NEXT_PUBLIC_STOREFRONT_SUBDOMAIN` (example: `electronics` or leave empty to use `default`)

The frontend reads products and checkout from `GET/POST /api/storefront/:subdomain`.
When the subdomain is `default`, the backend serves the first active store.
