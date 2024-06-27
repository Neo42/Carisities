import { ToggleGroup, ToggleGroupItem } from "@/components/UI/toggle-group";
import { useParamsStore } from "@/hooks/useParamsStore";
import { ArrowUpAz, CalendarCheck, Clock, Clock1, Clock11, Hourglass, Radio } from "lucide-react";

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
  {
    label: "Alphabetical",
    icon: ArrowUpAz,
    value: "make"
  },
  {
    label: "End date",
    icon: Clock11,
    value: "endingSoon"
  },
  {
    label: "Recently added",
    icon: Clock1,
    value: "new"
  }
];

const filterButtons = [
  {
    label: "Live Auctions",
    icon: Radio,
    value: "live"
  },
  {
    label: "End in 6 hours",
    icon: Hourglass,
    value: "endingSoon"
  },
  {
    label: "Completed",
    icon: CalendarCheck,
    value: "finished"
  }
];

export default function Filters() {
  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);
  const orderBy = useParamsStore(state => state.orderBy);
  const filterBy = useParamsStore(state => state.filterBy);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center justify-center">
        <span className="mr-2 text-sm font-semibold uppercase text-primary">Filter by</span>
        <ToggleGroup
          type="single"
          variant="outline"
          className="text-primary"
          value={filterBy}
          defaultValue={filterBy}
          onValueChange={(value) => setParams({ filterBy: value })}
        >
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <ToggleGroupItem value={value} key={value}>
              <Icon className="w-4 h-4 mr-3" />
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div><div className="flex items-center justify-center">
        <span className="mr-2 text-sm font-semibold uppercase text-primary">Order by</span>
        <ToggleGroup
          type="single"
          variant="outline"
          className="text-primary"
          value={orderBy}
          defaultValue={orderBy}
          onValueChange={(value) => setParams({ orderBy: value })}
        >
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <ToggleGroupItem value={value} key={value}>
              <Icon className="w-4 h-4 mr-3" />
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex items-center justify-center">
        <span className="mr-2 text-sm font-semibold uppercase text-primary">Page size</span>
        <ToggleGroup
          type="single"
          variant="outline"
          className="text-primary"
          value={pageSize.toString()}
          defaultValue={pageSize.toString()}
          onValueChange={(value) => setParams({ pageSize: Number(value) })}
        >
          {pageSizeButtons.map((value, index) => (
            <ToggleGroupItem value={value.toString()} key={index}>
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div >
  );
};