const mongoose=require("mongoose");
require("dotenv").config();
async function dbConnect(){
  mongoose.connect(
    process.env.DB_URL,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}
    )
    .then(()=>{
      console.log("successfully connected to mongodb atlas");
    })
    .catch((error)=>{
    console.log("unable to connect database");
    console.error(error);
    })
}
module.exports=dbConnect;