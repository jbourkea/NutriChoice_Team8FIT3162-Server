import mongoose from 'mongoose'


// User Schema to be made into a mongoose model
// TODO: Provide propper email validation

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email : {
        type, String,
        required : [true, "Please provide an email address"],
        minlength : 3,
        maxlength : 30,
        unique:true,
    },
    displayName : {
        type:String,
        required:[true, "Please provide a display name"],
        minlength:3,
        maxlength:20,
        unique:true
    },
    password: {
        type:String,
        required : [true, "Please provide a password"],
        minlength : 8,
        select : false
    },
    accountRole : {
        type:String,
        default : "USER"
    },
    subProducts : [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'product'
    }],
});

export default mongoose.model('user', UserSchema);