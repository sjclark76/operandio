/**
 * Retrieves a single widget by its ID.
 *
 * This function handles a GET request to fetch a specific widget from the database
 * using the provided ID in the request parameters. If the widget is not found,
 * it responds with a 404 status and an error message. If found, it validates and
 * sanitizes the widget data using the `widgetSchema` before returning it in the response.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetSchema } from '../../schemas/widget.schema';

export async function getWidget(ctx: Context): Promise<void> {
  // Extract the ID parameter from the request
  const id = ctx.params.id;

  // Find the widget in the database by its ID
  const widget = widgetsCollection.findOne({ id });

  // If the widget is not found, respond with a 404 error
  if (!widget) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Widget not found',
    };
    return;
  }

  // Respond with the sanitized widget data
  ctx.body = {
    status: 'success',
    data: widgetSchema.parse(widget), // Remove extra db fields
  };
}
