import React, { Suspense } from "react";
import UserProfileSkeleton from "./skeleton/UserProfileSkeleton";
import Profile from "./Profile";
import { doLogOut } from "@/app/actions";

export default async function Header() {
  return (
    <div className="flex flex-row justify-between min-h-24 p-2 bg-neutral-100 rounded-md">
      <div className="flex flex-row gap-3 items-center">
        <Suspense fallback={<UserProfileSkeleton />}>
          <Profile />
        </Suspense>
      </div>
      <div className="inline-flex justify-right items-center">
        <form action={doLogOut}>
          <button
            type="submit"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
