import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { createDoodatSchema, Doodat, doodatSchema } from '../../schemas/doodat.schema';

/**
 * Creates a new doodat and adds it to the `doodat` collection in the database.
 *
 * @param {Context} ctx - The Koa context object, which contains the HTTP request and response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * The function performs the following steps:
 * 1. Validates the request body to ensure all required fields (`id`, `name`, `description`, and `image`) are present.
 * 2. Checks if a doodat with the same `id` already exists in the database. If it does, returns a 409 Conflict response.
 * 3. Creates a new doodat object with the provided data and timestamps for `createdAt` and `updatedAt`.
 * 4. Inserts the new doodat into the `doodats` collection.
 * 5. Responds with a 201 Created status and the newly created doodat data.
 */
export async function createDoodat(ctx: Context): Promise<void> {
  const validationResult = createDoodatSchema.safeParse(ctx.request.body);

  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  const { description, id, image, name, price } = validationResult.data;

  if (doodatsCollection.findOne({ id: id })) {
    ctx.status = 409; // Conflict
    ctx.body = {
      status: 'error',
      message: 'Doodat already exists with this ID. Operation would violate idempotency.',
    };
    return;
  }

  const now = new Date();
  const newDoodat: Doodat = {
    id,
    name,
    description,
    image,
    price,
    createdAt: now,
    updatedAt: now,
  };

  const insertedWidget = doodatsCollection.insert(newDoodat);

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(insertedWidget), // Remove extra db fields
  };
}
