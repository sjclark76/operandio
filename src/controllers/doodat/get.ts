// Get a single doodat by ID
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { doodatSchema } from '../../schemas/doodat.schema';

export async function getDoodat(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  const doodat = doodatsCollection.findOne({ id });

  if (!doodat) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Doodat not found',
    };
    return;
  }

  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(doodat), // Remove extra db fields,
  };
}
