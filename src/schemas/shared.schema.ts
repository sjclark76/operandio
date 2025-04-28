import { z } from 'zod';
import { validate as isValidUuid } from 'uuid';

// Custom UUID validator
export const uuidSchema = z.string().refine((val) => isValidUuid(val), {
  message: 'Invalid UUID format',
});

export const monetaryAmount = z.object({
  value: z.number().gte(0, 'price must be a positive integer'),
  currency: z.string(),
});
