"use client";

import { signIn } from "next-auth/react";

import { useParamsStore } from "@/hooks/useParamsStore";

import { Button } from "./Button";
import Heading from "./Heading";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try removing the filter",
  showReset,
  showLogin,
  callbackUrl,
}: Props) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button variant="outline" onClick={reset}>
            Remove Filters
          </Button>
        )}
        {showLogin && (
          <Button
            size="sm"
            variant="default"
            onClick={() => signIn("id-server", { callbackUrl })}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
