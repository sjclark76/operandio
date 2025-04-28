// Update an existing widget
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { updateWidgetSchema, Widget, widgetSchema } from '../../schemas/widget.schema';

export async function updateWidget(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  const existingWidget = widgetsCollection.findOne({ id }) as Widget | null;

  if (!existingWidget) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Widget not found',
    };
    return;
  }

  const validationResult = updateWidgetSchema.safeParse(ctx.request.body);

  if (!validationResult.success) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  const { description, image, name } = validationResult.data;

  // Update the widget
  Object.assign(existingWidget, {
    name: name ?? existingWidget.name,
    description: description ?? existingWidget.description,
    image: image ?? existingWidget.image,
    updatedAt: new Date(),
  });

  // Update the database
  const updatedWidget = widgetsCollection.update(existingWidget);

  ctx.body = {
    status: 'success',
    data: widgetSchema.parse(updatedWidget), // Remove extra db fields,
  };
}
