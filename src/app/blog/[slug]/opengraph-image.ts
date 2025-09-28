import { generateOGImage } from "~/lib/og-generator";
import { getBlogPostBySlug } from "../helper";

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
