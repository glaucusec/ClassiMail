import React from "react";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();
  const name = session?.user?.name || "";
  const image = session?.user?.image || "";
  const email = session?.user?.email || "";
  return (
    <React.Fragment>
      <section className="">
        <Image
          className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
          src={image}
          alt="avatar"
        />
      </section>
      <section className="flex flex-col">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-sm">{email}</span>
      </section>
    </React.Fragment>
  );
}
