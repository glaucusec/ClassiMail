import React, { useState } from "react";
import Classify from "../../components/Classify";
import EmailsList from "@/components/EmailsList";
import Header from "@/components/Header";

export default async function page() {
  return (
    <React.Fragment>
      <Header />
      <Classify />
      <EmailsList />
    </React.Fragment>
  );
}
