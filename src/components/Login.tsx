import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div className="">
        <button
          id="openai-api-key"
          className="border-1 border-blue-900 rounded-xl p-4 bg-blue-900 text-white drop-shadow-2xl transition hover:-translate-y-2"
          onClick={() => login()}
        >
          Login with Google 🚀
        </button>
      </div>
      <div className="flex flex-col items-center gap-3">
        {/* <label htmlFor="openai-key">Enter OpenAI API key</label> */}
        <input
          id="openai-api-key"
          className="border border-blue-900 p-4 rounded-md transition focus:box-shadow-2xl"
          type="text"
          name="openaiKey"
          placeholder="Enter OpenAI API key"
        />
      </div>
    </div>
  );
}
