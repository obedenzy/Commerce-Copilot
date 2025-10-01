import { posts } from '@/lib/blog-data';
import BlogCard from '@/components/blog-card';
import Logo from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className='flex items-center gap-4'>
            <Button asChild variant="outline" size="icon">
                <Link href="/dashboard">
                    <ArrowLeft />
                </Link>
            </Button>
            <h1 className="text-4xl font-bold tracking-tight">Our Blog</h1>
        </div>
        <Logo />
      </div>
      <p className="text-lg text-muted-foreground mb-12">
        Insights, news, and updates from the {process.env.APP_NAME} team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
