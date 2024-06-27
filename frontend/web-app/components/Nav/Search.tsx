"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { useParamsStore } from "@/hooks/useParamsStore";
import { KeyboardEvent, useState } from "react";

export default function Search() {
  const setParams = useParamsStore(state => state.setParams);
  const setSearchValue = useParamsStore(state => state.setSearchValue);
  const searchValue = useParamsStore(state => state.searchValue);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    setParams({ searchTerm: searchValue });
  }

  return (
    <div className="flex w-[50%] items-center py-2 justify-center">
      <Input
        type="text"
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key == "Enter") {
            search();
          }
        }}
        value={searchValue}
        onChange={onChange}
        placeholder="Search for cars by make, model or color"
        className="w-[40%] mr-2"
      />
      <Button
        onClick={search}
        variant="outline" size="icon">
        <SearchIcon size={16} />
      </Button>
    </div>
  );
}