import { z } from 'zod';
import { monetaryAmount, uuidSchema } from './shared.schema';

// Schema for doodat creation
export const createDoodatSchema = z.object({
  id: uuidSchema,
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'image url is required').url(),
  price: monetaryAmount,
});

// Schema for doodat updates
export const updateDoodatSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().min(1, 'image url is required').url().optional(),
  price: monetaryAmount.optional(),
});

// Schema for doodat responses (what we return to the API)
export const doodatSchema = z.object({
  id: uuidSchema,
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  price: monetaryAmount,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for a list of widgets
export const doodatListResponseSchema = z.array(doodatSchema);

// Types derived from schemas
export type Doodat = z.infer<typeof doodatSchema>;
