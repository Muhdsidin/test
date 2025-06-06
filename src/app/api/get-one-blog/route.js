import { connectDB } from "../../../config/database";
import BlogModel from "../../../model/Blog-model";

export async function GET(req) {
  try {
    const id = req.headers.get("id");
    await connectDB();
    const blog = await BlogModel.findById(id);
    return Response.json(blog);
  } catch (error) {
    return Response.json(error.message);
  }
}
