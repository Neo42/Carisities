"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/UI/Button";

export default function LoginButton() {
  return (
    <Button variant="default" onClick={() => signIn("id-server", { callbackUrl: "/" })}>
      Login
    </Button>
  );
}
