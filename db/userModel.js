const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
  email: {
    type:String,
    required:[true,"please fill the email"],
    unique:[true,"email exist"],
  },
  password: {
    type:String,
    required:[true,"please provide a password"], 
    unique:false,
  },
});

module.exports=mongoose.model.Users || mongoose.model("Users",UserSchema);


