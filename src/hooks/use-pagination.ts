import { parseAsInteger, useQueryState } from "nuqs";
import { paginationSchema } from "@/schema/pagination.schema";

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
  const [rawOffset, setRawOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(0)
  );
  const [rawLimit, setRawLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(DEFAULT_LIMIT)
  );

  // Validate with Zod schema
  const validationResult = paginationSchema.safeParse({
    offset: rawOffset,
    limit: rawLimit,
  });

  // Use validated values or defaults
  const offset = validationResult.success ? validationResult.data.offset : 0;
  const limit = validationResult.success
    ? validationResult.data.limit
    : DEFAULT_LIMIT;

  // Wrapper functions to ensure validation on state changes
  const setOffset = (newOffset: number) => {
    const result = paginationSchema.safeParse({ offset: newOffset, limit });
    if (result.success) {
      setRawOffset(result.data.offset);
    }
  };

  const setLimit = (newLimit: number) => {
    const result = paginationSchema.safeParse({ offset, limit: newLimit });
    if (result.success) {
      setRawLimit(result.data.limit);
    }
  };

  const hasPrevPage = (): boolean => {
    return offset > 0;
  };

  const hasNextPage = (): boolean => {
    return offset + limit < total;
  };

  const getPrevUrl = (): string => {
    if (!hasPrevPage()) return "";

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

  const resetPagination = () => {
    setRawOffset(0);
    setRawLimit(DEFAULT_LIMIT);
  };

  return {
    hasPrevPage,
    hasNextPage,
    offset,
    limit,
    prevUrl: getPrevUrl(),
    nextUrl: getNextUrl(),
    pageNumbers: getPageNumbers(),
    urlForPage: getUrlForPage,
    isCurrentPage,
    setOffset,
    setLimit,
    resetPagination,
  };
}
