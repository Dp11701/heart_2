"use client";
import "./globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Script from "next/script";

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
        <Script
          id="appleid-js"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              (window as any).AppleID?.auth?.init({
                clientId: "com.pulse.heartkit.sid",
                scope: "name email",
                redirectURI: "https://icardiac.org/success",
                usePopup: true,
                response_mode: "form_post",
              });
            } catch {}
          }}
        />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
