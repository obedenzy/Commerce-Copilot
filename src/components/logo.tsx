import { Bot } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bot className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold tracking-tighter text-foreground">
        {APP_NAME}
      </h1>
    </div>
  );
}
