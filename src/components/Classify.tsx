"use client";
import React, { useContext } from "react";
import { MainContext } from "@/context/MainContext";
import Spinner from "./Spinner";

export default function Classify() {
  const { fetchNEmails, classifyMails, tagLoading } = useContext(MainContext);

  async function handleMailCountChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newCount = parseInt(e.target.value);
    await fetchNEmails(newCount);
  }

  return (
    <div className="flex flex-row justify-between items-center min-h-12 mt-10 p-2 bg-neutral-100 rounded-md">
      <section className="w-38">
        <form className="max-w-sm mx-auto">
          <select
            onChange={handleMailCountChange}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue={5} className="" value={5}>
              Count of Emails
            </option>
            <option className="text-center font-md" value={5}>
              5
            </option>
            <option className="text-center font-md" value={10}>
              10
            </option>
            <option className="text-center font-md" value={15}>
              15
            </option>
          </select>
        </form>
      </section>
      <section className="flex items-center justify-center">
        <button
          onClick={classifyMails}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-70"
        >
          {tagLoading ? <Spinner /> : "Classify"}
        </button>
      </section>
    </div>
  );
}
