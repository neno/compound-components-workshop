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

function getNextUrl(offset: number, limit: number, totalItems: number) {
  if (offset >= totalItems || isNaN(offset)) return undefined;
  const searchParams = getSearchParams();
  searchParams.set("offset", (offset + limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function getPaginationUrl(offset: number, limit: number) {
  const searchParams = getSearchParams();
  searchParams.set("offset", offset.toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

function getPages(totalItems: number, limit: number) {
  return Math.ceil(totalItems / limit);
}

export function Pagination({ totalItems }: { totalItems: number }) {
  const [offset] = useQueryParam("offset");
  const [limit] = useQueryParam("limit");

  const offsetNumber = Number(offset);
  const limitNumber = Number(limit ?? DEFAULT_LIMIT);

  const prevUrl = getPrevUrl(offsetNumber, limitNumber);
  const nextUrl = getNextUrl(offsetNumber, limitNumber, totalItems);

  return (
    <div className="flex items-center gap-2">
      <a href={prevUrl} className={prevUrl ? "" : "opacity-50 pointer-events-none"}>
        Previous
      </a>
      {Array.from({ length: getPages(totalItems, Number(limit ?? DEFAULT_LIMIT)) }, (_, i) => (
        <a
          key={i}
          href={getPaginationUrl(i * Number(limit ?? DEFAULT_LIMIT), limitNumber)}
          className={i * Number(limit ?? DEFAULT_LIMIT) === Number(offset) ? "bg-blue-500 text-white" : ""}
        >
          {i + 1}
        </a>
      ))}
      <a href={nextUrl} className={nextUrl ? "" : "opacity-50 pointer-events-none"}>
        Next
      </a>
    </div>
  );
}
