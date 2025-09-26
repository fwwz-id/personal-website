import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Navigation from '~/components/Navigation';
import Footer from '~/components/Footer';
import { MDXProvider } from '@mdx-js/react';
import type { ComponentPropsWithoutRef } from 'react';
import matter from 'gray-matter';

interface MDXComponents {
  [key: string]: React.ComponentType<ComponentPropsWithoutRef<keyof JSX.IntrinsicElements>>;
}

interface BlogPostFrontmatter {
  title?: string;
  date?: string;
  author?: string;
  readingTime?: string;
  excerpt?: string;
}

interface MDXModule {
  default: () => JSX.Element;
}

const components: MDXComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-4xl font-bold mb-6" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-3xl font-semibold mt-8 mb-4" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>{children}</p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside mb-4 ml-4" {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside mb-4 ml-4" {...props}>{children}</ol>
  ),
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
  ),
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto" {...props}>{children}</pre>
  ),
  a: ({ children, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a className="text-primary hover:underline" {...props}>{children}</a>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props}>{children}</blockquote>
  ),
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const postData = useMemo(() => {
    if (!slug) return null as null | { Comp: () => JSX.Element; frontmatter: BlogPostFrontmatter };
    try {
      const compiled = import.meta.glob<MDXModule>('/src/content/blog/*.mdx', { eager: true });
      const raw = import.meta.glob('/src/content/blog/*.mdx', { as: 'raw', eager: true }) as Record<string, string>;
      const modulePath = `/src/content/blog/${slug}.mdx`;
      const m = compiled[modulePath];
      const rawContent = raw[modulePath];
      if (!m || !rawContent) return null;
      const { data, content } = matter(rawContent);
      const fm = data as BlogPostFrontmatter;
      // Compute fallback reading time when missing
      const words = content
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]+`/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[^\w\s]/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;
      const fallbackRT = `${Math.max(1, Math.round(words / 200))} min read`;
      return {
        Comp: m.default,
        frontmatter: {
          title: fm.title,
          date: fm.date,
          author: fm.author,
          readingTime: fm.readingTime || fallbackRT,
          excerpt: fm.excerpt,
        } as BlogPostFrontmatter,
      };
    } catch (e) {
      console.error('Failed to load blog post:', e);
      return null;
    }
  }, [slug]);

  if (!postData || !slug) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { Comp, frontmatter } = postData;
  const { title, date, author, readingTime } = frontmatter;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <article className="prose prose-xl dark:prose-invert max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex gap-4 text-muted-foreground">
              <span>{date}</span>
              <span>•</span>
              <span>{author}</span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
          </header>
          <MDXProvider components={components}>
            <Comp />
          </MDXProvider>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
