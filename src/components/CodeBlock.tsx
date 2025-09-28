"use client";

import React from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
import { cn } from "~/lib/utils";

const EXT_MAP: Record<string, string> = {
  typescript: "ts",
  javascript: "js",
  jsx: "jsx",
  tsx: "tsx",
  markdown: "md",
  mdx: "mdx",
  sh: "sh",
  bash: "sh",
  shell: "sh",
  json: "json",
  yaml: "yml",
  yml: "yml",
  html: "html",
  css: "css",
  scss: "scss",
  python: "py",
  csharp: "cs",
  "c#": "cs",
};

const NAME_MAP: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript JSX",
  js: "JavaScript",
  jsx: "JavaScript JSX",
  md: "Markdown",
  mdx: "MDX",
  sh: "Shell",
  json: "JSON",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  py: "Python",
  cs: "C#",
};

function detectLangFromClass(cls?: string): string | undefined {
  if (!cls) return undefined;
  const m = cls.match(/(?:language|lang)-([a-z0-9+#-]+)/i);
  return m?.[1]?.toLowerCase();
}

function getCodeText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getCodeText).join("");
  if (React.isValidElement(children))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getCodeText((children.props as any).children);
  return "";
}

export type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  children?: React.ReactNode;
};

export function CodeBlock({ className, children, ...rest }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  let lang: string | undefined;
  let codeEl: React.ReactElement | null = null;
  if (React.isValidElement(children) && children.type === "code") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cls: string | undefined = (children.props as any).className;
    lang =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (children.props as any)["data-language"] ||
      detectLangFromClass(cls) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (children.props as any).lang;
    codeEl = children as React.ReactElement;
  }

  const codeText = React.useMemo(() => getCodeText(children), [children]);
  const ext = lang ? EXT_MAP[lang] || lang : undefined;
  const langName = ext ? NAME_MAP[ext] || ext.toUpperCase() : undefined;

  const onCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Graceful no-op; avoid deprecated execCommand
    }
  };

  return (
    <div className="code-block-wrapper relative">
      <pre
        className={cn(ext ? "has-code-lang" : undefined, className)}
        {...rest}
      >
        {codeEl ?? children}
      </pre>
      <button
        type="button"
        aria-label="Copy code to clipboard"
        onClick={onCopy}
        className={cn(
          "code-copy-btn absolute top-2 right-2 z-10 rounded-none border-2 border-foreground",
          "bg-background text-foreground w-10 h-10 flex items-center justify-center opacity-0 transition"
        )}
      >
        {copied ? <Check size={18} /> : <CopyIcon size={18} />}
      </button>
      {ext ? (
        <div
          className={cn(
            "code-lang absolute bottom-2 right-2 z-10 rounded-none border-2 border-foreground",
            "bg-background text-foreground px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase opacity-90"
          )}
          title={langName}
        >
          .{ext}
        </div>
      ) : null}
    </div>
  );
}
