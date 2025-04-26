import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import widgetRoutes from './routes/widget.routes';

// Type guard to check if error is an object with a status property
function isHttpError(err: unknown): err is { status: number; message: string } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    typeof (err as { status: unknown }).status === 'number' &&
    'message' in err &&
    typeof (err as { message: unknown }).message === 'string'
  );
}

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
    // eslint-disable-next-line no-console
    console.error(err);
    if (isHttpError(err)) {
      ctx.status = err.status;
      ctx.body = {
        status: 'error',
        message: err.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        status: 'error',
        message: 'Internal Server Error',
      };
    }
  }
});

// Routes
app.use(widgetRoutes.routes());
app.use(widgetRoutes.allowedMethods());

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
