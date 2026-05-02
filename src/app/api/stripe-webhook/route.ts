import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOrderById } from '@/lib/orders';
import { sendOrderConfirmation } from '@/lib/email';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_tes...lder', {
  apiVersion: '2026-04-22.dahlia',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata?.orderId;

    console.log('Payment succeeded:', paymentIntent.id, 'orderId:', orderId);

    let emailResult: { success: boolean; error?: string } = { success: false, error: 'Order not found' };

    if (orderId) {
      const order = getOrderById(orderId);
      if (order) {
        emailResult = await sendOrderConfirmation({
          paymentIntentId: paymentIntent.id,
          option: order.option,
          quantity: order.quantity,
          unitPrice: order.unitPrice,
          total: order.total,
          shipping: order.shipping,
          customizations: order.customizations,
        });
      } else {
        console.error('Order not found for id:', orderId);
      }
    } else {
      console.warn('No orderId in PaymentIntent metadata');
    }

    if (!emailResult.success) {
      console.error('Failed to send confirmation email:', emailResult.error);
      // Don't fail the webhook — still return 200 so Stripe doesn't retry
    }
  }

  return NextResponse.json({ received: true });
}
