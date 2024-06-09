"use server";
import { signIn, signOut } from "@/auth";

export async function doSocialLogin() {
  await signIn("google", { redirectTo: "/emails" });
}

export async function doLogOut() {
  await signOut({ redirectTo: "/" });
}
