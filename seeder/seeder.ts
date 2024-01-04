import mongoose from "mongoose";
import Room from "../backend/models/Room";
import { rooms } from "./data";


const seedRooms = async () => {
   try {

      //connect to database
      await mongoose.connect("mongodb://127.0.0.1:27017/bookit-v2")
      
      //delete all rooms already in database
      await Room.deleteMany();
      console.log("Rooms are deleted");

      //add new all rooms to database
      await Room.insertMany(rooms);
      console.log("Rooms are added");

      process.exit();

   } catch (error) {
      console.log(error);
      process.exit();
   }
};

seedRooms();