// src/stripe.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY); // ✅

export default stripePromise;
