import { NextResponse } from 'next/server';
import { connectDB } from '../../../config/database';
import ActivityModel from '../../../model/Activity-model';

export async function POST (req){
    try {
        const data = await req.json();
        const {Name , Email , Message , Phone , Activity , Details} = data;

        if(!Name || !Email || !Message || !Phone || !Activity || !Details){
            return NextResponse.json({message:"All fields are required"},{status:400});
        }
        await connectDB();
        const activity = await ActivityModel.create({name : Name , email : Email , message : Message , phone : Phone , activity : Activity , details : Details});
        return NextResponse.json({
            success : true,
            message : "succesFully uploaded "
        });
        
    } catch (error) {
         console.error(error);
            return NextResponse.json({
              message: "Internal server error",
              error: error.message,
              success: false
            }, { status: 500 });
    }
}

export async function GET(req){
    try {
        await connectDB();
        const activity = await ActivityModel.find();
        return NextResponse.json(activity);
    } catch (error) {
         console.error(error);
            return NextResponse.json({
              message: "Internal server error",
              error: error.message,
              success: false
            }, { status: 500 });
    }
}