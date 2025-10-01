"use client";

import type { ChatMessage, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { submitFeedback } from "@/app/dashboard/actions";
import { useDashboard } from "@/context/dashboard-context";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { format } from 'date-fns';

export default function ChatMessage({ message }: { message: ChatMessage }) {
  const { user } = useDashboard();
  const [feedbackSent, setFeedbackSent] = useState(false);

  const isUser = message.role === "user";
  const author = isUser ? (user as User)?.email : "AI Assistant";
  const avatarUrl = isUser
    ? `https://i.pravatar.cc/40?u=${user.id}`
    : "https://picsum.photos/seed/ai-avatar/40/40";
  const avatarFallback = isUser
    ? (user as User).email?.[0].toUpperCase() ?? "U"
    : "AI";

  const handleFeedback = async (rating: 1 | -1) => {
    if (feedbackSent) return;
    // For localStorage, we'll just log it. A real implementation would save it.
    const result = await submitFeedback(message.id, rating, "", user.id);
    if(result.success) {
      const feedbackKey = `feedback_${user.id}`;
      const allFeedback = JSON.parse(localStorage.getItem(feedbackKey) || '[]');
      allFeedback.push(result.feedback);
      localStorage.setItem(feedbackKey, JSON.stringify(allFeedback));
      setFeedbackSent(true);
    }
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={avatarUrl} alt={author} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2">
            <p className="font-semibold">{author}</p>
            <time className="text-xs text-muted-foreground">
                {format(new Date(message.timestamp), 'HH:mm')}
            </time>
        </div>
        <Card className={isUser ? "bg-accent text-accent-foreground" : "bg-card"}>
          <CardContent className="p-3">
             <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap font-sans">
              {message.content}
            </div>
          </CardContent>
        </Card>
        {!isUser && !feedbackSent && (
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleFeedback(1)}
              aria-label="Good response"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleFeedback(-1)}
              aria-label="Bad response"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={author || ""} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
