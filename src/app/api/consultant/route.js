import { NextResponse } from "next/server";
import { connectDB } from "../../../config/database";
import ConsultantModel from "../../../model/Consultant-model";

export async function POST (req){
    try {
        const data = await req.json();
        const {Name , Email , Consultant , Phone , Date} = data
        if(!Name || !Email || !Consultant || !Phone || !Date){
            return NextResponse.json({message:"All fields are required"},{status:400});
        }
        await connectDB();
        const consultant = await ConsultantModel.create({name : Name , email : Email , consultant : Consultant , phone : Phone , date : Date});
        console.log(consultant);
        return NextResponse.json({
            success : true,
            message : "succesFully uploaded "
        });



    } catch (error) {
        console.log(error.message)
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
        const consultant = await ConsultantModel.find();
        return NextResponse.json(consultant);
    } catch (error) {
        console.log(error.message)
          return NextResponse.json({
              message: "Internal server error",
              error: error.message,
              success: false
            }, { status: 500 });
    }
}