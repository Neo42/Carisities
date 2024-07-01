"use server";

import { FieldValues } from "react-hook-form";

import { fetchWrapper } from "@/lib/fetchWrapper";

import { Auction, PagedResult } from "../types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return await fetchWrapper.GET(`search${query}`);
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };
  return await fetchWrapper.PUT(
    "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    data,
  );
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.POST("auctions", data);
}

export async function getAuctionDetails(id: string): Promise<Auction> {
  return await fetchWrapper.GET(`auctions/${id}`);
}
