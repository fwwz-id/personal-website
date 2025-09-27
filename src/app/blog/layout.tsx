"use client";

import useLenis from "~/hooks/use-lenis";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useLenis();

  return (
    <>
      {lenis}
      {children}
    </>
  );
}
