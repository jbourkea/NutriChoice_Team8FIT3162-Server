import mongoose from 'mongoose'

// Helper function for returning Decimal128 format
function getFormatedDecimal(value){
    let returnValue = value;
    if(value || value.$numberDecimal){
        returnValue = parseFloat(value.toString());
    }
    return returnValue;
}


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
        maxlength:50,
        default:'Undefined Product',
    },
    product_unit : {
        type:String,
        default: 'g'
    },
    product_img : {
        type: String
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
        type: String
    },
    product_ingredients : [{
        type:String
    }],
    product_servingsize : {
        type: mongoose.Types.Decimal128,
        required : [true, "Please provide a serving size"],
        get : getFormatedDecimal
    },
    product_weight : {
        type: mongoose.Types.Decimal128,
        required : [true, "Please provide a net weight"],
        get : getFormatedDecimal
    },
    energykj_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    protein_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    carbohydrates_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    sugars_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    fat_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    saturatedfat_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    sodium_100g : {
        type : mongoose.Types.Decimal128,
        min:0,
        get : getFormatedDecimal
    },
    // TODO: Add additional non-required macros    
}, { toJSON: { getters: true } })


export default mongoose.model('product', ProductSchema);