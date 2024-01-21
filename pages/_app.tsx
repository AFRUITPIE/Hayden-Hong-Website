import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProps } from "next/app";
import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Analytics />
      <SpeedInsights />
      <Component {...pageProps} />
    </div>
  );
}
