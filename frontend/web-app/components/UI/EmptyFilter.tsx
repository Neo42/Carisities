import { useParamsStore } from "@/hooks/useParamsStore";
import Heading from "./Heading";
import { Button } from "./Button";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try removing the filter",
  showReset
}: Props) {
  const reset = useParamsStore(state => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset
          ? <Button
            variant="outline"
            onClick={reset}
            className="text-primary"
          >
            Remove Filters
          </Button>
          : null}
      </div>
    </div>
  );
}