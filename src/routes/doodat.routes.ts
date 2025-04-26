import Router from 'koa-router';
import { createDoodat, getDoodat, listDoodats, updateDoodat } from '../controllers/doodat';

const router = new Router({ prefix: '/api/doodats' });

router.get('/', listDoodats);
router.get('/:id', getDoodat);
router.post('/', createDoodat);
router.put('/:id', updateDoodat);

export default router;
