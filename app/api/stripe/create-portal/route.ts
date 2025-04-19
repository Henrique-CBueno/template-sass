import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { getStripeClient } from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    const customerId = userData?.stripeCustomerId;

    if (typeof customerId !== "string" || !customerId.trim()) {
      return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    if (!origin) {
        return NextResponse.json({ error: "Origin is missing or invalid" }, { status: 400 });
    }
    

    if (!origin || typeof origin !== "string") {
      return NextResponse.json({ error: "Origin is missing or invalid" }, { status: 400 });
    }

    const stripe = getStripeClient();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (e) {
    console.error("Error creating portal session:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
    return NextResponse.json({ error: "Internal Server Error", message: errorMessage }, { status: 500 });
}
}
