import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const ClothesListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages; // ⭐ IMPORTANT — ADD RETURN
  };

  const pagesToShow = generatePages();

  return (
    <Pagination>
      <PaginationContent>
        {/* Trang trước */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : handlePrev}
            className={cn(
              "cursor-pointer",
              page === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

        {pagesToShow.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === page}
                onClick={() => {
                  if (p !== page) handlePageChange(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Trang sau */}
        <PaginationItem>
          <PaginationNext
            onClick={page === totalPages ? undefined : handleNext}
            className={cn(
              "cursor-pointer",
              page === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ClothesListPagination;
