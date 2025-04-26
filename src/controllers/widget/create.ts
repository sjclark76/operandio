// Create a new widget
import {Widget} from "../../models/widget";
import {Context} from "koa";
import {widgetsCollection} from "../../db/database";

/**
 * Creates a new widget and adds it to the `widgets` collection in the database.
 *
 * @param {Context} ctx - The Koa context object, which contains the HTTP request and response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * The function performs the following steps:
 * 1. Validates the request body to ensure all required fields (`id`, `name`, `description`, and `image`) are present.
 * 2. Checks if a widget with the same `id` already exists in the database. If it does, returns a 409 Conflict response.
 * 3. Creates a new widget object with the provided data and timestamps for `createdAt` and `updatedAt`.
 * 4. Inserts the new widget into the `widgets` collection.
 * 5. Responds with a 201 Created status and the newly created widget data.
 */
export async function createWidget(ctx: Context): Promise<void> {
    const body = ctx.request.body as Partial<Widget>;

    if (!body.id || !body.name || !body.description || body.image === undefined) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: 'Missing required fields: id, name, description'
        };
        return;
    }

    if (widgetsCollection.findOne({ id: body.id })) {
        ctx.status = 409; // Conflict
        ctx.body = {
            status: 'error',
            message: 'Widget already exists with this ID. Operation would violate idempotency.'
        };
        return;
    }

    const now = new Date();
    const newWidget: Widget = {
        id:  body.id,
        name: body.name,
        description: body.description,
        image: body.image,
        createdAt: now,
        updatedAt: now
    };

    widgetsCollection.insert(newWidget);

    ctx.status = 201;
    ctx.body = {
        status: 'success',
        data: newWidget
    };
}


