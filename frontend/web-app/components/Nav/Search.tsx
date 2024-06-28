"use client";

import { Search } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import { Input } from "@/components/UI/Input";
import { useParamsStore } from "@/hooks/useParamsStore";

export default function SearchBar() {
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);
  const searchValue = useParamsStore((state) => state.searchValue);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    setParams({ searchTerm: searchValue });
  }

  return (
    <form className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key == "Enter") {
              e.preventDefault();
              search();
            }
          }}
          value={searchValue}
          onChange={onChange}
          placeholder="Search..."
        />
      </div>
    </form>
  );
}
