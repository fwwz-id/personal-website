import type { FigmaImageResponseProps } from "next/dist/compiled/@vercel/og/types.d";

import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

type FontOptions = Required<Pick<FigmaImageResponseProps, "fonts">>["fonts"];
type FontOption = FontOptions[number];
type FontName = "Space Grotesk" | "JetBrains Mono";

type Typography = {
  text: string;
  name: FontName;
} & Pick<FontOption, "data" | "weight">;

async function loadGoogleFont({
  font,
  text,
}: {
  font: string;
  text: string;
}) {
  const url = `https://fonts.googleapis.com/css2?display=swap&family=${font}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export const contentType = "image/png";

export async function generateOGImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  title = title ?? "Ship Your MVP with Me";
  description =
    description ??
    "From idea to MVP with clean architecture, fast pages, and quick feedback loops. Practical, testable, and ready to ship.";

  console.log("Generating OG image for:", { title, description });

  const fonts: Typography[] = [
    {
      text: title,
      name: "Space Grotesk",
      weight: 900,
      data: await loadGoogleFont({
        font: "Space+Grotesk:wght@700",
        text: title,
      }),
    },
    {
      text: description,
      name: "JetBrains Mono",
      weight: 400,
      data: await loadGoogleFont({ font: "JetBrains+Mono", text: title }),
    },
    {
      text: "@fwwz.id | Creative Developer",
      name: "JetBrains Mono",
      weight: 400,
      data: await loadGoogleFont({
        font: "JetBrains+Mono",
        text: "@fwwz.id | Creative Developer",
      }),
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 630"
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="rgba(0,0,0,0.14)" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1200" height="630" fill="url(#dots)" />
        </svg>

        <div
          tw="w-8/12 min-h-8/12 flex flex-col p-14 border border-black relative"
          style={{
            boxShadow: "8px 8px 0px black",
            background: "#fff",
          }}
        >
          <svg
            width="45"
            height="82"
            viewBox="0 0 55 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 19.1L13.2 19.1L43.9 50.2L45 50.2L45 20.1L51.9 20.1L51.9 58.5L41.7 58.5L11 27.3L9.8 27.3L9.8 59.3L3 59.3L3 19.1Z"
              fill="black"
            />
            <path d="M29 92L29 1.90735e-06" stroke="black" stroke-width="7" />
          </svg>

          <div tw="flex-1 justify-between h-full w-full flex flex-col">
            <p
              tw="text-4xl mt-auto"
              style={{ fontFamily: "Space Grotesk", fontWeight: 900 }}
            >
              {title}
            </p>
            <p tw="text-xl -mt-2" style={{ fontFamily: "JetBrains Mono" }}>
              {description}
            </p>
            <div
              tw="flex items-center"
              style={{ fontFamily: "JetBrains Mono" }}
            >
              <p>@fwwz.id | Creative Developer</p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      // debug: true,
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
