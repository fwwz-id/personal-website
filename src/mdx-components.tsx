import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import Image, { ImageProps } from "next/image";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { CodeBlock } from "~/components/CodeBlock";
import { cn } from "~/lib/utils";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// Brutalist table primitives for MDX
const Table = ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
  <div className={cn("w-full overflow-x-auto brutalist-card p-0")}>
    <table
      className={cn(
        "w-full min-w-[720px] table-fixed border-separate border-spacing-0 text-sm",
        className
      )}
      {...props}
    />
  </div>
);

const THead = ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
  <thead className={cn("", className)} {...props} />
);

const TBody = ({ className, ...props }: ComponentPropsWithoutRef<"tbody">) => (
  <tbody className={cn("", className)} {...props} />
);

const Tr = ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
  <tr
    className={cn(
      "even:bg-muted hover:bg-accent/10 transition-colors",
      className
    )}
    {...props}
  />
);

const Th = ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
  <th
    className={cn(
      "px-4 py-2 text-left font-grotesk font-bold uppercase tracking-tight text-xs",
      "bg-foreground text-background sticky top-0 z-10 border-b-2 border-foreground",
      "whitespace-nowrap",
      className
    )}
    {...props}
  />
);

const Td = ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
  <td
    className={cn(
      "px-4 py-3 align-top text-foreground/90 border-b border-foreground/20",
      "tabular-nums",
      className
    )}
    {...props}
  />
);

const Caption = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"caption">) => (
  <caption
    className={cn(
      "caption-top px-4 py-3 text-muted-foreground text-sm font-grotesk uppercase tracking-tight",
      className
    )}
    {...props}
  />
);

const components = {
  img: ({ alt, ...props }: ImageProps) => (
    <Image
      width={1024}
      height={1024}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      alt={alt}
      {...props}
    />
  ),
  a: ({ href, children, className, ...rest }) => {
    const isExternal =
      typeof href === "string" && /^(?:[a-z]+:)?\/\//i.test(href);
    const Icon = isExternal ? ExternalLink : LinkIcon;
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(
          "group inline text-foreground",
          "underline decoration-dotted decoration-2 underline-offset-4",
          "hover:text-accent hover:decoration-accent transition-colors",
          className as string
        )}
        {...rest}
      >
        <span>{children}</span>
        <Icon
          aria-hidden="true"
          className="ml-1 inline-block h-[0.95em] w-[0.95em] align-text-bottom opacity-60 group-hover:opacity-100"
        />
      </a>
    );
  },
  table: (props) => <Table {...props} />,
  thead: (props) => <THead {...props} />,
  tbody: (props) => <TBody {...props} />,
  tr: (props) => <Tr {...props} />,
  th: (props) => <Th {...props} />,
  td: (props) => <Td {...props} />,
  caption: (props) => <Caption {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props) => <CodeBlock {...(props as any)} />,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
