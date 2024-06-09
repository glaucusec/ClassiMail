"use client";
import React, { useEffect, useContext } from "react";
import { MainContext } from "@/context/MainContext";
import EmailSkeleton from "./skeleton/EmailSkeleton";
import Modal from "./Modal";
import MailModal from "./MailModal";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function EmailsList() {
  const { modalOpen, setModalOpen, emails, mailLoading } =
    useContext(MainContext);
  const router = useRouter(); // Move useRouter hook to the top level
  const pathname = usePathname();

  function handleClose() {
    setModalOpen((prev) => !prev);
    router.back();
  }

  function navURL(id: string) {
    const url = new URL(pathname, window.location.origin); // Use window.location.origin to construct the full URL
    url.searchParams.set("id", id);
    return url;
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
            <Link onClick={() => setModalOpen(true)} href={url}>
              <div
                key={email.messageId}
                className="flex flex-col gap-2 p-2 rounded-md font-medium cursor-pointer text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:ring-2 transition hover:translate-x-1"
              >
                <section className="flex flex-row justify-between">
                  <h2 className="text-md font-semibold">{email.sender}</h2>
                  <span className="text-sm">Tag</span>
                </section>
                <p className="text-sm">{email.snippet}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <Modal isOpen={modalOpen}>
        <MailModal handleClose={handleClose} />
      </Modal>
    </React.Fragment>
  );
}
