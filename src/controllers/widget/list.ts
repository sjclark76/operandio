import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetListResponseSchema } from '../../schemas/widget.schema';

export async function listWidgets(ctx: Context): Promise<void> {
  // Extract query parameters with default values
  const pageNumber = parseInt((ctx.query.page as string) || '1', 10);
  const pageSize = parseInt((ctx.query.size as string) || '10', 10);

  // Validate query parameters
  if (pageNumber < 1 || pageSize < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'page and size must be positive integers',
    };
    return;
  }

  // Calculate pagination offsets
  const offset = (pageNumber - 1) * pageSize;

  const paginatedWidgets = widgetsCollection
    .chain()
    .find()
    .simplesort('name')
    .data()
    .slice(offset, offset + pageSize);

  ctx.body = {
    status: 'success',
    data: widgetListResponseSchema.parse(paginatedWidgets),
  };
}
