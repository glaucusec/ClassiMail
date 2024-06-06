import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-row justify-between min-h-24">
      <div className="flex flex-row gap-3 items-center">
        <section className="">
          <img
            className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
        </section>
        <section className="flex flex-col">
          <span className="">Deadpool</span>
          <span className="">peterparker@marvel.com</span>
        </section>
      </div>
      <div className="inline-flex justify-right items-center">
        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition hover:-translate-y-1 hover:drop-shadow-2xl">
          Logout
        </button>
      </div>
    </div>
  );
}
