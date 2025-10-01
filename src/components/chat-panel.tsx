"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "./logo";
import { logout } from "@/app/auth/actions";
import { Button } from "./ui/button";
import { LogOut, Newspaper } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { sendMessage } from "@/app/dashboard/actions";
import { useDashboard } from "@/context/dashboard-context";
import ChatMessage from "./chat-message";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import type { User } from "@/lib/types";


export default function ChatPanel({ user }: { user: User }) {
  const { messages, setMessages, isProcessing, setIsProcessing, addMessage } = useDashboard();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const handleSendMessage = async (formData: FormData) => {
    const query = formData.get("query") as string;
    if (!query.trim()) return;

    setIsProcessing(true);
    setInput('');
    
    // Immediately add user message to the UI
    addMessage({ role: 'user', content: query, timestamp: Date.now() });

    try {
      // Pass the full chat history up to the last message
      const newMessages = await sendMessage(query, user.id, messages);
      setMessages(newMessages);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally, add an error message to the chat
      addMessage({ role: 'assistant', content: 'Sorry, something went wrong.', timestamp: Date.now() });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen flex-col border-r bg-card/50">
      <header className="flex items-center justify-between border-b p-4">
        <Logo />
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/blog">
                    <Newspaper className="h-4 w-4" />
                </Link>
            </Button>
           <Avatar className="h-8 w-8">
             <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
           </Avatar>
           <form action={logout}>
             <Button variant="ghost" size="icon" type="submit">
               <LogOut className="h-4 w-4" />
             </Button>
           </form>
         </div>
      </header>

      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isProcessing && (
             <div className="flex items-start gap-3">
             <Avatar className="h-10 w-10 border">
                 <AvatarImage src="https://picsum.photos/seed/ai-avatar/40/40" alt="AI Avatar" />
                 <AvatarFallback>AI</AvatarFallback>
             </Avatar>
             <div className="flex-1 space-y-2 pt-1">
                 <p className="font-semibold">AI Assistant</p>
                 <Skeleton className="h-4 w-12" />
             </div>
         </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <form
          id="chat-input-form"
          action={handleSendMessage}
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSendMessage(formData);
            (e.currentTarget as HTMLFormElement).reset();
          }}
        >
          <Textarea
            id="chat-input"
            name="query"
            placeholder="Ask Commerce Copilot..."
            className="min-h-[60px] resize-none pr-20"
            required
            disabled={isProcessing}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 (e.target as HTMLTextAreaElement).form?.requestSubmit();
               }
            }}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute bottom-3 right-3 bg-accent text-accent-foreground"
            disabled={isProcessing || !input.trim()}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
