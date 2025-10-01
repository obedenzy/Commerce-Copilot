"use client";

import { useRouter } from "next/navigation";
import ChatPanel from "@/components/chat-panel";
import type { ReactNode } from "react";
import { DashboardProvider } from "@/context/dashboard-context";
import { useEffect, useState } from "react";
import type { User } from "@/lib/types";
import Loading from "./loading";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      router.replace("/");
    } else {
      setUser(JSON.parse(session));
      setLoading(false);
    }
  }, [router]);

  if (loading || !user) {
    return <Loading />;
  }
  
  const chatHistory = JSON.parse(localStorage.getItem(`chat_history_${user.id}`) || '[]');

  return (
    <DashboardProvider initialMessages={chatHistory ?? []} user={user}>
      <div className="grid h-screen w-full grid-cols-1 md:grid-cols-[450px_1fr]">
        <ChatPanel user={user} />
        <main className="flex flex-col overflow-auto">{children}</main>
      </div>
    </DashboardProvider>
  );
}
