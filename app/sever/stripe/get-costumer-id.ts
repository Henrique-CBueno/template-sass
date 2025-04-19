import { db } from '@/app/lib/firebase';
import { getStripeClient } from "@/app/lib/stripe";";
import 'server-only';

export async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    let stripeCustomerId = userDoc.data()?.stripeCustomerId;

    // Verifica se o stripeCustomerId ainda é válido na Stripe
    if (stripeCustomerId) {
      try {
        await stripe.customers.retrieve(stripeCustomerId);
        return stripeCustomerId;
      } catch  {
        console.warn("Stripe customer not found, creating a new one.");
        stripeCustomerId = null; // continua o fluxo para criar um novo
      }
    }

    const userName = userDoc.data()?.name;

    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      ...(userName && { name: userName }),
      metadata: {
        userId,
      }
    });

    await userRef.update({
      stripeCustomerId: stripeCustomer.id,
    });

    return stripeCustomer.id;
  } catch  {
    console.log('Error getting or creating customer:');
    throw new Error('Failed to get or create customer');
  }
}
