import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { UseQueryStateReturn } from "nuqs";

// Mock nuqs module - this must be at the top level
vi.mock("nuqs", () => {
  const parseAsInteger = {
    withDefault: (defaultValue: number) => ({
      parse: (value: string | null) =>
        value ? parseInt(value, 10) : defaultValue,
      serialize: (value: number) => value.toString(),
    }),
  };

  return {
    parseAsInteger,
    useQueryState: vi
      .fn()
      .mockImplementation(
        (key: string, parser: { parse: (value: string | null) => number }) => {
          // Use the actual parser function to handle the values
          const defaultValue = key === "limit" ? 10 : 0;
          const value = parser.parse(null);
          return [value, vi.fn()] as UseQueryStateReturn<number, number>;
        }
      ),
  };
});

// Import the hook after mocking
import { usePagination } from "./use-pagination";
import { useQueryState } from "nuqs";

// Mock window.location
const mockLocation = new URL("http://localhost:3000");
vi.stubGlobal("window", {
  location: mockLocation,
});

describe("usePagination", () => {
  beforeEach(() => {
    // Reset URL before each test
    mockLocation.search = "";
    vi.clearAllMocks();

    // Reset the mock implementation to default
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      // Use the actual parser function to handle the values
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasPrevPage()).toBe(false);
    expect(result.current.hasNextPage()).toBe(true);
    expect(result.current.prevUrl).toBe("");
    expect(result.current.nextUrl).toBe("?offset=10&limit=10");
    expect(result.current.pageNumbers).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result.current.isCurrentPage(0)).toBe(true);
  });

  it("should handle pagination with custom offset and limit", () => {
    // Mock useQueryState to return custom values
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      if (key === "offset") {
        return [20, vi.fn()] as UseQueryStateReturn<number, number>;
      } else if (key === "limit") {
        return [10, vi.fn()] as UseQueryStateReturn<number, number>;
      }
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });

    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.offset).toBe(20);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasPrevPage()).toBe(true);
    expect(result.current.hasNextPage()).toBe(true);
    expect(result.current.prevUrl).toBe("?offset=10&limit=10");
    expect(result.current.nextUrl).toBe("?offset=30&limit=10");
    expect(result.current.isCurrentPage(2)).toBe(true);
  });

  it("should handle last page correctly", () => {
    // Mock useQueryState to return values for the last page
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      if (key === "offset") {
        return [90, vi.fn()] as UseQueryStateReturn<number, number>;
      } else if (key === "limit") {
        return [10, vi.fn()] as UseQueryStateReturn<number, number>;
      }
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });

    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.offset).toBe(90);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasPrevPage()).toBe(true);
    expect(result.current.hasNextPage()).toBe(false);
    expect(result.current.prevUrl).toBe("?offset=80&limit=10");
    expect(result.current.nextUrl).toBe("");
    expect(result.current.isCurrentPage(9)).toBe(true);
  });

  it("should handle first page correctly", () => {
    // Mock useQueryState to return values for the first page
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      if (key === "offset") {
        return [0, vi.fn()] as UseQueryStateReturn<number, number>;
      } else if (key === "limit") {
        return [10, vi.fn()] as UseQueryStateReturn<number, number>;
      }
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });

    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasPrevPage()).toBe(false);
    expect(result.current.hasNextPage()).toBe(true);
    expect(result.current.prevUrl).toBe("");
    expect(result.current.nextUrl).toBe("?offset=10&limit=10");
    expect(result.current.isCurrentPage(0)).toBe(true);
  });

  it("should handle custom limit", () => {
    // Mock useQueryState to return custom limit
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      if (key === "offset") {
        return [0, vi.fn()] as UseQueryStateReturn<number, number>;
      } else if (key === "limit") {
        return [20, vi.fn()] as UseQueryStateReturn<number, number>;
      }
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });

    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(20);
    expect(result.current.hasNextPage()).toBe(true);
    expect(result.current.nextUrl).toBe("?offset=20&limit=20");
    expect(result.current.pageNumbers).toEqual([0, 1, 2, 3, 4]);
  });

  it("should handle total items less than limit", () => {
    const { result } = renderHook(() => usePagination(5, 10));

    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasNextPage()).toBe(false);
    expect(result.current.nextUrl).toBe("");
    expect(result.current.pageNumbers).toEqual([0]);
  });

  it("should handle setOffset and setLimit functions", () => {
    const mockSetOffset = vi.fn();
    const mockSetLimit = vi.fn();

    // Mock useQueryState to return custom setter functions
    vi.mocked(useQueryState).mockImplementation((key: string, parser: any) => {
      if (key === "offset") {
        return [0, mockSetOffset] as UseQueryStateReturn<number, number>;
      } else if (key === "limit") {
        return [10, mockSetLimit] as UseQueryStateReturn<number, number>;
      }
      const defaultValue = key === "limit" ? 10 : 0;
      const value = parser.parse(null);
      return [value, vi.fn()] as UseQueryStateReturn<number, number>;
    });

    const { result } = renderHook(() => usePagination(100, 10));

    act(() => {
      result.current.setOffset(20);
    });

    expect(mockSetOffset).toHaveBeenCalledWith(20);

    act(() => {
      result.current.setLimit(20);
    });

    expect(mockSetLimit).toHaveBeenCalledWith(20);
  });

  it("should handle urlForPage function", () => {
    const { result } = renderHook(() => usePagination(100, 10));

    expect(result.current.urlForPage(2)).toBe("?offset=20&limit=10");
    expect(result.current.urlForPage(0)).toBe("?offset=0&limit=10");
    expect(result.current.urlForPage(9)).toBe("?offset=90&limit=10");
  });
});
