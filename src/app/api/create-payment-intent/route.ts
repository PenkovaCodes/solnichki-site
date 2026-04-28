import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use the latest API version supported by the library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

const validAmounts: Record<number, number> = {
  1: 4600,
  2: 8999,
  3: 13599,
  4: 18499,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { option, amount, currency = 'eur' } = body;

    if (!option || !validAmounts[option]) {
      return NextResponse.json({ error: 'Невалидна опция' }, { status: 400 });
    }

    if (amount !== validAmounts[option]) {
      return NextResponse.json({ error: 'Невалидна сума' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        option: option.toString(),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('PaymentIntent error:', error);
    return NextResponse.json({ error: 'Възникна грешка при създаване на плащане' }, { status: 500 });
  }
}
