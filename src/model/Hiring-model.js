import mongoose from "mongoose";
import { type } from "os";

const HiringModel = new mongoose.Schema({
  Heading : {
    required : true,
    type : String
  },
  Description : {
    required : true,
    type : String
  },
  Location : {
    required : true,
    type : String
  },
  Type : {
    required : true,
    type : String
  },
});

const Hiring = mongoose.models.Hiring || mongoose.model("Hiring", HiringModel);
export default Hiring;
