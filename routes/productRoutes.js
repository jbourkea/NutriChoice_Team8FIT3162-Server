import express from 'express'
import { getSingleProduct, createProduct, deleteProduct, updateProduct, getAlternatives } from "../controllers/productController.js";

// Define the Router object
const productRouter = express.Router();

// Create routes and attach methods and controller actions
productRouter.route('/').post(createProduct);
productRouter.route('/:barcode').get(getSingleProduct).delete(deleteProduct).patch(updateProduct);
productRouter.route('/:barcode/alt').post(getAlternatives);

export default productRouter;