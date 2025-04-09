import { z } from "zod";
import { DEFAULT_LIMIT } from "@/constants";
import { DEFAULT_OFFSET } from "@/constants";

const MAX_LIMIT = 1000;

export const paginationSchema = z.object({
  offset: z.number().int().nonnegative().catch(DEFAULT_OFFSET),
  limit: z
    .number()
    .int()
    .positive()
    .refine((val) => val !== 0, {
      message: "Limit cannot be zero",
    })
    .refine((val) => val <= MAX_LIMIT, {
      message: `Limit cannot be greater than ${MAX_LIMIT}`,
    })
    .catch(DEFAULT_LIMIT),
});

export type PaginationType = z.infer<typeof paginationSchema>;
