"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("session");
    // Optionally clear chat history too
    // This is a bit aggressive, a user might want to keep it.
    // For now we will keep it.
    router.replace("/");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Logging out...</p>
    </div>
  );
}
