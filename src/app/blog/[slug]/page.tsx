import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CodeCopy } from "~/components/CodeCopy";

import { getAllBlogPostsMeta } from "../helper";

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllBlogPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }>}) {
  const { slug } = await params;

  const { default: Post, frontmatter } = await import(`~/content/blog/${slug}.mdx`);

  if (!Post) return notFound();

  return (
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog" className="inline-block mb-8">
          <Button variant="outline" className="hover:bg-foreground hover:text-background">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground font-mono">
            <time>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{frontmatter.readTime}</span>
          </div>

          <h1 className="brutalist-heading text-3xl md:text-5xl lg:text-6xl mb-6">
            {frontmatter.title}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="uppercase font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article id="post-content" className="prose prose-lg max-w-none">
          <div className="font-grotesk leading-relaxed">
            <Post />
          </div>
        </article>
        <CodeCopy containerId="post-content" />

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t-2 border-foreground">
          <Button asChild variant="outline" className="hover:bg-foreground hover:text-background">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Posts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
