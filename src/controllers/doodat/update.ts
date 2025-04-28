// Update an existing doodat
import { Context } from 'koa';
import { doodatsCollection } from '../../db/database';
import { updateDoodatSchema, Doodat, doodatSchema } from '../../schemas/doodat.schema';

export async function updateDoodat(ctx: Context): Promise<void> {
  const id = ctx.params.id;

  const existingDoodat = doodatsCollection.findOne({ id }) as Doodat | null;

  if (!existingDoodat) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Doodat not found',
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

  const { description, image, name, price } = validationResult.data;

  // Update the widget
  Object.assign(existingDoodat, {
    name: name ?? existingDoodat.name,
    description: description ?? existingDoodat.description,
    image: image ?? existingDoodat.image,
    price: price ?? existingDoodat.price,
    updatedAt: new Date(),
  });

  // Update the database
  const updatedWidget = doodatsCollection.update(existingDoodat);

  ctx.body = {
    status: 'success',
    data: doodatSchema.parse(updatedWidget), // Remove extra db fields,
  };
}
