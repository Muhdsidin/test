import mongoose from "mongoose";

const FormModel = new mongoose.Schema({
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
  requirement :{
    required : true,
    type : String
  }
});

const Form = mongoose.models.Form || mongoose.model("Form", FormModel);
export default Form;
