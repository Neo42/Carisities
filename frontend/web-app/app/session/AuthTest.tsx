"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

import { updateAuctionTest } from "../actions/auctionActions";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    Partial<{ status: number; statusText: string }> | string
  >("Press the button to test the functionality");

  function doUpdate() {
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <Button onClick={doUpdate} size="sm">
          Test Auth
        </Button>
        {loading && <LoadingSpinner className="w-5 h-5 " />}
      </div>
      <pre>
        {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
      </pre>
    </>
  );
}
