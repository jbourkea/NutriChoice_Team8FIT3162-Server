import mongoose from 'mongoose'

// Product Schema to be made into model
// TODO: Find appropriate solution to image uploads to the document
const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_barcode : {
        type:String,
        required:[true, "Please provide a unique barcode for product"],
        unique: [true, "This product already exists"] ,
        minlength:6,
    },
    product_name : {
        type:String,
        required:[true, "Please provide a name for the product"],
        minlength:5,
        maxlength:35,
        default:'Undefined Product',
    },
    // TODO: Include image of product
    product_datecreated : {
        type : Date,
        default : Date.now,
    },
    product_category : {
        type:String,
        required: [true, "Please provide a category for this product"],   
    },
    // TODO: Include image of ingredients
    product_ingredients : [{
        type:String
    }],
    product_servingsize : {
        type: mongoose.Types.Decimal128,
        required : [true, "Please provide a serving size"]
    },
    product_weight : {
        type: mongoose.Types.Decimal128,
        required : [true, "Please provide a net weight"]
    },
    energykj_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide energy value"]
    },
    protein_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide protein value"]
    },
    carbohydrates_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide carbohydrate value"]
    },
    sugars_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide sugar value"]
    },
    fat_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide fat value"]
    },
    saturatedfat_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide saturated fat value"]
    },
    sodium_100g : {
        type : mongoose.Types.Decimal128,
        required : [true, "Please provide sodium value"]
    },
    // TODO: Add additional non-required macros    
})

export default mongoose.model('product', ProductSchema);