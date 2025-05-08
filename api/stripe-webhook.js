// /api/stripe-webhook.js
import Stripe from 'stripe';
import { buffer } from 'micro';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const user_id = session.metadata.user_id;

    // Hole Preis-ID → nutze diese zur Plan-Zuweisung
    const priceId = session.items?.[0]?.price?.id || session.metadata?.price_id || session?.display_items?.[0]?.price?.id;

    const plan = mapPriceToPlan(session);

    await supabase.from('subscriptions').upsert(
      {
        user_id,
        plan,
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        updated_at: new Date().toISOString(),
      },
      { onConflict: ['user_id'] }
    );
  }

  res.json({ received: true });
}

function mapPriceToPlan(session) {
  const id = session?.display_items?.[0]?.price?.id || session?.metadata?.price_id;
  switch (id) {
    case 'price_1RMWVgDGa89iqcqF5WQHdURf': return 'starter';
    case 'price_1RMWWdDGa89iqcqFuQy5WFQI': return 'focus';
    case 'price_1RMWXPDGa89iqcqFSMf687TZ': return 'pro';
    case 'price_1RMWYhDGa89iqcqFdPFefe0D': return 'elite';
    default: return 'unknown';
  }
}
