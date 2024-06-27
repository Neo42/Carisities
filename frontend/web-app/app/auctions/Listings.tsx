"use client";

import AppPagination from "@/components/UI/Pagination";
import { Auction, PagedResult } from "../types";
import AuctionCard from "./AuctionCard";
import { useEffect, useState } from "react";
import { getData } from "../actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/shallow";
import qs from 'query-string';
import EmptyFilter from "@/components/UI/EmptyFilter";

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy
  }), shallow);

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loading...</h3>;

  const { pageSize, pageNumber } = params;
  const { pageCount, results: auctions } = data;

  return (data.totalCount === 0)
    ? <EmptyFilter showReset />
    : <>
      <Filters />
      <div className="grid grid-cols-4 gap-6 mb-4">
        {auctions.map(
          (auction) => (
            <AuctionCard auction={auction} key={auction.id} />
          ))}
      </div>
      <AppPagination currentPage={pageNumber} pageCount={pageCount} onPageChange={setPageNumber} />
    </>
    ;
}