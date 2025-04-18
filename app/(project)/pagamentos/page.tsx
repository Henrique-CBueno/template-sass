"use client"

import { useStripe } from "@/app/hooks/useStripe"

export default function Pagamentos() {


    const {createPaymentStripeCheckout, createPaymentStripePortal, createPaymentStripeSubscription} = useStripe()

    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen"> 
            <h1 className="text-4xl font-bold">Pagamentos</h1> 
            <button className="border rounded-md px-1 pointer" onClick={() => createPaymentStripeCheckout({testeId: "123"})}>
                Criar pagamento stripe checkout
            </button>
            <button className="border rounded-md px-1 pointer" onClick={() => createPaymentStripeSubscription({testeId: '123'})}>Criar assinatura stripe</button>
            <button className="border rounded-md px-1 pointer" onClick={createPaymentStripePortal}>Criar Portal de pagamentos</button>
        </div>
    )
}

