import mongoose from "mongoose";

const BlogModel = new mongoose.Schema({
  title: {
    required: true,  // <-- fixed here
    type: String,
  },
  description: {     // corrected spelling from "discription" to "description"
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
  heading: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogModel);
export default Blog;
