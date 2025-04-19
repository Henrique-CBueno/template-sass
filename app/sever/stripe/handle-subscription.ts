import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/app/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    console.log("Antes do getStripeClient");
    const stripe = getStripeClient();
    console.log("Stripe inicializado:", stripe ? "sim" : "não");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Erro ao inicializar stripe:", error, req);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
