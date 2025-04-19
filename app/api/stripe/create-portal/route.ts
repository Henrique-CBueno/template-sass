import { NextResponse } from "next/server";

export async function POST() {
  console.log("Rota carregada com sucesso");

  return NextResponse.json({ success: true }, { status: 200 });
}
