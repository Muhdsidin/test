import mongoose from "mongoose";

const ConsultantModel = new mongoose.Schema({
  name : {
    required : true,
    type : String
  },
  email : {
    required : true,
    type : String
  },
  
  phone : {
    required : true,
    type : String
  },
  date : {
    required : true,
    type : String
  },
  consultant :{
    required : true,
    type : String
  }
});

const Consultant= mongoose.models.Consultant || mongoose.model("Consultant", ConsultantModel);
export default Consultant;
