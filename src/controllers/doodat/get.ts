/**
 * Retrieves a single doodat by its ID.
 *
 * This function handles a GET request to fetch a specific doodat from the database
 * using the provided ID in the request parameters. If the doodat is not found,
 * it responds with a 404 status and an error message. If found, it validates and
 * sanitizes the doodat data using the `doodatSchema` before returning it in the response.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { doodatSchema } from '../../schemas/doodat.schema';

export async function getDoodat(ctx: Context): Promise<void> {
  // Extract the ID parameter from the request
  const id = ctx.params.id;

  // Find the doodat in the database by its ID
  const doodat = doodatsCollection.findOne({ id });

  // If the doodat is not found, respond with a 404 error
  if (!doodat) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Doodat not found',
    };
    return;
  }

  // Respond with the sanitized doodat data
  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(doodat), // Remove extra db fields
  };
}
