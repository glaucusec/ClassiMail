"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { emailType } from "@/types";
import { toast } from "sonner";

type MainStateType = {
  emails: emailType[];
  setEmails: Dispatch<SetStateAction<emailType[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  classifyMails: () => Promise<void>;
  fetchNEmails: (count: number) => Promise<void>;
  mailLoading: boolean;
  setMailLoading: Dispatch<SetStateAction<boolean>>;
  tagLoading: boolean;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const initialState: MainStateType = {
  emails: [
    { sender: "", snippet: "", messageId: "", labelIds: [], category: "" },
  ],
  setEmails: () => {},
  tags: [""],
  setTags: () => {},
  classifyMails: async () => {},
  fetchNEmails: async () => {},
  mailLoading: false,
  setMailLoading: () => {},
  tagLoading: false,
  modalOpen: false,
  setModalOpen: () => {},
};

export const MainContext = createContext<MainStateType>(initialState);

export default function MainContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [emails, setEmails] = useState<emailType[]>(initialState.emails);
  const [tags, setTags] = useState<string[]>(initialState.tags);
  const [mailLoading, setMailLoading] = useState<boolean>(
    initialState.mailLoading
  );
  const [tagLoading, setTagsLoading] = useState<boolean>(
    initialState.tagLoading
  );
  const [modalOpen, setModalOpen] = useState<boolean>(initialState.modalOpen);

  const fetchNEmails = async (count: number = 5) => {
    setMailLoading(true);
    try {
      const response = await fetch(`/api/emails/${count}`, {
        credentials: "include",
      });
      const data = await response.json();
      setEmails(data);
      toast.success("Fetched mails !");
    } catch (err) {
      toast.error("Fetch Failed! Something went wrong!");
      console.error("Failed to fetch emails:", err);
    } finally {
      setMailLoading(false);
    }
  };

  const classifyMails = async () => {
    setTagsLoading(true);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emails),
      });
      const { categories } = await response.json();
      const updatedEmails = emails.map((mail) => ({
        ...mail,
        category: categories[mail.messageId],
      }));
      setEmails(updatedEmails);
      toast.success("Mails Classified!");
    } catch (err) {
      toast.error("Classify Failed! Something went wrong!");
      console.error("Failed to classify emails:", err);
    } finally {
      setTagsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMails = async () => {
      await fetchNEmails(5);
    };
    fetchInitialMails();
  }, []);

  const propContext: MainStateType = {
    emails,
    setEmails,
    tags,
    setTags,
    classifyMails,
    fetchNEmails,
    mailLoading,
    setMailLoading,
    tagLoading,
    modalOpen,
    setModalOpen,
  };

  return (
    <MainContext.Provider value={propContext}>{children}</MainContext.Provider>
  );
}
