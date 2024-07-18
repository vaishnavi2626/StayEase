const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
    },
    image:{
        // type: String,
        // default:"https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg",
        // set: (v)=> v===""?"https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg":v,
        url: String,
        filename: String,
    },
    price:Number,
    location: {
        type: String,
        required: true
    },
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;