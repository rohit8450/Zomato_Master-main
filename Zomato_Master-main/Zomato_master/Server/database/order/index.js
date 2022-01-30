import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema({
    fullname: {type:String,required:true},
    users: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
    },
    orderDetails: [{
        food: {type: mongoose.Types.ObjectId,ref:"Foods"},
        quantity: {type:String,required: true},
        Paymode: {type: Number,required: true},
        status: {type: String, default: "Placed"},
        PaymentDetails: {
            itemTotal: {type: Number,required: true},
            promo: {type: Number,required: true},
            tax: {type:Number,required: true}
        }
    }]
},

    {
        timestamps:true
    }

);


export const OrderModel=mongoose.model("order",OrderSchema);