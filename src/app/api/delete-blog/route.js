import { connectDB } from "../../../config/database";
import BlogModel from "../../../model/Blog-model";

export async  function POST(req ){
    try {
        await connectDB();
        const data = await req.json();
        const blogPost = await BlogModel.findByIdAndDelete(data.id,{new:true});
        return Response.json(blogPost);
        
    } catch (error) {
        console.log(error.message)
    }
}