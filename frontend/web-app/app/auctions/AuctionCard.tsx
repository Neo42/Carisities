import Link from "next/link";

import { Auction } from "../types";
import CardImage from "./CardImage";
import CountDownTimer from "./CountDownTimer";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-h-10 aspect-w-16">
        <div>
          <CardImage imageUrl={auction.imageUrl} />
          <div className="absolute bottom-2 left-2">
            <CountDownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <h3>
          {auction.make} {auction.model} {auction.year}
        </h3>
      </div>
    </Link>
  );
}
