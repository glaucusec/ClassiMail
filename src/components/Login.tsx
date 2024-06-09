import React from "react";
import { doSocialLogin } from "@/app/actions";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div className="flex flex-col gap-24 border-white p-10 rounded-md shadow-2xl">
        <section className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">Classi Mail</h1>
          <p className="text-sm">Continue with google to enjoy the services...</p>
        </section>
        <section className="">
          <button
            className="border border-blue-900 rounded-xl p-4 bg-blue-900 text-white drop-shadow-2xl transition hover:-translate-y-2"
            onClick={() => doSocialLogin()}
          >
            Login with Google 🚀
          </button>
        </section>
      </div>
    </div>
  );
}
