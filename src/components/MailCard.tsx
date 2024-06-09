import Link from "next/link";
import React, { useContext } from "react";
import { MainContext } from "@/context/MainContext";
import { emailType } from "@/types";
import EmailBadge from "./Badge";
import TagSkeleton from "./skeleton/TagSkeleton";

export default function MailCard({
  url,
  email,
}: {
  url: string;
  email: emailType;
}) {
  const { setModalOpen, tagLoading } = useContext(MainContext);
  return (
    <Link onClick={() => setModalOpen(true)} href={url}>
      <div
        key={email.messageId}
        className="flex flex-col gap-2 p-2 rounded-md font-medium cursor-pointer text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:ring-2 transition hover:translate-x-1"
      >
        <section className="flex flex-row justify-between">
          <h2 className="text-md font-semibold">{email.sender}</h2>
          {tagLoading && <TagSkeleton />}
          {!tagLoading && email.category && (
            <EmailBadge category={email.category} />
          )}
        </section>
        <p className="text-sm">{email.snippet}</p>
      </div>
    </Link>
  );
}
