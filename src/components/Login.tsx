"use client";
import React, { useEffect, useState } from "react";
import { doSocialLogin } from "@/app/actions";

export default function Login() {
  const [openAiKey, setOpenAiKey] = useState("");

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setOpenAiKey(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("openai-key", openAiKey);
  }, [openAiKey]);

  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <div>
        <button
          className="border-1 border-blue-900 rounded-xl p-4 bg-blue-900 text-white drop-shadow-2xl transition hover:-translate-y-2"
          onClick={() => doSocialLogin()}
        >
          Login with Google 🚀
        </button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <input
          onChange={inputChangeHandler}
          id="openai-api-key-input"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition focus:box-shadow-2xl"
          type="text"
          name="openaiKey"
          placeholder="Enter OpenAI API key"
        />
      </div>
    </div>
  );
}
