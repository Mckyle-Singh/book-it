import { NextRequest,NextResponse} from "next/server";
import Room, { IRoom } from '../models/Room'
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/APIFilters";
import { error } from "console";


// Get all rooms  =>  /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
   const resPerPage: number = 40;
   
   const { searchParams } = new URL(req.url);
 
   const queryStr: any = {};
   searchParams.forEach((value, key) => {
     queryStr[key] = value;
   });
 
   const apiFilters = new APIFilters(Room, queryStr).search().filter();
 
   let rooms: IRoom[] = await apiFilters.query;
   const filteredRoomsCount: number = rooms.length;
 
   apiFilters.pagination(resPerPage);
   rooms = await apiFilters.query.clone();
 
   return NextResponse.json({
     success: true,
     filteredRoomsCount,
     resPerPage,
     rooms,
   });
 });
 

//Create new room => /api/rooms

export const newRoom = catchAsyncErrors( async (req: NextRequest) => {
   const body = await req.json()

   const room = await Room.create(body)
   
   return NextResponse.json({
      success: true,
      room,
   });
});

//get room details => /api/rooms/id
export const getRoomDetails = catchAsyncErrors( async (
   req: NextRequest,
   { params }: { params: { id: string } }) => {

   const room = await Room.findById(params.id)
   
   if (!room) {
      throw new ErrorHandler("Room not found", 404);
   }

   return NextResponse.json({
      success: "true",
      room
   });
});



//update room details => /api/rooms/id
export const updateRoom = catchAsyncErrors( async (
   req: NextRequest,
   { params }: { params: { id: string } }
) => {

   let room = await Room.findById(params.id);
   const body = await req.json();

   if (!room) {
      throw new ErrorHandler('Room not found', 404);
   }

   room = await Room.findByIdAndUpdate(params.id, body,{
      new:true
   })
   
   return NextResponse.json({
      success: "true",
      room
   });
});


//delete  room => /api/rooms/id
export const deleteRoom = catchAsyncErrors( async (
   req: NextRequest,
   { params }: { params: { id: string } }
) => {

   const room = await Room.findById(params.id);
   

   if (!room) {
      throw new ErrorHandler('Room not found', 404);
   }
   // TODO - delete images
   await room.deleteOne();
   
   return NextResponse.json({
      success: "true",
      room
   });
});