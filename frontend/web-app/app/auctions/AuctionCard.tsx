import Image from "next/image";
import CountDownTimer from "./CountDownTimer";
import CardImage from "./CardImage";

type Props = {
  auction: any;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <a href="#" className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-16 aspect-h-10">
        <div>
          <CardImage imageUrl={auction.imageUrl} />
          <div className="absolute bottom-2 left-2">
            <CountDownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-base">{auction.make} {auction.model}</h3>
        <p className="text-base font-semibold ">{auction.year}</p>
      </div>
    </a>
  );
}