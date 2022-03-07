import Product from "../models/Product.js";

/*
createProduct
API Controller for creating a product
Input in body:
    {barcode, name, category, servingsize, weight, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium}

Returns the newly created object

*/
const createProduct = async (req, res) => {
    //TODO: Handle images being sent and store
    console.log(req.body);
    const {barcode, name, category, servingsize, weight, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium } = req.body;

    //Check if any required fields are missing from the body
    if (!barcode || !name || !category || !servingsize || !weight || !energy || !protein || !carbohydrate || !sugar || !fat || !saturatedfat || !sodium ){
        throw new BadRequestError("Please ensure all fields are provided.")
    }
    // Check if the barcode already exists in the database 
    const existingProduct = await Product.findOne({product_barcode : barcode});
    if (existingProduct){
        throw new ConflictError("Product already exists");
    }

    // Create the product
    const newProduct = await Product.create({
        product_barcode : barcode,
        product_name : name,
        product_category : category,
        product_servingsize : servingsize,
        product_weight : weight,
        energykj_100g : energy,
        protein_100g : protein,
        carbohydrate_100g : carbohydrate,
        sugars_100g : sugar,
        fat_100g : fat,
        saturatedfat_100g : saturatedfat,
        sodium_100g : sodium,
    });

    return res.status(201).json({barcode, name, category, servingsize, weight, energy, protein, carbohydrate, sugar, fat, saturatedfat, sodium });

}

const deleteProduct = async (req, res, next) => {res.send("Delete Product")}

const getSingleProduct = async (req, res, next) => {res.send("Get Single Product")}

const updateProduct = async (req, res, next) => {res.send("Update Product")}

export {createProduct, deleteProduct, getSingleProduct, updateProduct}

