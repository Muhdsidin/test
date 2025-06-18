import mongoose from "mongoose";
import { act } from "react";

const ActivityModel = new mongoose.Schema({
  name : {
    required : true,
    type : String
  },
  email : {
    required : true,
    type : String
  },
  message : {
    required : true,
    type : String
  },
  phone : {
    required : true,
    type : String
  },
  activity :{
    required : true,
    type : String
  },
  details : {
    required : true,
    type : String
  }
});

const Activity = mongoose.models.Activity || mongoose.model("Activity",ActivityModel );
export default Activity;
