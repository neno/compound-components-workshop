import { usePagination } from "@/hooks/use-pagination";

const DEFAULT_LIMIT = 10;

export function TypesafePagination() {
  const {
    prevUrl,
    nextUrl,
    pageNumbers,
    urlForPage,
    isCurrentPage,
    setOffset,
    offset,
    limit,
  } = usePagination(100, DEFAULT_LIMIT);

  return (
    <div className="grid gap-8">
      <h2>Pagigation 3 (with query params)</h2>
      <div className="flex items-center gap-2">
        <a
          onClick={() => setOffset(offset - limit)}
          href={prevUrl ?? ""}
          className={
            prevUrl ? "" : "opacity-50 pointer-events-none px-2 py-1 rounded-md"
          }
        >
          Previous
        </a>
        {pageNumbers.map((page) => (
          <a
            key={page}
            href={urlForPage(page)}
            onClick={() => setOffset(page * limit)}
            className={
              isCurrentPage(page)
                ? "bg-blue-500 text-white pointer-events-none px-2 py-1 rounded-md"
                : "opacity-100 pointer-events-auto px-2 py-1 rounded-md"
            }
          >
            {page + 1}
          </a>
        ))}

        <a
          href={nextUrl ?? ""}
          onClick={() => setOffset(offset + limit)}
          className={
            nextUrl ? "" : "opacity-50 pointer-events-none px-2 py-1 rounded-md"
          }
        >
          Next
        </a>
      </div>

      <pre>{JSON.stringify({ offset, limit, prevUrl, nextUrl }, null, 2)}</pre>
    </div>
  );
}
