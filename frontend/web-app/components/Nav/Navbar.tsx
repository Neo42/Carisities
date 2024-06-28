import Link from "next/link";

import { getCurrentUser } from "@/app/actions/authActions";

import LoginButton from "./LoginButton";
import Logo from "./Logo";
import SearchBar from "./Search";
import UserActions from "./UserActions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center gap-3">
        <Logo />
        <SearchBar />
        {user ? <UserActions user={user} /> : <LoginButton />}
      </div>
    </header>
  );
}
