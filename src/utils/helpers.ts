export function getSearchParams() {
  return new URLSearchParams(window.location.search);
}

export function hasPrevPage(offset: number) {
  return offset > 0 && !isNaN(offset);
}

export function hasNextPage(offset: number, limit: number, totalItems: number) {
  return offset < totalItems - limit;
}

export function getPrevUrl(offset: number, limit: number) {
  if (!hasPrevPage(offset)) return undefined;

  const searchParams = getSearchParams();
  searchParams.set("offset", (offset - limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

export function getNextUrl(offset: number, limit: number, totalItems: number) {
  if (!hasNextPage(offset, limit, totalItems)) return undefined;

  const searchParams = getSearchParams();
  searchParams.set("offset", (offset + limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

export function getPageCount(totalItems: number, limit: number) {
  return Math.ceil(totalItems / limit);
}

export function getPageNumbers(totalItems: number, limit: number) {
  const pageCount = getPageCount(totalItems, limit);
  return Array.from({ length: pageCount }, (_, i) => i);
}

export function getUrlForPage(page: number, limit: number) {
  const searchParams = getSearchParams();
  searchParams.set("offset", (page * limit).toString());
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}

export function isCurrentPage(page: number, offset: number, limit: number) {
  return page === Math.ceil(offset / limit);
}

export function resetPagination(limit: number) {
  const searchParams = getSearchParams();
  searchParams.set("offset", "0");
  searchParams.set("limit", limit.toString());
  return `?${searchParams.toString()}`;
}
