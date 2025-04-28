// Get a single widget by ID
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetSchema } from '../../schemas/widget.schema';

export async function getWidget(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  const widget = widgetsCollection.findOne({ id });

  if (!widget) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Widget not found',
    };
    return;
  }

  ctx.body = {
    status: 'success',
    data: widgetSchema.parse(widget), // Remove extra db fields,
  };
}
