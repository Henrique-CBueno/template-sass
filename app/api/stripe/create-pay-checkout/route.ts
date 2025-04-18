import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { testeId, userEmail } = await req.json()

    const price = process.env.STRIPE_PRODUCT_PRICE_ID

    if (!price) {
        throw new Error("Price not found")
    }


    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                { price: price, quantity:1 }
            ],
            mode: "payment",
            payment_method_types: ["card", "boleto"],
            success_url: `${req.headers.get("origin")}/sucess`,
            cancel_url: `${req.headers.get("origin")}/`,
            ...(userEmail && { customer_email: userEmail }),
        })

        if (!session.url) {
            throw new Error("Session URL not found")
        }

        return NextResponse.json({ sessionId: session.id })
        
    } catch(e) {
        alert(e)
    }
}