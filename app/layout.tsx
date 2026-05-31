import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description: "Your personalized learning command center",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
