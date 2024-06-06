import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="m-2 sm:m-4 md:m-6 lg:m-12 bg-white shadow-2xl rounded-md px-2">{children}</div>;
}
