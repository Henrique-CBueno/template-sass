import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const session = await auth()
    const userId = session?.user?.id

    if(!userId) {
        return new Response("Unauthorized", { status: 401 })
    }


    try {
        const userRef = db.collection("users").doc(userId)
        const userDoc = await userRef.get()
        
        if (!userDoc.exists) {
            return NextResponse.json("User not found", { status: 404 })
        }

        const custumerId = userDoc.data()?.stripeCustomerId

        if(!custumerId) {
            return NextResponse.json("Customer ID not found", { status: 404 })
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: custumerId,
            return_url: `${req.headers.get("origin")}/dashboard`,
        })

        return NextResponse.json({ url: portalSession.url }, { status: 200 })

    } catch (error) {

        console.error("Error creating portal session:", error)
        return new Response("Internal Server Error", { status: 500 })
        
    }

}