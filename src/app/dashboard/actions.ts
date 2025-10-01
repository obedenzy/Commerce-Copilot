"use server";

import { detectAndExecuteTool } from "@/lib/ai/tool-detector";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';
import type { ChatMessage, User } from "@/lib/types";

// This is a server action, so we can't directly access localStorage.
// The client will pass necessary data (like user) or we'll pass data back for client to store.
// This is a mock, so we'll simulate async operations.

function getChatHistory(userId: string): ChatMessage[] {
  // This is a server context, so we can't access localStorage.
  // In a real app, this would fetch from a database.
  // The client will be responsible for providing the history.
  // This function is illustrative of where you'd fetch data.
  return [];
}

function saveChatHistory(userId: string, messages: ChatMessage[]) {
  // This is a server context, can't access localStorage.
  // The client will save the returned messages.
}

export async function sendMessage(query: string, userId: string, fullChatHistory: ChatMessage[]): Promise<ChatMessage[]> {
  console.log("sendMessage received query:", query);
  const userMessage: ChatMessage = {
    id: uuidv4(),
    role: 'user',
    content: query,
    timestamp: Date.now(),
  };

  const aiResponse = await detectAndExecuteTool(query);
  
  const aiMessage: ChatMessage = {
    id: uuidv4(),
    role: 'assistant',
    content: aiResponse.content,
    timestamp: Date.now(),
    product_data: aiResponse.product_data,
    sales_data: aiResponse.sales_data,
  }

  const newHistory = [...fullChatHistory, userMessage, aiMessage];
  
  // The client will receive this new history and save it to localStorage
  revalidatePath("/dashboard");
  
  return newHistory;
}


export async function submitFeedback(messageId: string, rating: 1 | -1, comment: string, userId: string) {
    const newFeedback = {
        id: uuidv4(),
        user_id: userId,
        chat_message_id: messageId,
        rating,
        comment,
    };

    // In a real app, you would save this to a database.
    // We'll return it and let the client handle storage.
    console.log("Feedback submitted:", newFeedback);

    return { success: true, feedback: newFeedback };
}
