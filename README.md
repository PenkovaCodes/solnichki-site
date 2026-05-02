# Солнички (Solnichki)

Premium Bulgarian brand — personalized salt & pepper shakers.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### Installation

```bash
cd solnichki-site
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required variables:
- `STRIPE_SECRET_KEY` — from Stripe Dashboard
- `STRIPE_PUBLISHABLE_KEY` — from Stripe Dashboard
- `STRIPE_WEBHOOK_SECRET` — from configured webhook endpoint
- `NEXT_PUBLIC_SITE_URL` — your production URL (default: http://localhost:3000)

Optional:
- `CLOUDINARY_*` — for image uploads (not yet implemented)
- `RESEND_API_KEY` — for order confirmation emails

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Payments:** Stripe (Stripe Elements)
- **Fonts:** Cormorant Garamond + Manrope (Google Fonts)

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account
2. Get test keys from Developers → API keys
3. Add them to `.env.local`
4. (Optional) Set up webhook endpoint for payment events:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```

### Pricing

- 1 солничка — 46 €
- 2 солнички — 89.99 €
- 3 солнички — 135.99 €
- 4 солнички — 184.99 €

Production time: up to 6 business days after payment.

## 📁 Project Structure

```
src/
  app/
    api/
      create-payment-intent/route.ts
      stripe-webhook/route.ts
      upload-image/route.ts   # placeholder
    checkout/page.tsx        # payment flow
    blagodarim/page.tsx      # thank you page
    page.tsx                 # landing page
  components/               # UI components
public/
  images/                  # product photos & logos
```

## 🚢 Deployment

Recommended: **Vercel** (zero-config)

1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables
4. Deploy

### Post-Deploy

1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Configure Stripe webhook to point to `https://yourdomain.com/api/stripe-webhook`
3. Switch Stripe keys to live mode
4. (Optional) Set up Cloudinary for image uploads
5. (Optional) Configure email service (Resend) for order confirmations

## 📄 License

Private — all rights reserved by Солнички.

## 🙋 Contact

solnichki@gmail.com
