import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  console.log("Новое сообщение с формы контактов:", parsed.data);

  return NextResponse.json({ ok: true }, { status: 201 });
}
