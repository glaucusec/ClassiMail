import React from "react";
import Profile from "../../components/Profile";
import Classify from "../../components/Classify";
import EmailsWrapper from "@/components/EmailsWrapper";
import Email from "@/components/Email";

export default function page() {
  return (
    <React.Fragment>
      <Profile />
      <Classify />
      <EmailsWrapper>
        <Email />
        <Email />
        <Email />
        <Email />
      </EmailsWrapper>
    </React.Fragment>
  );
}
