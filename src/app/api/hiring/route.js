import { NextResponse } from "next/server";
import { connectDB } from "../../../config/database";
import Hiring from "../../../model/Hiring-model";

export async function POST (req){
    try {
        const data = await req.json();
        const { Heading, Description , Type , Location} = data
        if(!Heading || !Description || !Type || !Location){
            return NextResponse.json({message:"All fields are required"},{status:400});
        }
        await connectDB();
        const hiring = await Hiring.create({Heading,Description,Type,Location})
        return NextResponse.json({
            success : true,
            message : "succesFully uploaded "
        });
        
    } catch (error) {
        console.log(error.message)
         return NextResponse.json({
            success : false,
            message : "Internal server error"
        });
    }
} 


export async function GET(req){
    try {
        await connectDB();
        const hiring = await Hiring.find();
        return NextResponse.json(hiring);
    } catch (error) {
        console.log(error.message)
         return NextResponse.json({
            success : false,
            message : "Internal server error"
        });
    }
}

export async function DELETE(req){
    try {
        await connectDB();
        const data = await req.json();
        const {id} = data
        const hiring = await Hiring.findByIdAndDelete(id);
        return NextResponse.json({
            success : true,
            message : "succesFully deleted "
        });
        
    } catch (error) {
        console.log(error.message)
         return NextResponse.json({
            success : false,
            message : "Internal server error"
        });
    }
}

