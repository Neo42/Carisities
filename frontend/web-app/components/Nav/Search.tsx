"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/Input";
import { useParamsStore } from "@/hooks/useParamsStore";

export default function SearchBar() {
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);
  const [focused, setFocused] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function search() {
    setParams({ searchTerm: searchValue });
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (ref.current) {
          setFocused((focused) => !focused);
          if (!focused) {
            ref.current.focus();
          } else {
            ref.current.blur();
          }
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [focused]);

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form className="flex-1 ml-auto sm:flex-initial">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] h-9"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              search();
            }
          }}
          value={searchValue}
          onChange={onChange}
          placeholder="Search make, model or color"
        />
        <kbd className="absolute right-2.5 top-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>/
        </kbd>
      </div>
    </form>
  );
}
