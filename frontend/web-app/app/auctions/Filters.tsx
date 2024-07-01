import {
  ArrowUpAz,
  CalendarCheck,
  Clock1,
  Clock11,
  Hourglass,
  LucideProps,
  Radio,
} from "lucide-react";
import * as react from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { State, useParamsStore } from "@/hooks/useParamsStore";

const pageSizeButtons: State["pageSize"][] = [4, 8, 12];

const orderButtons: {
  label: "alphabetical" | "end date" | "recently added";
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
  value: State["orderBy"];
}[] = [
  {
    label: "alphabetical",
    icon: ArrowUpAz,
    value: "make",
  },
  {
    label: "end date",
    icon: Clock11,
    value: "endingSoon",
  },
  {
    label: "recently added",
    icon: Clock1,
    value: "new",
  },
];

const filterButtons: {
  label: "live auctions" | "end in 6 hours" | "completed";
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
  value: State["filterBy"];
}[] = [
  {
    label: "live auctions",
    icon: Radio,
    value: "live",
  },
  {
    label: "end in 6 hours",
    icon: Hourglass,
    value: "endingSoon",
  },
  {
    label: "completed",
    icon: CalendarCheck,
    value: "finished",
  },
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className="flex items-center justify-end mb-4">
      <div className="flex">
        <div className="flex items-center justify-center mr-4">
          <TooltipProvider key="page-size">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    if (!value.length) {
                      setParams({ pageSize: 12 });
                    } else setParams({ pageSize: Number(value) as 4 | 8 | 12 });
                  }}>
                  {pageSizeButtons.map((value) => (
                    <ToggleGroupItem
                      className="h-9 w-9"
                      value={value.toString()}
                      key={value}>
                      {value}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </TooltipTrigger>
              <TooltipContent>Car number per page</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-center mr-4">
          <TooltipProvider key="filter">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="sm"
                  value={filterBy}
                  onValueChange={(value) => {
                    console.log(value);

                    if (!value.length) {
                      setParams({ filterBy: "live" });
                    } else setParams({ filterBy: value as State["filterBy"] });
                  }}>
                  {filterButtons.map(({ icon: Icon, value }) => (
                    <ToggleGroupItem value={value} key={value}>
                      <Icon className="w-4 h-4" />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter Cars</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-center">
          <TooltipProvider key="order">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  size="sm"
                  value={orderBy}
                  onValueChange={(value) => {
                    console.log(value);

                    if (!value.length) {
                      setParams({ orderBy: "make" });
                    } else setParams({ orderBy: value as State["orderBy"] });
                  }}>
                  {orderButtons.map(({ icon: Icon, value }) => (
                    <ToggleGroupItem value={value} key={value}>
                      <Icon className="w-4 h-4" />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sort Cars</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
