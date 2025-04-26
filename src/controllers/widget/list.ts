import { Context } from 'koa';
import { widgetsCollection } from '../../db/database';

export async function listWidgets(ctx: Context): Promise<void> {
  ctx.body = {
    status: 'success',
    data: Array.from(widgetsCollection.find()),
  };
}
