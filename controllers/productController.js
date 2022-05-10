import Product from "../models/Product.js";
import {BadRequestError, ConflictError, NotFoundError} from '../errors/index.js'
import mongoose from "mongoose";

/*
createProduct
API Controller for creating a product
Input in body:
    {barcode, name, category, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium, ocr}

Returns the newly created object

*/
const createProduct = async (req, res) => {
    const {barcode, name, category, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium, image, ingredientimage, unit, ocr } = req.body;
    console.log(req.body);
    //Check if any required fields are missing from the body
    if (!barcode || !name || !category || energy < 0 || protein < 0 || carbohydrate < 0 || sugar < 0 || fat < 0 || saturatedfat < 0 || sodium < 0 ){
        throw new BadRequestError("Please ensure all fields are provided.")
    }
    // Check if the barcode already exists in the database 
    const existingProduct = await Product.findOne({product_barcode : barcode});
    if (existingProduct){
        if(!isItemExpired(existingProduct.product_datecreated)){
            throw new ConflictError("Product already exists");
        } else {
            await Product.deleteOne({product_barcode:existingProduct.product_barcode});
        }
    }

    // Create the product
    const newProduct = await Product.create({
        _id : new mongoose.Types.ObjectId(),
        product_barcode : barcode,
        product_name : name,
        product_category : category.toUpperCase(),
        energykj_100g : energy,
        protein_100g : protein,
        carbohydrates_100g : carbohydrate,
        sugars_100g : sugar,
        fat_100g : fat,
        saturatedfat_100g : saturatedfat,
        sodium_100g : sodium,
        product_img : image,
        product_ingredients_img : ingredientimage,
        product_unit : unit,
        product_ocr : ocr
    });

    return res.status(201).json({barcode, name, category:newProduct.product_category, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium, image:newProduct.product_img, ingredientimage:newProduct.product_ingredients_img,unit:newProduct.product_unit, ocr:newProduct.product_ocr });

}

/*
getSingleProduct
API Controller for deleting single product from database by barcode
Input :
    :barcode - Route parameter

Returns the deleted product

*/
const deleteProduct = async (req, res) => {
    // Delete object if found by barcode
    // TODO: Ensure only admin or user who created product can delete (Permissions)
    const target = req.params.barcode;
    const product = Product.findOneAndDelete({product_barcode : target}, (err, product) => {
        if(err){
            throw new ConflictError("This product could not be deleted")
        } else {
            return res.status(200).json(product);
        }
    })
}

/*
getSingleProduct
API Controller for retrieving single product from database by barcode
Input :
    :barcode - Route parameter

Returns the target product

*/
const getSingleProduct = async (req, res, next) => {
    const target = req.params.barcode;
    const product = await Product.findOne({product_barcode : String(target)}).exec();

    if(!product){
        throw new NotFoundError("This product does not exist");
    }
    return res.status(200).json(product);
}

const getProductsByCategory = async (req, res) => {
    // Get the target product to find alternatives for
    const products = await Product.find({product_category : {$regex : new RegExp(req.params.category, 'i')}}).limit(5);
    return res.status(200).json(products);
}

const getProductsByCategorySimple = async (req, res) => {
    // Get the target product to find alternatives for
    const products = await Product.find({product_category : {$regex : new RegExp(req.params.category, 'i')}})
        .select({product_name:1, product_barcode:1, _id:0})
        .limit(5);
    return res.status(200).json(products);
}

const searchProductsByQuery = async (req, res) => {
    let query = req.params.query || "";
    let products = await Product.find({product_name : {$regex : new RegExp(query, 'i')}})
        .limit(8);
    return res.status(200).json({results:products});
}

const searchProductsByQuerySimple = async (req, res) => {
    let query = req.params.query || "";
    let products = await Product.find({product_name : {$regex : new RegExp(query, 'i')}})
        .select({product_name:1, product_barcode:1, _id:0})
        .limit(8);
    return res.status(200).json({results:products});
}

// Pass in a barcode and query strings
const getAlternatives = async (req, res, next) => {
    if(!req.body.field || !req.body.sort){
        throw new BadRequestError("Field or Sort are missing from request");
    }
    // Get the target product to find alternatives for
    const product = await Product.findOne({product_barcode : String(req.params.barcode)});
    if(!product){
        throw new NotFoundError("This product does not exist");
    }
    // Target correct product field
    let field = 'product_name'
    let sortOrder = req.body.sort;
    if(req.body.field == "energy"){
        field = 'energykj_100g'
    }else if (req.body.field == 'protein'){
        field = 'protein_100g'
    }else if (req.body.field == 'carb'){
        field = 'carbohydrates_100g'
    }else if (req.body.field == 'sugar'){
        field = 'sugars_100g'
    }else if (req.body.field == 'fat'){
        field = 'fat_100g'
    }else if (req.body.field == 'satfat'){
        field = 'saturatedfat_100g'
    }else if (req.body.field == 'sodium'){
        field = 'sodium_100g'
    }

    let sortParam = {};
    sortParam[field] = sortOrder;

    const query = Product.find({product_barcode :{$ne : product.product_barcode}, product_category: {$regex : new RegExp(product.product_category, 'i')}})
                            .sort(sortParam)
                            .limit(3);
    
    query.exec((err, alts) => {
       if (err) throw err;
       return res.json({"alternatives" : alts});
   });
}

const isItemExpired = createdDate => {
    const now = new Date(Date.now());
    let months = (now.getFullYear() - createdDate.getFullYear()) * 12;
    months += now.getMonth() - createdDate.getMonth();
    if(months >= 6){
        return true
    }
    return false
}

const updateProduct = async (req, res, next) => {res.send("Update Product")}

export {createProduct, deleteProduct, getSingleProduct, updateProduct, getAlternatives, getProductsByCategory, searchProductsByQuery, getProductsByCategorySimple, searchProductsByQuerySimple}

