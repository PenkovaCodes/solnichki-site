# Солнички — Website

Премиум бранд за персонализирани солници.

## 🚀 Бърз старт

```bash
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000) в браузър.

## 📋 Изисквания

- Node.js 18+
- npm / yarn / pnpm

## 🔧 Конфигурация

1. Копирай `.env.example` в `.env.local` и попълни:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

2. **Stripe Setup**
   - Създай Stripe account на [stripe.com](https://stripe.com)
   - В Developers → API keys копирай test ключовете
   - За да работи webhook, стартирай Stripe CLI:
     ```bash
     stripe listen --forward-to localhost:3000/api/stripe-webhook
     ```
   - Копирай webhook signing secret в `.env.local`

3. **Cloudinary Setup** (наскоро)
   - Създай акаунт в [cloudinary.com](https://cloudinary.com)
   - Намери твоя `cloud_name`, `api_key`, `api_secret`
   - Попълни в `.env.local`

## 🏗 Структура на проекта

```
src/
├── app/
│   ├── api/
│   │   ├── create-payment-intent/route.ts  ← Stripe PaymentIntent
│   │   ├── stripe-webhook/route.ts          ← Webhook handler
│   │   └── upload-image/route.ts            ← Image upload (Cloudinary soon)
│   ├── checkout/
│   │   └── page.tsx                         ← Checkout page with Stripe Elements
│   ├── layout.tsx                           ← Root layout with fonts
│   └── page.tsx                             ← Landing page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Section.tsx
│   ├── Gallery.tsx
│   ├── Mission.tsx
│   ├── Process.tsx
│   ├── NoLimits.tsx
│   ├── Pricing.tsx
│   └── Footer.tsx
└── app/
    └── globals.css                          ← Tailwind + CSS variables
```

## 🖼 Изображения

Продуктовите снимки са в `public/images/`. Всички изображения са ръчно изработени и се зареждат от клиентските файлове.

**Забележка:** Image upload momentalно пази във временна папка. Ще се интегрира Cloudinary скоро.

## 💳 Плащане

Използваме **Stripe Elements** за вграден checkout.
- Тестови карти: `4242 4242 4242 4242` (мощност 1€)
- CVC: `123`
- Валидна дата: бъдеща

## 🌐 Deploy

### Vercel (препоръчително)

1. Push кода в GitHub repository
2. В [Vercel](https://vercel.com) импортирай проекта
3. Добави Environment Variables от `.env.local`
4. Deploy!

### Други хостове

Увери се, че поддържат Next.js 15+ и serverless functions.

## 🧪 Тестване

```bash
npm run build
npm start
```

Провери:
- [ ] Landing page растерира правилно на мобилни (min 380px)
- [ ] Всички copy е на български
- [ ] Цветовете съответстват на палитрата: `#E3CF7D`, `#0A699D`, `#044465`
- [ ] Stripe Elements се показва и работи с тестови карти
- [ ] Checkout формата валидира задължителните полета
- [ ] Плащането преминава към success страница (`/blagodarim`)

## 📝 Следващи стъпки

- [ ] Конвертиране на лого в SVG (от `цветове и лого.docx`)
- [ ] Интеграция на Cloudinary за image upload
- [ ] Настройване на email изпращане (webhook → nodemailer / Resend)
- [ ] Добавяне на shipping calculation
- [ ] Добавяне на order management панел (админ)
- [ ] SEO оптимизация (Open Image, structured data)

## 📄 Лиценз

Private — всички права запазени.

---

Създадено с ❤ за Солнички.
