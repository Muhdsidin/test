import { connectDB } from "../../../config/database";
import BlogModel from "../../../model/Blog-model";
export async function GET() {
  try {
    await connectDB();
    const blogPosts = await BlogModel.find();
    return Response.json(blogPosts);
  } catch (error) {
        return Response.json(error.message);
  }
}
