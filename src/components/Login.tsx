import React from "react";
import { doSocialLogin } from "@/app/actions";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div className="border-2 border-white p-10 rounded-md shadow-2xl">
        <button
          className="border-1 border-blue-900 rounded-xl p-4 bg-blue-900 text-white drop-shadow-2xl transition hover:-translate-y-2"
          onClick={() => doSocialLogin()}
        >
          Login with Google 🚀
        </button>
      </div>
    </div>
  );
}
