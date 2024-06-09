import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 pt-10">
      {children}
    </div>
  );
}
