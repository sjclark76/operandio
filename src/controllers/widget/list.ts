import {Context} from "koa";
import {widgets} from "../../db/database";

export async function listWidgets(ctx: Context): Promise<void> {
    ctx.body = {
        status: 'success',
        data: Array.from(widgets.find())
    };
}