"use client";
import React from "react";

const countOptions: number[] = [];
let x = 5;
while (x <= 50) {
  countOptions.push(x);
  x += 5;
}
export default function Classify() {
  return (
    <div className="flex flex-row justify-between items-center min-h-12 mt-10">
      <section>
        <form className="max-w-sm mx-auto">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {countOptions.map((option, index) => (
              <option className="" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </form>
      </section>
      <section>
        <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition hover:-translate-y-1 hover:drop-shadow-2xl">
          Classify
        </button>
      </section>
    </div>
  );
}
