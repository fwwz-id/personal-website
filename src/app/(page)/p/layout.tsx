import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Fawwaz Abdurrahim",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}