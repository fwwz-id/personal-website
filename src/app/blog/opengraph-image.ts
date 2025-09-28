import { generateOGImage } from "~/lib/og-generator";

export default async function Image() {
  return generateOGImage({
    title: "Blogs",
    description:
      "My thoughts on software development, random musings, and everything in between. ",
  });
}
