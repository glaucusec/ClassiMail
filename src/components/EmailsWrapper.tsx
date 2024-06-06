import React from "react";

export default function EmailsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 p-2 rounded-md bg-neutral-200 flex flex-col gap-2">
      {children}
    </div>
  );
}
