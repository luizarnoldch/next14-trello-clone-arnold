"use client";
import React, { useEffect, useState } from "react";
import ContentModal from "../modal/content-modal/content-modal";
import SubscriptionModal from "../modal/subscription-modal/subscription-modal";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ContentModal />
      <SubscriptionModal />
    </>
  );
};

export default ModalProvider;
