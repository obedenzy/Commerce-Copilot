'use server';

/**
 * @fileOverview Summarizes key commerce data using an LLM.
 *
 * - summarizeCommerceData - A function that summarizes commerce data.
 * - SummarizeCommerceDataInput - The input type for the summarizeCommerceData function.
 * - SummarizeCommerceDataOutput - The return type for the summarizeCommerceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCommerceDataInputSchema = z.object({
  salesTrends: z.string().describe('Recent sales trends data.'),
  productCategories: z.string().describe('Popular product categories data.'),
});
export type SummarizeCommerceDataInput = z.infer<typeof SummarizeCommerceDataInputSchema>;

const SummarizeCommerceDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the key commerce data.'),
});
export type SummarizeCommerceDataOutput = z.infer<typeof SummarizeCommerceDataOutputSchema>;

export async function summarizeCommerceData(
  input: SummarizeCommerceDataInput
): Promise<SummarizeCommerceDataOutput> {
  return summarizeCommerceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCommerceDataPrompt',
  input: {schema: SummarizeCommerceDataInputSchema},
  output: {schema: SummarizeCommerceDataOutputSchema},
  prompt: `You are an AI assistant helping an admin understand commerce data.

  Summarize the key insights from the following data to help the admin quickly understand overall business performance.

  Recent Sales Trends: {{{salesTrends}}}

  Popular Product Categories: {{{productCategories}}}
  `,
});

const summarizeCommerceDataFlow = ai.defineFlow(
  {
    name: 'summarizeCommerceDataFlow',
    inputSchema: SummarizeCommerceDataInputSchema,
    outputSchema: SummarizeCommerceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
