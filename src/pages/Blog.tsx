import { Link } from "react-router-dom";
import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";
import matter from "gray-matter";

interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
}

// Very small helpers to extract metadata when excerpt/readingTime are missing
const computeExcerpt = (content: string, maxLen = 180): string => {
  const withoutCode = content.replace(/```[\s\S]*?```/g, " ");
  const withoutHeadings = withoutCode.replace(/^\s*#{1,6} .*$/gm, " ");
  const paragraphs = withoutHeadings
    .replace(/<[^>]+>/g, " ")
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const first = paragraphs[0] || "";
  return first.length > maxLen ? `${first.slice(0, maxLen - 1)}…` : first;
};

const computeReadingTime = (content: string): string => {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\w\s]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

// Load blog posts dynamically from the content/blog directory (frontmatter via gray-matter)
const getBlogPosts = (): BlogPostMeta[] => {
  const blogPosts: BlogPostMeta[] = [];
  const mdxFiles = import.meta.glob("/src/content/blog/*.mdx", { as: "raw", eager: true }) as Record<string, string>;

  Object.entries(mdxFiles).forEach(([path, raw]) => {
    const slug = path.replace("/src/content/blog/", "").replace(".mdx", "");
    const { data, content } = matter(raw);
    const title = (data.title as string) || slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    const excerpt = (data.excerpt as string) || computeExcerpt(content);
    const date = (data.date as string) || "";
    const readingTime = (data.readingTime as string) || computeReadingTime(content);

    blogPosts.push({
      id: slug,
      title,
      excerpt,
      date,
      readingTime,
      slug,
    });
  });

  // Sort posts by date, newest first (fallback to 0 when invalid)
  return blogPosts.sort((a, b) => {
    const ad = new Date(a.date).getTime() || 0;
    const bd = new Date(b.date).getTime() || 0;
    return bd - ad;
  });
};

const Blog = () => {
  const blogPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-primary">
                  {post.title}
                </h2>
                <div className="flex gap-4 text-muted-foreground text-sm mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </Link>
            </article>
          ))}
          {blogPosts.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No blog posts found.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
