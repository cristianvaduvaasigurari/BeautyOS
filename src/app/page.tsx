"use client";

import React, { useEffect, useState } from "react";
import { LandingPage } from "../components/LandingPage";
import { Auth } from "../components/Auth";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <LandingPage onGetStarted={() => setAuthModalOpen(true)} />
      {authModalOpen && (
        <Auth isModal={true} onClose={() => setAuthModalOpen(false)} />
      )}
    </>
  );
}
