import { useSearchParams } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";
import { MainContext } from "@/context/MainContext";
import { emailType } from "@/types";

export default function MailModal({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { emails } = useContext(MainContext);
  const [mail, setMail] = useState<emailType | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    setMail(null);
    if (id) {
      const mail = emails.find((email) => email.messageId === id);
      if (mail) setMail(mail);
    }
  }, [id, emails]);

  if (!mail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 border rounded-md">
      <section className="flex flex-row justify-end items-center">
        <button onClick={handleClose}>Close</button>
      </section>
      <section className="flex flex-col gap-6">
        <h1 className="font-semibold text-sm">{mail.sender}</h1>
        <p className="font-medium text-md max-w-md">{mail.snippet}</p>
      </section>
    </div>
  );
}
