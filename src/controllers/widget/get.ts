// Get a single widget by ID
import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';
import { validate as isValidUuid } from 'uuid';

export async function getWidget(ctx: Context): Promise<void> {
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
    data: widget,
  };
}
