"use client";

import React, { useState } from "react";
import { LandingPage } from "../components/LandingPage";
import { Auth } from "../components/Auth";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <LandingPage onGetStarted={() => setAuthModalOpen(true)} />
      {authModalOpen && (
        <Auth isModal={true} onClose={() => setAuthModalOpen(false)} />
      )}
    </>
  );
}
