"use client";

import { CarFront } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useParamsStore } from "@/hooks/useParamsStore";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function doReset() {
    if (pathname !== "/") {
      router.push("/");
    }
    reset();
  }

  return (
    <div onClick={doReset} className="flex items-center gap-2 font-bold cursor-pointer ">
      <CarFront size={25} />
      <div>Caristie&apos;s</div>
    </div>
  );
}
