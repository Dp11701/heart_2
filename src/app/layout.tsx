"use client";
import "./globals.css";
import { createTheme, MantineProvider } from "@mantine/core";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    fontFamily:
      "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  });
  return (
    <html lang="en">
      <head>
        {/* Import SF Pro Display from CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.cdnfonts.com/css/sf-pro-display"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
