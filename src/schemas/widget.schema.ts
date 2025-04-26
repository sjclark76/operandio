import { z } from 'zod';
import { validate as isValidUuid } from 'uuid';

// Custom UUID validator
const uuidSchema = z.string().refine((val) => isValidUuid(val), {
  message: 'Invalid UUID format',
});

// Schema for widget creation
export const createWidgetSchema = z.object({
  id: uuidSchema,
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'image url is required').url(),
});

// Schema for widget updates
export const updateWidgetSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().min(1, 'image url is required').url(),
});

// Schema for widget responses (what we return to the API)
export const widgetSchema = z.object({
  id: uuidSchema,
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for a list of widgets
export const widgetListResponseSchema = z.array(widgetSchema);

// Types derived from schemas
export type Widget = z.infer<typeof widgetSchema>;
