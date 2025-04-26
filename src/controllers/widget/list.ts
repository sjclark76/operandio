import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetListResponseSchema } from '../../schemas/widget.schema';

export async function listWidgets(ctx: Context): Promise<void> {
  const allWidgets = widgetsCollection.find();

  ctx.body = {
    status: 'success',
    data: widgetListResponseSchema.parse(allWidgets),
  };
}
