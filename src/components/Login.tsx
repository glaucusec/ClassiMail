import React from "react";
import { doSocialLogin } from "@/app/actions";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div className="flex flex-col gap-24 border-white p-10 rounded-md shadow-2xl">
        <section className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-800 to-indigo-400 inline-block text-transparent bg-clip-text">Classi-Mail</h1>
          <p className="text-sm bg-gradient-to-r from-indigo-400 to-blue-800 inline-block text-transparent bg-clip-text">powered by GPT-4o 🔥</p>
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
