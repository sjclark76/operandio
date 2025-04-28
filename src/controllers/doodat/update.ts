/**
 * Updates an existing doodat by its ID.
 *
 * This function handles a PUT or PATCH request to update a specific doodat in the database.
 * It first checks if the doodat exists using the provided ID in the request parameters.
 * If the doodat is not found, it responds with a 404 status and an error message.
 * If the request body fails validation, it responds with a 400 status and the validation error.
 * Otherwise, it updates the doodat with the provided data, ensuring only valid fields are updated,
 * and returns the updated doodat in the response.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { updateDoodatSchema, Doodat, doodatSchema } from '../../schemas/doodat.schema';

export async function updateDoodat(ctx: Context): Promise<void> {
  // Extract the ID parameter from the request
  const id = ctx.params.id;

  // Find the existing doodat in the database by its ID
  const existingDoodat = doodatsCollection.findOne({ id }) as Doodat | null;

  // If the doodat is not found, respond with a 404 error
  if (!existingDoodat) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Doodat not found',
    };
    return;
  }

  // Validate the request body against the update schema
  const validationResult = updateDoodatSchema.safeParse(ctx.request.body);

  // If validation fails, respond with a 400 error
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  // Destructure the validated data
  const { description, image, name, price } = validationResult.data;

  // Update the doodat with the new data, preserving existing values for undefined fields
  Object.assign(existingDoodat, {
    name: name ?? existingDoodat.name,
    description: description ?? existingDoodat.description,
    image: image ?? existingDoodat.image,
    price: price ?? existingDoodat.price,
    updatedAt: new Date(),
  });

  // Update the database with the modified doodat
  const updatedWidget = doodatsCollection.update(existingDoodat);

  // Respond with the sanitized updated doodat data
  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(updatedWidget), // Remove extra db fields
  };
}
