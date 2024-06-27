"use client";

import { CarFront } from "lucide-react";
import Search from "./Search";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-5 text-base shadow-md text-foreground/60">
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
}