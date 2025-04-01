import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getSearchParams,
  hasPrevPage,
  hasNextPage,
  getPrevUrl,
  getNextUrl,
  getPageCount,
  getPageNumbers,
  getUrlForPage,
  isCurrentPage,
  resetPagination,
} from "./helpers";

// Mock window.location
const mockLocation = new URL("http://localhost:3000");
vi.stubGlobal("window", {
  location: mockLocation,
});

describe("Pagination Helpers", () => {
  beforeEach(() => {
    // Reset URL before each test
    mockLocation.search = "";
  });

  describe("getSearchParams", () => {
    it("should return URLSearchParams object", () => {
      mockLocation.search = "?offset=10&limit=5";
      const params = getSearchParams();
      expect(params.get("offset")).toBe("10");
      expect(params.get("limit")).toBe("5");
    });
  });

  describe("hasPrevPage", () => {
    it("should return true when offset is greater than 0", () => {
      expect(hasPrevPage(10)).toBe(true);
      expect(hasPrevPage(1)).toBe(true);
    });

    it("should return false when offset is 0 or negative", () => {
      expect(hasPrevPage(0)).toBe(false);
      expect(hasPrevPage(-1)).toBe(false);
    });

    it("should return false when offset is NaN", () => {
      expect(hasPrevPage(NaN)).toBe(false);
    });
  });

  describe("hasNextPage", () => {
    it("should return true when there are more items", () => {
      expect(hasNextPage(0, 10, 25)).toBe(true);
      expect(hasNextPage(10, 10, 25)).toBe(true);
    });

    it("should return false when there are no more items", () => {
      expect(hasNextPage(20, 10, 25)).toBe(false);
      expect(hasNextPage(25, 10, 25)).toBe(false);
    });
  });

  describe("getPrevUrl", () => {
    it("should return correct previous page URL", () => {
      mockLocation.search = "?offset=20&limit=10";
      const url = getPrevUrl(20, 10);
      expect(url).toBe("?offset=10&limit=10");
    });

    it("should return undefined when on first page", () => {
      const url = getPrevUrl(0, 10);
      expect(url).toBeUndefined();
    });
  });

  describe("getNextUrl", () => {
    it("should return correct next page URL", () => {
      mockLocation.search = "?offset=0&limit=10";
      const url = getNextUrl(0, 10, 25);
      expect(url).toBe("?offset=10&limit=10");
    });

    it("should return undefined when on last page", () => {
      const url = getNextUrl(20, 10, 25);
      expect(url).toBeUndefined();
    });
  });

  describe("getPageCount", () => {
    it("should calculate correct number of pages", () => {
      expect(getPageCount(25, 10)).toBe(3);
      expect(getPageCount(20, 10)).toBe(2);
      expect(getPageCount(15, 10)).toBe(2);
    });
  });

  describe("getPageNumbers", () => {
    it("should return array of page numbers", () => {
      expect(getPageNumbers(25, 10)).toEqual([0, 1, 2]);
      expect(getPageNumbers(20, 10)).toEqual([0, 1]);
      expect(getPageNumbers(15, 10)).toEqual([0, 1]);
    });
  });

  describe("getUrlForPage", () => {
    it("should return correct URL for given page", () => {
      mockLocation.search = "?filter=test";
      const url = getUrlForPage(1, 10);
      expect(url).toBe("?filter=test&offset=10&limit=10");
    });
  });

  describe("isCurrentPage", () => {
    it("should correctly identify current page", () => {
      expect(isCurrentPage(0, 0, 10)).toBe(true);
      expect(isCurrentPage(1, 10, 10)).toBe(true);
      expect(isCurrentPage(0, 5, 10)).toBe(false);
      expect(isCurrentPage(1, 15, 10)).toBe(false);
    });
  });

  describe("resetPagination", () => {
    it("should reset offset to 0 while preserving other params", () => {
      mockLocation.search = "?offset=20&limit=10&filter=test";
      const url = resetPagination(10);
      expect(url).toBe("?offset=0&limit=10&filter=test");
    });
  });
});
