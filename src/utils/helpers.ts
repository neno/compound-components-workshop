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

export function hasPrevPage(offset: number): boolean {
  return offset > 0 && !isNaN(offset);
}

export function hasNextPage(
  offset: number,
  limit: number,
  totalItems: number
): boolean {
  return offset < totalItems - limit;
}

export function getPrevUrl(offset: number, limit: number): string | undefined {
  if (!hasPrevPage(offset)) return undefined;

  return setSearchParams({
    offset: (offset - limit).toString(),
    limit: limit.toString(),
  });
}

export function getNextUrl(
  offset: number,
  limit: number,
  totalItems: number
): string | undefined {
  if (!hasNextPage(offset, limit, totalItems)) return undefined;

  return setSearchParams({
    offset: (offset + limit).toString(),
    limit: limit.toString(),
  });
}

export function getPageCount(totalItems: number, limit: number): number {
  return Math.ceil(totalItems / limit);
}

export function getPageNumbers(totalItems: number, limit: number): number[] {
  const pageCount = getPageCount(totalItems, limit);
  return Array.from({ length: pageCount }, (_, i) => i);
}

export function getUrlForPage(page: number, limit: number): string {
  return setSearchParams({
    offset: (page * limit).toString(),
    limit: limit.toString(),
  });
}

export function isCurrentPage(
  page: number,
  offset: number,
  limit: number
): boolean {
  return page === Math.ceil(offset / limit);
}

export function resetPagination(limit: number): string {
  return setSearchParams({ offset: "0", limit: limit.toString() });
}
