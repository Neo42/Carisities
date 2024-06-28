"use client";

import { useState } from "react";

import { Button } from "@/components/UI/Button";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";

import { UpdateAuctionTest } from "../actions/auctionActions";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Partial<{ status: number; statusText: string }> | string>(
    "Press the button to test the functionality",
  );

  function doUpdate() {
    setLoading(true);
    UpdateAuctionTest()
      .then((res) => setResult(res))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <Button onClick={doUpdate}>Test Auth</Button>
        {loading && <LoadingSpinner className="h-5 w-5 " />}
      </div>
      <pre>{typeof result === "string" ? result : JSON.stringify(result, null, 2)}</pre>
    </>
  );
}
