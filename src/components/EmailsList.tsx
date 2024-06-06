import React from "react";
import EmailCard from "./EmailCard";

type emailType = {
  sender: string;
  snippet: string;
};

export default function EmailsList({ emails }: { emails: emailType[] }) {
  return (
    <div className="mt-10 p-2 rounded-md flex flex-col gap-2">
      {emails.map((email) => (
        <EmailCard email={email} />
      ))}
    </div>
  );
}
