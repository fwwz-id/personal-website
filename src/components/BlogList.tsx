"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import LanguageToggle from "~/components/LanguageToggle";
import { useLanguage } from "~/providers/LanguageProvider";
import type { BlogPostMeta } from "~/app/blog/helper";

type BlogListProps = {
  posts: BlogPostMeta[];
};

const LANG_LABELS: Record<string, string> = {
  en: "English",
  id: "Indonesian",
};

const BlogList = ({ posts }: BlogListProps) => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPosts = mounted
    ? posts.filter((post) => post.lang === language)
    : posts;

  return (
    <>
      <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
        <p className="text-muted-foreground text-sm font-mono">
          {mounted
            ? `${filteredPosts.length} post${filteredPosts.length !== 1 ? "s" : ""} in ${LANG_LABELS[language]}`
            : `${posts.length} post${posts.length !== 1 ? "s" : ""} total`}
        </p>
        <LanguageToggle />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="brutalist-card p-12 text-center border-2 border-foreground">
          <p className="font-mono text-muted-foreground uppercase tracking-widest text-sm">
            No posts in {LANG_LABELS[language]} yet.
          </p>
        </div>
      ) : (
        <section className="brutalist-grid">
          {filteredPosts.map((post) => (
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
      )}
    </>
  );
};

export default BlogList;
