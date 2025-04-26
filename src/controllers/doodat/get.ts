// Get a single widget by ID
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { validate as isValidUuid } from 'uuid';
import { doodatSchema } from '../../schemas/doodat.schema';

export async function getDoodat(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  // Validate that the ID is a valid UUID
  if (!isValidUuid(id)) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid UUID format',
    };
    return;
  }
  const widget = doodatsCollection.findOne({ id });

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
    data: doodatSchema.parse(widget), // Remove extra db fields,
  };
}
