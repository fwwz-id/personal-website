import { generateOGImage } from "~/lib/og-generator";

export default async function Image() {
  return generateOGImage({
    title: "Ship Your MVP with Me",
    description:
      "From idea to MVP with clean architecture, fast pages, and quick feedback loops. Practical, testable, and ready to ship.",
  });
}
