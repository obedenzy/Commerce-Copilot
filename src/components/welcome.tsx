import { Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Logo from "./logo";

const examplePrompts = [
  "Summarize recent sales trends.",
  "Generate a product description for 'Wireless Headphones' with features: noise-cancelling, 20-hour battery, bluetooth 5.0.",
  "What are the most popular product categories?",
];

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-8">
        <Logo />
      </div>
      <h2 className="text-3xl font-bold mb-2">Welcome to {APP_NAME}</h2>
      <p className="text-muted-foreground mb-12 max-w-lg">
        Your AI-powered admin agent for SAP Commerce Cloud. Use the chat on the left to get started.
      </p>

      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Try these examples:</h3>
        <div className="grid gap-4 md:grid-cols-1">
          {examplePrompts.map((prompt, index) => (
            <Card key={index} className="text-left bg-card/50">
                <CardContent className="p-4">
                    <p className="text-sm font-medium">{prompt}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
