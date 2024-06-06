"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function RedirectToEmails() {
  const router = useRouter();
  router.push("/emails");
  return <></>;
}
