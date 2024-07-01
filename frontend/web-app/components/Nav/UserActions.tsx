"use client";

import { CircleUserRoundIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useParamsStore } from "@/hooks/useParamsStore";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);

  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathname !== "/") {
      router.push("/");
    }
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathname !== "/") {
      router.push("/");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex items-center focus-visible:outline-none">
        <Button size="icon" variant="ghost" className="h-9 w-9">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback className="bg-transparent dark:bg-transparent">
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Welcome, {user.name?.split(" ")[0] ?? user.email}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={setSeller}>My Auctions</DropdownMenuItem>
        <DropdownMenuItem onClick={setWinner}>Auction Won</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/auctions/create">Sell My Car</Link>
        </DropdownMenuItem>
        {process.env.NODE_ENV === "development" ? (
          <DropdownMenuItem asChild>
            <Link href="/session" onClick={() => {}}>
              Session (Dev Only)
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
