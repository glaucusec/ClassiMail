import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "@/context/AuthContext";
import RedirectToEmails from "./RedirectToEmails";

export default function Login() {
  const { token, setAccessTokenHandler } = useContext(AuthContext);
  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    onSuccess: (tokenResponse) => {
      const access_token = tokenResponse.access_token;
      setAccessTokenHandler(access_token);
    },
  });

  if (token !== "") {
    return <RedirectToEmails />;
  }
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
        <input
          id="openai-api-key"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition focus:box-shadow-2xl"
          type="text"
          name="openaiKey"
          placeholder="Enter OpenAI API key"
        />
      </div>
    </div>
  );
}
