"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/Button";

export default function LoginButton() {
  return (
    <Button
      variant="default"
      size="sm"
      onClick={() => signIn("id-server", { callbackUrl: "/" })}>
      Login
    </Button>
  );
}
