import React from "react";
import EmailSkeleton from "./skeleton/EmailSkeleton";
type emailType = {
  sender: string;
  snippet: string;
};

export default function EmailCard({ email }: { email: emailType }) {
  return email ? (
    <div className="rounded-md bg-white p-2">
      <h2 className="text-md font-semibold">{email.sender}</h2>
      <p className="text-sm">{email.snippet}</p>
    </div>
  ) : (
    <EmailSkeleton />
  );
}
