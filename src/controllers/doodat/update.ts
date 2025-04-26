// Update an existing doodat
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { updateDoodatSchema, Doodat, doodatSchema } from '../../schemas/doodat.schema';
import { validate as isValidUuid } from 'uuid';

export async function updateDoodat(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  if (!isValidUuid(id)) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid UUID format',
    };
    return;
  }

  const existingWidget = doodatsCollection.findOne({ id }) as Doodat | null;

  if (!existingWidget) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Widget not found',
    };
    return;
  }

  const validationResult = updateDoodatSchema.safeParse(ctx.request.body);

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
  const updatedWidget = doodatsCollection.update(existingWidget);

  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(updatedWidget), // Remove extra db fields,
  };
}
