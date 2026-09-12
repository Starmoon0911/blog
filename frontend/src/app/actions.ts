"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookie(
  k: string,
  v: string,
  option: Partial<ResponseCookie> = {},
) {
  const cookieStore = await cookies();

  cookieStore.set(k, v, {
    httpOnly: true,
    sameSite: true,
    maxAge: 3600,
    path: "/",
    ...option,
  });
}
export async function getCookie(k: string) {
  const cookieStore = await cookies();
  return cookieStore.get(k)?.value;
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}
