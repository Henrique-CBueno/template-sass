import { useState, useEffect } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export function useStripe() {
     const [stripe, setStripe] = useState<Stripe | null>(null);

     useEffect(() => {
        async function loadStripeAsync() {
            const stripeInstance = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
            )

            setStripe(stripeInstance);
        }

        loadStripeAsync()
     }, [])

     async function createPaymentStripeCheckout(checkoutData:{testeId: string}){
        if (!stripe) return;
 
        try {
            const res = await fetch("/api/stripe/create-pay-checkout", {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutData),
       })
 
       const data = await res.json();
 
       await stripe.redirectToCheckout({ sessionId: data.sessionId })
     } catch (error) {
       console.error(error);
     }
     }

        async function createPaymentStripeSubscription(checkoutData:{testeId: string}){
            if (!stripe) return;
 
            try {
              const res = await fetch("/api/stripe/create-subscription-checkout", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutData),
              })
        
                const data = await res.json()
        
              await stripe.redirectToCheckout({ sessionId: data.id })
            } catch (error) {
              console.log("erro");
            }
        }
        
        async function createPaymentStripePortal(){
            const res = await fetch("/api/stripe/create-portal", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
          
              const data = await res.json();
          
              window.location.href = data.url;
            
        }
 
     return {
        createPaymentStripeCheckout,
        createPaymentStripeSubscription,
        createPaymentStripePortal,
     }
}