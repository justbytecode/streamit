"use client";
import { cn, generatePagination, updateURLParams } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  queryString?: string;
  filterString?: string;
};

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  queryString = "",
  filterString = "",
}: PaginationProps) => {
  const pages = generatePagination(currentPage, totalPages);
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    return updateURLParams(
      searchParams,
      {
        page: pageNumber.toString(),
        query: queryString?.trim() || null,
        filter: filterString || null,
      },
      "/"
    );
  };

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    router.push(createPageUrl(pageNumber));
  };

  return (
    <section className="flex items-center justify-between gap-6 border-t border-gray-100 py-6">
      {/* Previous Button */}
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-pink-500/30 hover:bg-pink-50 hover:text-pink-600 hover:shadow-md",
          {
            "pointer-events-none opacity-40": currentPage === 1,
          }
        )}
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="Previous"
          width={16}
          height={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span 
              key={`ellipsis-${index}`}
              className="px-2 text-sm font-semibold text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => navigateToPage(page as number)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all hover:bg-pink-50 hover:text-pink-600",
                {
                  "bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 hover:bg-pink-600 hover:text-white hover:shadow-xl hover:shadow-pink-500/40":
                    currentPage === page,
                  "text-gray-600": currentPage !== page,
                }
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-pink-500/30 hover:bg-pink-50 hover:text-pink-600 hover:shadow-md",
          {
            "pointer-events-none opacity-40": currentPage === totalPages,
          }
        )}
      >
        <span>Next</span>
        <Image
          src="/assets/icons/arrow-right.svg"
          alt="Next"
          width={16}
          height={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </section>
  );
};

export default Pagination;