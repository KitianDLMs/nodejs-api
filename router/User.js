import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

// https://localhost:3000/api/users
router.post('/register', userController.register);
router.post('/register_admin', userController.register_admin);
router.put('/update', userController.update);
router.get('/list', auth.verifyAdmin, userController.list);
router.post('/login', userController.login);
router.post('/login_admin', userController.login_admin);
router.delete('/delete', userController.remove);

export default router;