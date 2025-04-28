/**
 * Updates an existing widget by its ID.
 *
 * This function handles a PUT or PATCH request to update a specific widget in the database.
 * It first checks if the widget exists using the provided ID in the request parameters.
 * If the widget is not found, it responds with a 404 status and an error message.
 * If the request body fails validation, it responds with a 400 status and the validation error.
 * Otherwise, it updates the widget with the provided data, ensuring only valid fields are updated,
 * and returns the updated widget in the response.
 *
 * @param {Context} ctx - The Koa context object, which contains the request and response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { updateWidgetSchema, Widget, widgetSchema } from '../../schemas/widget.schema';

export async function updateWidget(ctx: Context): Promise<void> {
  // Extract the ID parameter from the request
  const id = ctx.params.id;

  // Find the existing widget in the database by its ID
  const existingWidget = widgetsCollection.findOne({ id }) as Widget | null;

  // If the widget is not found, respond with a 404 error
  if (!existingWidget) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Widget not found',
    };
    return;
  }

  // Validate the request body against the update schema
  const validationResult = updateWidgetSchema.safeParse(ctx.request.body);

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
  const { description, image, name } = validationResult.data;

  // Update the widget with the new data, preserving existing values for undefined fields
  Object.assign(existingWidget, {
    name: name ?? existingWidget.name,
    description: description ?? existingWidget.description,
    image: image ?? existingWidget.image,
    updatedAt: new Date(),
  });

  // Update the database with the modified widget
  const updatedWidget = widgetsCollection.update(existingWidget);

  // Respond with the sanitized updated widget data
  ctx.body = {
    status: 'success',
    data: widgetSchema.parse(updatedWidget), // Remove extra db fields,
  };
}
