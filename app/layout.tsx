import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Fields of Mistria Wiki";
const description = "A bilingual community wiki for Fields of Mistria.";

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
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
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
