"use client";
import React, { useContext, useEffect } from "react";
import { MainContext } from "@/context/MainContext";
import EmailSkeleton from "./skeleton/EmailSkeleton";
import Modal from "./Modal";
import MailModal from "./MailModal";
import { useRouter, usePathname } from "next/navigation";
import MailCard from "./MailCard";

export default function EmailsList() {
  const { modalOpen, setModalOpen, emails, mailLoading } =
    useContext(MainContext);
  const router = useRouter();
  const pathname = usePathname();

  function handleClose() {
    setModalOpen((prev) => !prev);
    router.back();
  }

  function navURL(id: string) {
    if (typeof window !== "undefined") {
      const url = new URL(pathname, window.location.origin);
      url.searchParams.set("id", id);
      return url;
    }
    return "";
  }

  if (mailLoading) {
    return <EmailSkeleton />;
  }

  return (
    <React.Fragment>
      <div className="mt-10 rounded-md flex flex-col gap-2">
        {emails.map((email) => {
          const url = navURL(email.messageId);
          return (
            <MailCard
              key={email.messageId}
              email={email}
              url={url.toString()}
            />
          );
        })}
      </div>
      <Modal isOpen={modalOpen}>
        <MailModal handleClose={handleClose} />
      </Modal>
    </React.Fragment>
  );
}
