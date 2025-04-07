import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePagination } from "./use-pagination";

describe("usePagination", () => {
  it("should return the correct pagination data", () => {
    const pagination = usePagination(100, 10);
    expect(pagination.offset).toBe(0);
    expect(pagination.limit).toBe(10);
  });
});
