import bodyParser from "koa-bodyparser";
import Koa from 'koa';
import logger from 'koa-logger';
import widgetRoutes from './routes/widget.routes';

const app = new Koa();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser());
app.use(logger());

// Error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            ctx.status = (err as any).status || 500;
            ctx.body = {
                status: 'error',
                message: err.message || 'Internal Server Error'
            };
        } else {
            ctx.status = 500;
            ctx.body = {
                status: 'error',
                message: 'Internal Server Error'
            };
        }
    }
});

// Routes
app.use(widgetRoutes.routes());
app.use(widgetRoutes.allowedMethods());

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

