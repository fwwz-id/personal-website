"use client";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Check, Copy as CopyIcon } from "lucide-react";

type Props = {
  containerId?: string;
  buttonClassName?: string;
};

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

function detectLanguage(pre: HTMLElement, code: HTMLElement | null): string | undefined {
  const fromData = (code?.getAttribute("data-language") || pre.getAttribute("data-language") || "").trim();
  if (fromData) return fromData.toLowerCase();
  const langAttr = (code?.getAttribute("lang") || pre.getAttribute("lang") || "").trim();
  if (langAttr) return langAttr.toLowerCase();
  const cls = (code?.className || pre.className || "").toString();
  const m = cls.match(/(?:language|lang)-([a-z0-9+#-]+)/i);
  if (m && m[1]) return m[1].toLowerCase();
  const fig = pre.closest("figure[data-rehype-pretty-code-fragment]");
  const titleEl = fig?.querySelector<HTMLElement>("[data-rehype-pretty-code-title], figcaption");
  const titleText = titleEl?.textContent?.trim() || "";
  const extMatch = titleText.match(/\.([a-z0-9]+)(?:\s|$)/i);
  if (extMatch && extMatch[1]) return extMatch[1].toLowerCase();
  return undefined;
}

function mountCopyButton(pre: HTMLPreElement, buttonClassName?: string) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    buttonClassName ||
    "code-copy-btn absolute top-2 right-2 rounded-none border-2 border-foreground bg-background text-foreground w-10 h-10 flex items-center justify-center opacity-0 transition";
  btn.setAttribute("aria-label", "Copy code to clipboard");

  const iconRoot = createRoot(btn);
  const renderIcon = (copied: boolean) => {
    iconRoot.render(copied ? <Check size={18} /> : <CopyIcon size={18} />);
  };
  renderIcon(false);

  btn.addEventListener("click", async () => {
    const code = pre.querySelector("code");
    const text = code ? code.textContent || "" : pre.textContent || "";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      renderIcon(true);
      btn.classList.add("copied");
      setTimeout(() => {
        renderIcon(false);
        btn.classList.remove("copied");
      }, 1500);
    } catch {
      // no-op
    }
  });

  pre.appendChild(btn);
}

function mountLangBadge(pre: HTMLPreElement, raw: string | undefined) {
  if (!raw) return;
  const ext = EXT_MAP[raw] || raw;
  const name = NAME_MAP[ext] || raw.charAt(0).toUpperCase() + raw.slice(1);
  const badge = document.createElement("div");
  badge.className =
    "absolute bottom-2 right-2 rounded-none border-2 border-foreground bg-background text-foreground px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase opacity-90";
  badge.textContent = `.${ext}`;
  badge.title = name;
  pre.appendChild(badge);
  pre.classList.add("has-code-lang");
}

// Adds a copy-to-clipboard button to each code block and a language badge
export function CodeCopy({ containerId = "post-content", buttonClassName }: Props) {
  useEffect(() => {
    const container = document.getElementById(containerId) ?? document;

    const enhance = () => {
      const pres = container.querySelectorAll<HTMLPreElement>(
        "figure[data-rehype-pretty-code-fragment] pre, pre[data-theme], pre:has(code)"
      );

      pres.forEach((pre) => {
        if (pre.dataset.copyAttached === "true") return;
        pre.dataset.copyAttached = "true";

        if (getComputedStyle(pre).position === "static") {
          pre.style.position = "relative";
        }
        pre.classList.add("code-block-pre");

        const codeEl = pre.querySelector<HTMLElement>("code");
        const rawLang = detectLanguage(pre, codeEl);
        mountLangBadge(pre, rawLang);
        mountCopyButton(pre, buttonClassName);
      });
    };

    enhance();
    const mo = new MutationObserver(() => enhance());
    const target = container instanceof Document ? container.documentElement : container;
    mo.observe(target, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [containerId, buttonClassName]);

  return null;
}

