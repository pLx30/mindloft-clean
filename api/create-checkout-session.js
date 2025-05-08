// /api/create-checkout-session.js
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, price_id } = req.body;

  if (!user_id || !price_id) {
    return res.status(400).json({ error: 'Missing user_id or price_id' });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('email')
    .eq('id', user_id)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'User not found in Supabase' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: user.email,
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
    metadata: {
      user_id,
    },
  });

  return res.status(200).json({ url: session.url });
}
