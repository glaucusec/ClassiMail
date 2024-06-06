import React from "react";

function Skeleton() {
  return (
    <div className="bg-white p-4 flex flex-col gap-4 rounded-md animate-pulse shadow-2xl">
      <div className="h-3 bg-gray-200 rounded-full w-48"></div>
      <div className="flex flex-col gap-4">
        <div className="bg-gray-200 h-2.5 w-full"></div>
        <div className="bg-gray-200 h-2.5 w-full"></div>
        <div className="bg-gray-200 h-2.5 w-full"></div>
      </div>
    </div>
  );
}

export default function EmailSkeleton() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => Skeleton());
}
