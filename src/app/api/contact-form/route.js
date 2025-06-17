import { NextResponse } from 'next/server';
import Form from "../../../model/Form-model"; // Adjust if path is wrong
import { connectDB } from '../../../config/database';

export async function POST(req) {
  try {
    const data = await req.json();
    const { Name, Message, Email, Phone , Requirement } = data;

    if (!Name || !Message || !Email || !Phone) {
      return NextResponse.json({
        message: "All fields are required",
        success: false
      }, { status: 400 });
      
    }

    await connectDB();

    const formUpload = await Form.create({ name : Name, message : Message, email : Email  , phone : Phone , requirement : Requirement  });
    console.log(formUpload);

    return NextResponse.json({
      message: "Upload successfully",
      success: true
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal server error",
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
