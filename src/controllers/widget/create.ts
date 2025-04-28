// Create a new widget
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { createWidgetSchema, Widget, widgetSchema } from '../../schemas/widget.schema';

/**
 * Creates a new widget and adds it to the `widgets` collection in the database.
 *
 * This function handles a POST request to create a new widget. It validates the request body,
 * checks for duplicate widget IDs, and inserts the new widget into the database if valid.
 * The response includes the newly created widget data.
 *
 * @param {Context} ctx - The Koa context object, which contains the HTTP request and response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * Steps:
 * 1. Validates the request body using `createWidgetSchema`.
 * 2. Checks if a widget with the same `id` already exists in the database.
 * 3. Creates a new widget object with the provided data and timestamps.
 * 4. Inserts the new widget into the `widgets` collection.
 * 5. Responds with a 201 Created status and the sanitized widget data.
 */
export async function createWidget(ctx: Context): Promise<void> {
  // Validate the request body against the schema
  const validationResult = createWidgetSchema.safeParse(ctx.request.body);

  // If validation fails, respond with a 400 Bad Request error
  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  // Destructure validated data from the request body
  const { description, id, image, name } = validationResult.data;

  // Check if a widget with the same ID already exists
  if (widgetsCollection.findOne({ id: id })) {
    ctx.status = 409; // Conflict
    ctx.body = {
      status: 'error',
      message: 'Widget already exists with this ID. Operation would violate idempotency.',
    };
    return;
  }

  // Create a new widget object with timestamps
  const now = new Date();
  const newWidget: Widget = {
    id,
    name,
    description,
    image,
    createdAt: now,
    updatedAt: now,
  };

  // Insert the new widget into the database
  const insertedWidget = widgetsCollection.insert(newWidget);

  // Respond with a 201 Created status and the sanitized widget data
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    data: widgetSchema.parse(insertedWidget), // Remove extra db fields
  };
}
