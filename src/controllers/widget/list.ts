/**
 * Lists all widgets with pagination.
 *
 * This function handles a GET request to retrieve a paginated list of widgets
 * from the database. It validates the pagination parameters provided in the query,
 * applies pagination to the widgets collection, and returns the paginated result.
 * If the query parameters are invalid, it responds with a 400 status and an error message.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetListResponseSchema } from '../../schemas/widget.schema';
import { paginate, validatePaginationParams } from '../pagination';

export async function listWidgets(ctx: Context): Promise<void> {
  // Validate query parameters
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

  // Apply pagination to the widgets collection
  const paginatedWidgets = paginate(widgetsCollection, validationResult);

  // Respond with the paginated and sanitized widgets data
  ctx.body = {
    status: 'success',
    data: widgetListResponseSchema.parse(paginatedWidgets),
  };
}
