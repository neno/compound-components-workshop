import useQueryParam from "@/hooks/use-search-params";

function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

const DEFAULT_LIMIT = 10;

function hasPrevPage(offset: number) {
  return offset > 0 && !isNaN(offset);
}

function hasNextPage(offset: number, limit: number, totalItems: number) {
  return offset < totalItems - limit;
}

function getPrevUrl(offset: number, limit: number) {
  if (!hasPrevPage(offset)) return undefined;

  const searchParams = getSearchParams();
  searchParams.set("offset", (offset - limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function getNextUrl(offset: number, limit: number, totalItems: number) {
  if (!hasNextPage(offset, limit, totalItems)) return undefined;

  const searchParams = getSearchParams();
  searchParams.set("offset", (offset + limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function getPageCount(totalItems: number, limit: number) {
  return Math.ceil(totalItems / limit);
}

function getPageNumbers(totalItems: number, limit: number) {
  const pageCount = getPageCount(totalItems, limit);
  return Array.from({ length: pageCount }, (_, i) => i);
}

function getUrlForPage(page: number, limit: number) {
  const searchParams = getSearchParams();
  searchParams.set("offset", (page * limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function isCurrentPage(page: number, offset: number, limit: number) {
  return page === Math.floor(offset / limit);
}

export function Pagination({ totalItems }: { totalItems: number }) {
  const [offset] = useQueryParam("offset");
  const [limit] = useQueryParam("limit");

  const limitNumber = Number(limit ?? DEFAULT_LIMIT);
  const offsetNumber = Number(offset ?? 0);

  const prevUrl = getPrevUrl(offsetNumber, limitNumber);
  const nextUrl = getNextUrl(offsetNumber, limitNumber, totalItems);

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
