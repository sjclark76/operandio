import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { doodatListResponseSchema } from '../../schemas/doodat.schema';
import { paginate, validatePaginationParams } from '../pagination';

export async function listDoodats(ctx: Context): Promise<void> {
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

  const paginatedWidgets = paginate(doodatsCollection, validationResult);

  ctx.body = {
    status: 'success',
    data: doodatListResponseSchema.parse(paginatedWidgets),
  };
}
