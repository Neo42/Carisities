"use client";

import { CircleUserRoundIcon, UserIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import { Button } from "../UI/Button";

type Props = {
  user: Partial<User>;
};

export default function UserActions({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:outline-none flex items-center">
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback className="bg-transparent dark:bg-transparent">
              <CircleUserRoundIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Welcome, {user.name?.split(" ")[0] ?? user.email}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>My Auctions</DropdownMenuItem>
        <DropdownMenuItem>Auction Won</DropdownMenuItem>
        <DropdownMenuItem>Sell My Car</DropdownMenuItem>
        {process.env.NODE_ENV === "development" ? (
          <DropdownMenuItem>
            <Link href="/session">Session (Dev Only)</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
