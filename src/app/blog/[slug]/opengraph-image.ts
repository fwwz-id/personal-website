import { generateOGImage } from "~/lib/og-generator";
import { getAllBlogPostsMeta, getBlogPostBySlug } from "../helper";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const posts = await getAllBlogPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  return generateOGImage({
    title: post?.title ?? `Fawwaz's blogpost`,
    description:
      post?.description ??
      "My thoughts on software development, random musings, and everything in between. ",
  });
}
