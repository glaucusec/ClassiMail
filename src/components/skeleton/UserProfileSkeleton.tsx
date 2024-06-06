import React from "react";

export default function UserProfileSkeleton() {
  return (
    <React.Fragment>
      <div className="">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 animate-pulse"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-56 animate-pulse"></div>
      </div>
    </React.Fragment>
  );
}
