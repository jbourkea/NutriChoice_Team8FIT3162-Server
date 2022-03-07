import Product from "../models/Product.js";

const createProduct = (req, res, next) => {res.send("Create Product")}

const deleteProduct = (req, res, next) => {res.send("Delete Product")}

const getSingleProduct = (req, res, next) => {res.send("Get Single Product")}

const updateProduct = (req, res, next) => {res.send("Update Product")}

export {createProduct, deleteProduct, getSingleProduct, updateProduct}

