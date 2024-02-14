import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductsController } from './controllers/products/CreateProductsController';

import { ListByCategoryController } from './controllers/products/listByCategoryController';
import { isAuthenticated } from './middlewares/isAuthenticated';


import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersService';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))
//-- Rotas User --
router.post('/users', new CreateUserController().handle)

//Rota de Login
router.post('/session', new AuthUserController().handle)

//Nesta rota se faz necessario a inclusão de um middlewares, que receba o token e valide ele.
router.get('/me', isAuthenticated, new DetailUserController().handle)
//O middleware é chamado antes da chamada da rota


//Rotas Category

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/categoryList', isAuthenticated, new ListCategoryController().handle)


//Rotas Products
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductsController().handle)

router.get('/category/products', isAuthenticated, new ListByCategoryController().handle)


//Rotas de Order

router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
export { router }