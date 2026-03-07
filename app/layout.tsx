import type { Metadata } from "next";
import ProgressBarProvider from "./ProgressBarProvider";

export const metadata: Metadata = {
  title: "NovaGames – Download Best Rummy & Slots Apps",
  description: "Download the best Nova Rummy, Slots and Casino apps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ProgressBarProvider />
        {children}
      </body>
    </html>
  );
}
