import { z } from 'zod';
import { validate as isValidUuid } from 'uuid';

// Custom UUID validator
export const uuidSchema = z.string().refine((val) => isValidUuid(val), {
  message: 'Invalid UUID format',
});
