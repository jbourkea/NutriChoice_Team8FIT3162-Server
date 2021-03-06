import express from 'express'
import { getSingleProduct, createProduct, deleteProduct, updateProduct, getAlternatives, getProductsByCategory, searchProductsByQuery, getProductsByCategorySimple, searchProductsByQuerySimple } from "../controllers/productController.js";

// Define the Router object
const productRouter = express.Router();

// Create routes and attach methods and controller actions
productRouter.route('/').post(createProduct);
productRouter.route('/search/:query').get(searchProductsByQuery);
productRouter.route('/simplesearch/:query').get(searchProductsByQuerySimple);
productRouter.route('/category/:category').get(getProductsByCategory);
productRouter.route('/simplecategory/:category').get(getProductsByCategorySimple);
productRouter.route('/:barcode').get(getSingleProduct).delete(deleteProduct).patch(updateProduct);
productRouter.route('/:barcode/alt').post(getAlternatives);

export default productRouter;