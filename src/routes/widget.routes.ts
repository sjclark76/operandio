import Router from 'koa-router';
import { createWidget, getWidget, listWidgets, updateWidget } from '../controllers/widget';

const router = new Router({ prefix: '/api/widgets' });

router.get('/', listWidgets);
router.get('/:id', getWidget);
router.post('/', createWidget);
router.put('/:id', updateWidget);

export default router;
