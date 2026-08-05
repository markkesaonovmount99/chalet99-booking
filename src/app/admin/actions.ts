"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, checkAdminPassword, createAdminSessionValue } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: "CONFIRMED" | "REJECTED",
) {
  await prisma.booking.update({ where: { id: bookingId }, data: { status } });
  revalidatePath("/admin");
}
