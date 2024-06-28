"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

import { getData } from "@/app/actions/auctionActions";
import { Auction, PagedResult } from "@/app/types";
import EmptyFilter from "@/components/UI/EmptyFilter";
import AppPagination from "@/components/UI/Pagination";
import { useParamsStore } from "@/hooks/useParamsStore";

import AuctionCard from "./AuctionCard";
import Filters from "./Filters";

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }),
    shallow,
  );

  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loading...</h3>;

  const { pageSize, pageNumber } = params;
  const { pageCount, results: auctions } = data;

  return data.totalCount === 0 ? (
    <EmptyFilter showReset />
  ) : (
    <>
      <Filters />
      <div className="mb-4 grid grid-cols-4 gap-6">
        {auctions && auctions.map((auction) => <AuctionCard auction={auction} key={auction.id} />)}
      </div>
      <AppPagination currentPage={pageNumber} pageCount={pageCount} onPageChange={setPageNumber} />
    </>
  );
}
