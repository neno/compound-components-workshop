import useQueryParam from "@/hooks/use-search-params";

function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

const DEFAULT_LIMIT = 10;

function getPrevUrl(offset: number, limit: number) {
  if (offset === 0 || isNaN(offset)) return undefined;
  const searchParams = getSearchParams();
  searchParams.set("offset", (offset - limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function getNextUrl(offset: number, limit = DEFAULT_LIMIT, totalItems: number) {
  if (offset >= totalItems || isNaN(offset)) return undefined;
  const searchParams = getSearchParams();
  searchParams.set("offset", (offset + limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

export function Pagination({ totalItems }: { totalItems: number }) {
  const [offset] = useQueryParam("offset");
  const [limit] = useQueryParam("limit");
  const prevUrl = getPrevUrl(Number(offset), Number(limit ?? DEFAULT_LIMIT));
  const nextUrl = getNextUrl(
    Number(offset),
    Number(limit ?? DEFAULT_LIMIT),
    totalItems
  );

  return (
    <div className="flex items-center gap-2">
      <a
        href={prevUrl}
        className={prevUrl ? "" : "opacity-50 pointer-events-none"}
      >
        Previous
      </a>
      <a
        href={nextUrl}
        className={nextUrl ? "" : "opacity-50 pointer-events-none"}
      >
        Next
      </a>
    </div>
  );
}
