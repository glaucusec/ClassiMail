import React, { Suspense, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MainContext } from "@/context/MainContext";
import { emailType } from "@/types";
import Close from "./svg/Close";
import EmailBadge from "./Badge";
import Spinner from "./Spinner";

export default function MailModal({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <Suspense fallback={<Spinner />}>
      <MailContent handleClose={handleClose} />
    </Suspense>
  );
}

function MailContent({ handleClose }: { handleClose: () => void }) {
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
    return (
      <div className="p-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 rounded-md">
      <section className="flex flex-row justify-end items-center">
        <button onClick={handleClose}>
          <Close />
        </button>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-sm">{mail.sender}</h1>
          <EmailBadge category={mail.category} />
        </div>
        <p className="font-medium text-md max-w-md">{mail.snippet}</p>
      </section>
    </div>
  );
}
