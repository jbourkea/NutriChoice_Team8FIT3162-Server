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
    product_img : {
        type: Buffer
    },
    product_datecreated : {
        type : Date,
        default : Date.now,
    },
    product_category : {
        type:String,
        required: [true, "Please provide a category for this product"],   
    },
    product_ingredients_img : {
        type: Buffer
    },
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
        min:0
    },
    protein_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    carbohydrates_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    sugars_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    fat_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    saturatedfat_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    sodium_100g : {
        type : mongoose.Types.Decimal128,
        min:0
    },
    // TODO: Add additional non-required macros    
})

export default mongoose.model('product', ProductSchema);