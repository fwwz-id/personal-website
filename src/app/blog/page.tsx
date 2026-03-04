import type { Metadata } from "next";

import SiteShell from "../site-shell";
import { getAllBlogPostsMeta } from "./helper";
import BlogList from "~/components/BlogList";

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

          <BlogList posts={blogPosts} />
        </div>
      </section>
    </SiteShell>
  );
};

export default Blog;
