"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/context/dashboard-context";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Welcome from "./welcome";
import { TrendingUp, Package } from "lucide-react";

export default function ResultsPanel() {
  const { lastAIResponse } = useDashboard();

  const renderContent = () => {
    if (!lastAIResponse || (!lastAIResponse.sales_data && !lastAIResponse.product_data)) {
      return <Welcome />;
    }

    const { sales_data, product_data } = lastAIResponse;

    return (
      <div className="space-y-6">
        {sales_data && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary"/>
                Sales Trends Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sales_data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
        {product_data && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary"/>
                Generated Product Description
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-invert max-w-none text-foreground/90 font-code rounded-md border bg-muted/50 p-4">
                    <pre><code>{JSON.stringify(product_data, null, 2)}</code></pre>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
}
