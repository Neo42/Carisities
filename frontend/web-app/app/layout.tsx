import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Navbar from "../components/Nav/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container px-5 pt-10 mx-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
