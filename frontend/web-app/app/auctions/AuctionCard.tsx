import Image from "next/image";

import CardImage from "./CardImage";
import CountDownTimer from "./CountDownTimer";

type Props = {
  auction: any;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <a href="#" className="group">
      <div className="aspect-h-10 aspect-w-16 w-full overflow-hidden rounded-lg bg-gray-200">
        <div>
          <CardImage imageUrl={auction.imageUrl} />
          <div className="absolute bottom-2 left-2">
            <CountDownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-base">
          {auction.make} {auction.model}
        </h3>
        <p className="text-base font-semibold">{auction.year}</p>
      </div>
    </a>
  );
}
