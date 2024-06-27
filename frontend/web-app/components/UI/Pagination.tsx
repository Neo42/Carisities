import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/UI/Button";

type Props = {
  currentPage: number;
  pageCount: number;
  pageRange?: number;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ currentPage, pageCount, onPageChange, pageRange = 2 }: Props) {
  return (
    <Pagination className="text-primary">
      <PaginationContent>
        {currentPage != 1
          ? <PaginationItem key="prev">
            <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
          : null}
        {currentPage - pageRange > 1
          ? <PaginationItem key="prev-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
          : null}
        {Array.from({ length: pageCount }, (_, i) => i + 1)
          .map(
            (pageNumber) => {
              const shouldShowPage = pageNumber >= Math.max(0, currentPage - pageRange) && pageNumber <= currentPage + pageRange;
              return shouldShowPage
                ? <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={() => onPageChange(pageNumber)}
                    isActive={currentPage == pageNumber}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
                : null;
            }
          )}
        {currentPage + pageRange < pageCount
          ? <PaginationItem key="next-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
          : null}
        {currentPage != pageCount
          ? <PaginationItem onClick={() => onPageChange(currentPage + 1)} key="next">
            <PaginationNext href="#" />
          </PaginationItem>
          : null}
      </PaginationContent>
    </Pagination>
  );
}


const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
