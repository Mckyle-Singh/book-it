import mongoose, { Schema,Document } from "mongoose";


// used to create a schema for the database

export interface IImage extends Document{
   public_id: String,
   url: String, 
}


export interface ILocation{
   type: String,
   coordinates: Number,
   formattedAddress: String,
   state: String,
   zipCode: String,
   country: String,
   
}

export interface IReview extends Document{
   user:mongoose.Schema.Types.ObjectId,
   rating: Number,
   comment: String,
}


export interface IRoom extends Document{
   name: String,
   description: String,
   address: String,
   pricePerNight: Number,
   location: ILocation,
   guestCapacity: Number,
   numOfBeds: Number,
   isInternet: Boolean,
   isBreakfast: Boolean,
   isAirConditioned: Boolean,
   isPetsAllowed: Boolean,
   isRoomCleaning: Boolean, 
   ratings: Number,
   numOfReviews: Number,
   images: IImage,
   category: String,
   reviews: IReview[],
   user: mongoose.Schema.Types.ObjectId
   createdAt: Date
   
}

const roomSchema: Schema = new Schema({
   name: {
      type: String,
      required: [true, "Please enter room name"],
      trim: true,
      maxLength: [200, "Room name cant exceed 200 characters"]
   },
   description: {
      type: String,
      required: [true, "Please enter room description"]
   },
   pricePerNight: {
      type: Number,
      required: [true, "Please enter room price per night"],
      default:0.0
   },
   address: {
      type: String,
      required: [true, "Please enter room address"]
   },
   location: {
      type: {
         type: String,
         enum:["Point"]
      },
      coordinates: {
         type: [Number],
         index: "2dsphere"
      },
      formattedAddress: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
   },
   guestCapacity: {
      type: Number,
      required: [true, "Please enter room guest capacity"],
   },
   numOfBeds: {
      type: Number,
      required: [true, "Please enter number of beds in room"],
   },
   isInternet: {
      type: Boolean,
      default:false
   },
   isBreakfast: {
      type: Boolean,
      default:false
   },
   isAirConditioned: {
      type: Boolean,
      default:false
   },
   isPetsAllowed: {
      type: Boolean,
      default:false
   },
   isRoomCleaning: {
      type: Boolean,
      default:false
   },
   ratings: {
      type: Number,
      default:0,
   },
   numOfReviews: {
      type: Number,
      default:0,
   },
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   category: {
      type: String,
      required: [true, "Please enter room category"],
      enum: {
         values: ["King", "Single", "Twins"],
         message:"Please select correct categry for room"
      },
   },
   
   reviews: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
         },
         rating: {
            type: Number, 
            required : true
         },
         comment: {
            type: String, 
            required : true
         },
      }
   ],
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : false
   },
   createdAt: {
      type: Date,
      default:Date.now
   }
});

export default mongoose.models.Room || mongoose.model<IRoom>("Room",roomSchema)