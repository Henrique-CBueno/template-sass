import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Rota carregada com sucesso");

  return NextResponse.json({ success: true }, { status: 200 });
}
