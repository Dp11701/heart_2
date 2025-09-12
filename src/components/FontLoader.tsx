"use client";

import Head from "next/head";

export default function FontLoader() {
  return (
    <Head>
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
    </Head>
  );
}
