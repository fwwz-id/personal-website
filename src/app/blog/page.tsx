import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import SiteShell from "../site-shell";
import { getAllBlogPostsMeta } from "./helper";

export const metadata = {
  title: "Blog | Fawwaz Abdurrahim",
  description:
    "Thoughts on software development, random musings, and everything in between.",
  openGraph: {
    title: "Blog | Fawwaz Abdurrahim",
    description:
      "Thoughts on software development, random musings, and everything in between.",
  },
} satisfies Metadata;

const Blog = async () => {
  const blogPosts = await getAllBlogPostsMeta();
  return (
    <SiteShell>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="brutalist-heading text-4xl md:text-6xl lg:text-7xl mb-6">
              BLOG
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Thoughts on software development, random musings, and everything
              in between.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              (Just a random collection of articles, thoughts, notes, and ideas)
            </p>
          </section>

          {/* Blog Posts Grid */}
          <section className="brutalist-grid">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block transition-transform duration-300 hover:-translate-y-2"
              >
                <Card className="rounded-none bg-background border-2 border-foreground transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutalist h-full">
                  <div className="aspect-video bg-muted border-b-2 border-foreground">
                    <Image
                      src={post.thumbnail}
                      width={650}
                      height={650}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <time className="text-sm text-muted-foreground font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span className="text-sm text-muted-foreground font-mono">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="brutalist-heading text-xl mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="uppercase font-mono text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </section>
        </div>
      </section>
    </SiteShell>
  );
};

export default Blog;
