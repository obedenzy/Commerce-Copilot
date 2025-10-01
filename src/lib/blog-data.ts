export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  imageHint: string;
}

export const posts: Post[] = [
  {
    id: 1,
    slug: 'getting-started-with-ai',
    title: 'Getting Started with AI in E-Commerce',
    excerpt: 'Learn how to integrate AI into your e-commerce platform to boost sales and improve customer experience.',
    content: `
AI is transforming the e-commerce landscape. From personalized recommendations to intelligent search, the possibilities are endless. This post will guide you through the first steps of implementing AI in your online store.

We'll cover:
- Choosing the right AI tools
- Integrating a recommendation engine
- Using AI for inventory management
- Personalizing marketing campaigns
    `,
    author: 'Jane Doe',
    date: '2024-07-28',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
    imageHint: 'technology abstract',
  },
  {
    id: 2,
    slug: 'the-power-of-personalization',
    title: 'The Power of Personalization',
    excerpt: 'Discover how personalization can dramatically increase customer engagement and conversion rates.',
    content: `
Personalization is no longer a "nice-to-have" in e-commerce; it's a necessity. Customers expect tailored experiences, and AI is the key to delivering them at scale.

This article explores:
- Dynamic pricing strategies
- Personalized product carousels
- Targeted email and ad campaigns
- How to collect and leverage user data effectively
    `,
    author: 'John Smith',
    date: '2024-07-27',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
    imageHint: 'writing notebook',
  },
  {
    id: 3,
    slug: 'future-of-commerce',
    title: 'The Future of Commerce is AI-Powered',
    excerpt: 'A look into the future of online retail and the role AI will play in shaping it.',
    content: `
What will e-commerce look like in the next decade? This post explores the futuristic technologies that are just around the corner.

We'll discuss:
- AI-driven supply chains
- Voice commerce and conversational AI
- Augmented reality for virtual try-ons
- The ethics of AI in retail
    `,
    author: 'Alice Johnson',
    date: '2024-07-26',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
    imageHint: 'future city',
  },
];

export const getPostBySlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};
