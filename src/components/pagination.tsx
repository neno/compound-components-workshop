import useQueryParam from "@/hooks/use-search-params";
import {
  getNextUrl,
  getPageNumbers,
  getPrevUrl,
  getUrlForPage,
  isCurrentPage,
  resetPagination,
} from "@/utils/helpers";
import { useEffect } from "react";

const DEFAULT_LIMIT = 10;

export function Pagination({ totalItems }: { totalItems: number }) {
  const [offset] = useQueryParam("offset");
  const [limit] = useQueryParam("limit");
  const [filter] = useQueryParam("filter");

  const limitNumber = Number(limit ?? DEFAULT_LIMIT);
  const offsetNumber = Number(offset ?? 0);

  const prevUrl = getPrevUrl(offsetNumber, limitNumber);
  const nextUrl = getNextUrl(offsetNumber, limitNumber, totalItems);

  useEffect(() => {
    if (filter) {
      resetPagination(limitNumber);
    }
  }, [filter, limitNumber]);

  return (
    <div className="flex items-center gap-2">
      <a
        href={prevUrl}
        className={
          prevUrl ? "" : "opacity-50 pointer-events-none px-2 py-1 rounded-md"
        }
      >
        Previous
      </a>
      {getPageNumbers(totalItems, limitNumber).map((page) => (
        <a
          key={page}
          href={getUrlForPage(page, limitNumber)}
          className={
            isCurrentPage(page, offsetNumber, limitNumber)
              ? "bg-blue-500 text-white pointer-events-none px-2 py-1 rounded-md"
              : "opacity-100 pointer-events-auto px-2 py-1 rounded-md"
          }
        >
          {page}
        </a>
      ))}
      <a
        href={nextUrl}
        className={
          nextUrl ? "" : "opacity-50 pointer-events-none px-2 py-1 rounded-md"
        }
      >
        Next
      </a>
    </div>
  );
}
