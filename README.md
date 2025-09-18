## Smart Checkout Boilerplate

Product checkout UI powered by Daimo Pay. Configure via URL query params to create a simple purchase flow.

### Quick start

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000?a=merchant.eth&c=8453&n=Cap&color=green&image=/green.webp`.

### URL parameters

- **a**: recipient address or ENS (required)
- **c**: chain ID (required)
- **n**: product name (required)
- **m** or **color**: theme — one of `black`, `green`, `blue`, `white` (optional, default `black`)
- **img** or **image**: product image URL or public path (optional)

### Supported chains and token

USDC on: Optimism (10), Polygon (137), Arbitrum (42161), Base (8453), Worldchain (480), Celo (42220).

### Customization

- Edit `src/app/page.tsx` to adjust the UI.
- Colors are defined in `colorSchemes` inside `page.tsx`.
- Powered-by footer lives in `src/components/powered-by-footer.tsx`.

### Environment

Set `NEXT_PUBLIC_DAIMO_APP_ID` to your app id.

If you're building on Celo and need an APP_ID, contact Sophia (Celo DevRel):

- GitHub: [`sodofi`](https://github.com/sodofi)
- Email: `sophia.dew@celo.org`
