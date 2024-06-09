"use client";
import React, { createContext, useEffect, useState } from "react";
import { emailType } from "@/types";

type MainStateType = {
  emails: emailType[];
  setEmails: React.Dispatch<React.SetStateAction<emailType[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  classifyMails: () => Promise<void>;
  fetchNEmails: (count: number) => Promise<void>;
  mailLoading: boolean;
  tagLoading: boolean;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: MainStateType = {
  emails: [{ sender: "", snippet: "", messageId: "", labelIds: [] }],
  setEmails: () => {},
  tags: [""],
  setTags: () => {},
  classifyMails: async () => {},
  fetchNEmails: async () => {},
  mailLoading: false,
  tagLoading: false,
  modalOpen: false,
  setModalOpen: () => {},
};

export const MainContext = createContext(initialState);

export default function MainContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emails, setEmails] = useState<emailType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [mailLoading, setMailLoading] = useState<boolean>(false);
  const [tagLoading, setTagsLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchInitialMails() {
      setMailLoading(true);
      await fetchNEmails(5);
      setMailLoading(false);
    }
    fetchInitialMails();
  }, []);

  async function fetchNEmails(count: number = 5) {
    setMailLoading(true);
    try {
      const response = await fetch(`/api/emails/${count}`, {
        credentials: "include",
      });
      const data = await response.json();
      setEmails(data);
      setMailLoading(false);
    } catch (err) {
      setMailLoading(false);
    }
  }

  async function classifyMails() {
    setTagsLoading(true);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emails),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const propContext: MainStateType = {
    emails,
    setEmails,
    tags,
    setTags,
    classifyMails,
    fetchNEmails,
    mailLoading,
    tagLoading,
    modalOpen,
    setModalOpen,
  };

  return (
    <MainContext.Provider value={propContext}>{children}</MainContext.Provider>
  );
}
