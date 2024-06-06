import React from "react";
import Profile from "../../components/Profile";
import Classify from "../../components/Classify";
import EmailFetcher from "@/components/EmailFetcher";

export default function page() {
  return (
    <React.Fragment>
      <Profile />
      
      <Classify />
      <EmailFetcher />
    </React.Fragment>
  );
}
