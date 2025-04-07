import { parseAsInteger, useQueryState } from "nuqs";

export function getSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function setSearchParams(params: Record<string, string>): string {
  const searchParams = getSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  return `?${searchParams.toString()}`;
}

export function usePagination(total: number, DEFAULT_LIMIT: number) {
  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0)
  );
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(DEFAULT_LIMIT)
  );

  const hasPrevPage = (offset: number): boolean => {
    return offset > 0;
  };

  const hasNextPage = (): boolean => {
    return offset + limit < total;
  };

  const getPrevUrl = (): string => {
    if (!hasPrevPage(offset)) return "";

    return setSearchParams({
      offset: (offset - limit).toString(),
      limit: limit.toString(),
    });
  };

  const getNextUrl = (): string => {
    if (!hasNextPage()) return "";

    return setSearchParams({
      offset: (offset + limit).toString(),
      limit: limit.toString(),
    });
  };

  const getPageNumbers = (): number[] => {
    return Array.from({ length: Math.ceil(total / limit) }, (_, i) => i);
  };

  const getUrlForPage = (page: number): string => {
    return setSearchParams({
      offset: (page * limit).toString(),
      limit: limit.toString(),
    });
  };

  const isCurrentPage = (page: number): boolean => {
    return page === Math.ceil(offset / limit);
  };

  return {
    offset,
    limit,
    prevUrl: getPrevUrl(),
    nextUrl: getNextUrl(),
    pageNumbers: getPageNumbers(),
    urlForPage: getUrlForPage,
    isCurrentPage,
    setOffset,
    setLimit,
  };
}
