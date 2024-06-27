"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import { CarFront } from "lucide-react";

export default function Logo() {
  const reset = useParamsStore(state => state.reset);

  return (
    <div onClick={reset} className="flex items-center gap-2 font-bold cursor-pointer text-primary">
      <CarFront size={25} />
      <div>Caristie's Auctions</div>
    </div>
  );
}