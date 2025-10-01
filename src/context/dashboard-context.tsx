"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import type { ChatMessage, User } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

export type DashboardContextType = {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: Omit<ChatMessage, "id">) => void;
  user: User;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  lastAIResponse: ChatMessage | null;
};

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
  initialMessages,
  user,
}: {
  children: ReactNode;
  initialMessages: any[];
  user: User;
}) {
  const [messages, setMessagesState] = useState<ChatMessage[]>(initialMessages);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`chat_history_${user.id}`, JSON.stringify(messages));
    }
  }, [messages, user?.id]);

  const setMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessagesState(newMessages);
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, "id">) => {
    setMessagesState((prevMessages) => [
      ...prevMessages,
      { ...message, id: uuidv4() },
    ]);
  }, []);

  const lastAIResponse = useMemo(() => {
    return messages.filter((m) => m.role === "assistant").pop() ?? null;
  }, [messages]);

  const value = useMemo(
    () => ({
      messages,
      setMessages,
      addMessage,
      user,
      isProcessing,
      setIsProcessing,
      lastAIResponse,
    }),
    [
      messages,
      setMessages,
      addMessage,
      user,
      isProcessing,
      setIsProcessing,
      lastAIResponse,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
