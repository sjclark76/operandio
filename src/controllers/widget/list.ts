import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { widgetListResponseSchema } from '../../schemas/widget.schema';
import { paginate, validatePaginationParams } from '../pagination';

export async function listWidgets(ctx: Context): Promise<void> {
  const validationResult = validatePaginationParams(ctx.query.page, ctx.query.size);

  // Validate query parameters
  if ('error' in validationResult) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: validationResult.error,
    };
    return;
  }

  const paginatedWidgets = paginate(widgetsCollection, validationResult);

  ctx.body = {
    status: 'success',
    data: widgetListResponseSchema.parse(paginatedWidgets),
  };
}
