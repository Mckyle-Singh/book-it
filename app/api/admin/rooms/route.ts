import dbConnect from '@/backend/config/dbConnect';
import { newRoom } from '@/backend/controllers/roomControllers';
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';

// using next-connect to manage routes 
interface RequestContext{
}

const router = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

router.post(newRoom);//This is an admin route since only admin can create rooms


export async function POST(request:NextRequest, ctx:RequestContext) {
   return router.run(request, ctx);
}