"use client";

import React, { useEffect } from "react";
import Dashboard from "./dashboard/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/masuk"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  // Show loading state while session is being checked
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Render dashboard if authenticated
  return (
    <>
      <Dashboard />
    </>
  );
}
