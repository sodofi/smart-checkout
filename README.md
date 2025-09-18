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

Open `http://localhost:3000?a=merchant.eth&n=Cap&color=green&image=/green.webp`.

Optionally specify a chain ID with `c` (defaults to Celo 42220), e.g. Base:
`http://localhost:3000?a=sophiad.eth&c=42220&n=Cap`.

### URL parameters

- **a**: recipient address or ENS (required)
- **n**: product name (required)
- **c**: chain ID (optional, defaults to Celo `42220`)
- **m** or **color**: theme — one of `black`, `green`, `blue`, `white` (optional, default `black`)
- **img** or **image**: product image URL or public path (optional)

### Contactless checkout (QR + NFC)

- **QR code**: Encode your checkout URL as a QR so customers can scan and pay.

  - Example (CLI):

  ```bash
  npx qrcode "https://yourdomain.com?a=merchant.eth&n=Cap&color=green" -o checkout.png
  ```

  - You can also use any online QR generator; the page reads all data from the URL parameters.

- **NFC tag**: Write the same URL as an NDEF URI record for tap-to-pay.
  - **iOS**: Shortcuts app → Automation → NFC → When tag is scanned → Open URL.
  - **Android**: Use an app like "NFC Tools" → Write → URL/URI → paste the checkout URL.
  - Use common NTAG213/215/216 tags. Ensure the URL is publicly reachable.

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
