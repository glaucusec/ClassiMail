"use client";
import React, { useContext, useState, useEffect } from "react";
import EmailsList from "./EmailsList";
import { AuthContext } from "@/context/AuthContext";
import EmailSkeleton from "./skeleton/EmailSkeleton";

type emailType = {
  sender: string;
  snippet: string;
};

export default function EmailFetcher() {
  const [emails, setEmails] = useState<emailType[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      const fetchEmails = async () => {
        const response = await fetch("/api/", {
          method: "POST",
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        console.log(data);
        setEmails(data);
      };
      fetchEmails();
    }
  }, [token]);

  return emails.length == 0 ? (
    <EmailSkeleton />
  ) : (
    <EmailsList emails={emails} />
  );
}
