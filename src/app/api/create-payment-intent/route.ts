import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createOrder, updateOrderPayment } from '@/lib/orders';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_tes...lder', {
  apiVersion: '2026-04-22.dahlia',
});

const validAmounts: Record<number, number> = {
  1: 4600,
  2: 8999,
  3: 13599,
  4: 18499,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { option, amount, shipping, customizations } = body;

    if (!option || !validAmounts[option]) {
      return NextResponse.json({ error: 'Невалидна опция' }, { status: 400 });
    }

    if (amount !== validAmounts[option]) {
      return NextResponse.json({ error: 'Невалидна сума' }, { status: 400 });
    }

    // Create order
    const order = await createOrder({
      option,
      quantity: option,
      unitPrice: amount / 100,
      total: amount / 100,
      shipping,
      customizations,
    });

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id,
        option: option.toString(),
        customer_email: shipping.email,
        customer_name: shipping.fullName,
      },
    });

    // Link PaymentIntent to order
    await updateOrderPayment(order.id, paymentIntent.id);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, orderId: order.id });
  } catch (error) {
    console.error('PaymentIntent error:', error);
    return NextResponse.json(
      { error: 'Възникна грешка при създаване на плащане' },
      { status: 500 }
    );
  }
}
