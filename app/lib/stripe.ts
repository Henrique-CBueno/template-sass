import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-03-31.basil",
    });
  }

  return stripeInstance;
}