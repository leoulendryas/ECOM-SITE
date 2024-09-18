"use client";
import React, { Suspense } from "react";
import AuthPage from "@/components/auth/page";

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
