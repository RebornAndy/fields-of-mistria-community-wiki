import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Fields of Mistria Wiki — Guides, Gifts & Romance";
const description =
  "Master Fields of Mistria with beginner guides, gift lists, character schedules, farming layouts, fishing tips, romance routes, mods, and update tracking.";
const keywords = [
  "Fields of Mistria",
  "wiki",
  "guide",
  "gifts",
  "characters",
  "farming",
  "fishing",
  "romance",
  "mods",
  "updates",
];

function getRequestOrigin(requestHeaders: Headers) {
  const host = requestHeaders.get("host")?.trim();
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const localHost = host?.startsWith("localhost") || host?.startsWith("127.");
  const protocol =
    forwardedProtocol === "http" || (!forwardedProtocol && localHost)
      ? "http"
      : "https";

  try {
    return host
      ? new URL(`${protocol}://${host}`)
      : new URL("http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = getRequestOrigin(await headers());
  const socialImage = new URL("/og.png", metadataBase);

  return {
    metadataBase,
    title,
    description,
    keywords,
    icons: {
      icon: "/fields-of-mistria-favicon-512.png",
      shortcut: "/fields-of-mistria-favicon-512.png",
      apple: "/fields-of-mistria-favicon-512.png",
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: title,
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "Fields of Mistria Wiki — Characters, Gifts, and Schedules",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
