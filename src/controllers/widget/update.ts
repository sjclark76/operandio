
// Update an existing widget
import {Context} from "koa";
import {Widget} from "../../models/widget";
import {widgetsCollection} from "../../db/database";

export async function updateWidget(ctx: Context): Promise<void> {
    const id = ctx.params.id;
    const existingWidget = widgetsCollection.findOne({ id }) as Widget | null;

    if (!existingWidget) {
        ctx.status = 404;
        ctx.body = {
            status: 'error',
            message: 'Widget not found'
        };
        return;
    }

    const body = ctx.request.body as Partial<Widget>;

    // Update the widget
    Object.assign(existingWidget, {
        name: body.name ?? existingWidget.name,
        description: body.description ?? existingWidget.description,
        updatedAt: new Date()
    });

    // Update the database
    widgetsCollection.update(existingWidget);

    ctx.body = {
        status: 'success',
        data: existingWidget
    };
}