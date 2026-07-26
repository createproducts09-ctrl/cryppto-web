"use client";

import { Suspense } from "react";

import AskClient from "./AskClient";

export default function AskPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
        </div>
      }
    >
      <AskClient />
    </Suspense>
  );
}
