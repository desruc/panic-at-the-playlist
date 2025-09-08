import type { Metadata } from "next";
import { Geist, Rock_Salt } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Panic! At The Playlist - Wedding Song Requests",
    template: "%s | Panic! At The Playlist"
  },
  description: "Request songs for James & Alexandra's wedding reception playlist. Submit your favorite songs to help create the perfect soundtrack for our special day!",
  keywords: ['wedding', 'playlist', 'music', 'songs', 'James', 'Alexandra', 'wedding reception', 'song requests'],
  authors: [{ name: 'James & Alexandra' }],
  creator: 'James & Alexandra',
  publisher: 'Panic! At The Playlist',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://letsgetmarried.lol',
    siteName: 'Panic! At The Playlist',
    title: 'Panic! At The Playlist - Wedding Song Requests',
    description: 'Request songs for James & Alexandra\'s wedding reception playlist. Submit your favorite songs to help create the perfect soundtrack for our special day!',
  },
  twitter: {
    card: 'summary',
    title: 'Panic! At The Playlist - Wedding Song Requests',
    description: 'Request songs for James & Alexandra\'s wedding reception playlist!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification if needed
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
