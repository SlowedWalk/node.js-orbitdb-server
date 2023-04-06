import express from 'express';
const router = express.Router();
import { getAllProducts } from '../controllers/product.controller.js'

router.get('/products', getAllProducts);

// router.get('/products/:id', productCtrl.getProductById);

export default router;