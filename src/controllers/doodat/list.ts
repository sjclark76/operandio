/**
 * Lists all doodats with pagination.
 *
 * This function handles a GET request to retrieve a paginated list of doodats
 * from the database. It validates the pagination parameters provided in the query,
 * applies pagination to the doodats collection, and returns the paginated result.
 * If the query parameters are invalid, it responds with a 400 status and an error message.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { doodatListResponseSchema } from '../../schemas/doodat.schema';
import { paginate, validatePaginationParams } from '../pagination';

export async function listDoodats(ctx: Context): Promise<void> {
  // Validate query parameters for pagination
  const validationResult = validatePaginationParams(ctx.query.page, ctx.query.size);

  // If validation fails, respond with a 400 error
  if ('error' in validationResult) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  // Apply pagination to the doodats collection
  const paginatedWidgets = paginate(doodatsCollection, validationResult);

  // Respond with the paginated and sanitized doodats data
  ctx.body = {
    status: 'success',
    data: doodatListResponseSchema.parse(paginatedWidgets),
  };
}
