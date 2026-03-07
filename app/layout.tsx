import type { Metadata } from "next";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const metadata: Metadata = {
  title: "NovaGames – Download Best Rummy & Slots Apps",
  description: "Download the best Nova Rummy, Slots and Casino apps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ProgressBar
          height="3px"
          color="#00e676"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </body>
    </html>
  );
}
