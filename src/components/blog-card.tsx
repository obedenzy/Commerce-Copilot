import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Post } from '@/lib/blog-data';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="group">
          <div className="overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={600}
              height={400}
              data-ai-hint={post.imageHint}
              className="aspect-[3/2] w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl group-hover:text-primary">{post.title}</CardTitle>
            <div className="text-sm text-muted-foreground pt-2">
              <span>By {post.author}</span> &middot; <span>{post.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-end text-primary">
              <span>Read more</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
