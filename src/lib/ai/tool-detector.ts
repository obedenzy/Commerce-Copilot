import { generateProductDescription } from "@/ai/flows/generate-product-descriptions";
import { summarizeCommerceData } from "@/ai/flows/summarize-commerce-data";
import { mockCategoryData, mockSalesData } from "@/lib/placeholder-data";

type ToolResult = {
  role: "assistant";
  content: string;
  product_data?: any;
  sales_data?: any;
};

const tools = [
  {
    name: "summarize_commerce_data",
    description: "Summarizes sales trends and popular product categories.",
    keywords: ["summarize", "sales", "trends", "performance", "categories", "popular"],
    execute: async (args: any): Promise<ToolResult> => {
      const salesTrends = JSON.stringify(mockSalesData);
      const productCategories = JSON.stringify(mockCategoryData);
      const result = await summarizeCommerceData({ salesTrends, productCategories });
      return {
        role: "assistant",
        content: result.summary,
        sales_data: mockSalesData,
      };
    },
  },
  {
    name: "generate_product_description",
    description: "Generates a product description from a product name and a list of features.",
    keywords: ["product", "description", "generate", "write"],
    execute: async (args: any): Promise<ToolResult> => {
      // Basic regex to parse name and features from query
      const productRegex = /product(?: name)? ['"](.*?)['"]/i;
      const featuresRegex = /features: (.*)/i;

      const productNameMatch = args.query.match(productRegex);
      const featuresMatch = args.query.match(featuresRegex);

      if (!productNameMatch || !featuresMatch) {
        return {
          role: "assistant",
          content: "To generate a product description, please provide the product name and a list of features. For example: `Generate a product description for product \"Wireless Earbuds\" with features: noise-cancellation, 24-hour battery`",
        };
      }
      
      const productName = productNameMatch[1];
      const features = featuresMatch[1].split(',').map((f: string) => f.trim());

      const result = await generateProductDescription({ productName, features });
      
      return {
        role: "assistant",
        content: `Here is the generated description for ${productName}:`,
        product_data: {
          productName,
          features,
          description: result.description,
        },
      };
    },
  },
];

export async function detectAndExecuteTool(query: string): Promise<ToolResult> {
  const lowerCaseQuery = query.toLowerCase();

  let bestTool = null;
  let maxMatchCount = 0;

  for (const tool of tools) {
    const matchCount = tool.keywords.filter(keyword => lowerCaseQuery.includes(keyword)).length;
    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestTool = tool;
    }
  }

  if (bestTool && maxMatchCount > 0) {
    return await bestTool.execute({ query });
  }

  return {
    role: "assistant",
    content: "I'm sorry, I'm not sure how to help with that. You can ask me to summarize sales data or generate product descriptions.",
  };
}
