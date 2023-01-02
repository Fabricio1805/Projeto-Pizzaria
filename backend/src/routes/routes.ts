import { Router } from 'express';
import multer from 'multer';
import CreateProductController from '../controllers/product/CreateProductController';
import { CreateCategoryController } from '../controllers/category/CreateCategoryController';
import ListCategoryController from '../controllers/category/ListCategoryController';
import { AuthUserController } from '../controllers/user/AuthUserController';
import { CreateUserController } from '../controllers/user/CreateUserController';

import uploadConfig from '../config/multer';
import Authenticate from '../shared/middlewares/Authenticated';
import ListProductController from '../controllers/product/ListProductController';
import ListByCategoryController from '../controllers/product/ListByCategoryController';
import CreateOrderController from '../controllers/order/CreateOrderController';
import ListOrderController from '../controllers/order/ListOrderController';
import CancelOrderController from '../controllers/order/CancelOrderController';
import AddItemController from '../controllers/order/AddItemController';
import CancelItemController from '../controllers/order/CancelItemController';
import SendOrderController from '../controllers/order/SendOrderController';
import DetailOrderController from '../controllers/order/DetailOrderController';
import FinishOrderController from '../controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload('./uploads'));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);


router.use(Authenticate);


router.post('/category', new CreateCategoryController().handle);

router.get('/categories', new ListCategoryController().handle);

router.post('/product', upload.single('file'), new CreateProductController().handle);

router.get('/products', new ListProductController().handle);

router.get('/category/product', new ListByCategoryController().handle);

router.post('/order', new CreateOrderController().handle);

router.get('/orders', new ListOrderController().handle);

router.delete('/order/:id', new CancelOrderController().handle);

router.post('/item', new AddItemController().handle);

router.delete('/item/:id', new CancelItemController().handle);

router.patch('/order/send', new SendOrderController().handle);

router.get('/order/detail', new DetailOrderController().handle);

router.patch('/order/finish', new FinishOrderController().execute);


export { router };
