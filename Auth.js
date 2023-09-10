const jwt = require('jsonwebtoken');
model.exports= async(request,response,next)=>{
  try{
    const token=await request.headers.authorization.split(" ")[1];
    const decodedToken=await jwt.verify(token,"RANDOM-TOKEN");
    const user=await  decodedToken;
    request.user=user;
    next();
  }
  catch(error){
    response.status(404).json({
      error:new error("invalid request"),
      
    })
  }
}