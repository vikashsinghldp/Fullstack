const dbConnect=require("./db/dbConnect");
const bcrypt=require("bcrypt");
const User=require("./db/userModel");
const jwt = require('jsonwebtoken');
const auth =require("auth");

//register 
app.post("/register",()=>{
  bcrypt.hash(rquest.body.password,10)
  .then((hashedPassword)=>{
    const user = new User({
      email:request.body.email,
      password:hashedPassword,
    })
    user.save()
    .then((result)=>{
      response.status(201).send({
        message:"User created sucessfully",
        result,
      })
    })
    .catch((error)=>{
      message:"error creating user",
      error,
    })
  })
  .catch((e)=>{
    response.status(500).send({
      message:"password was not hashed sucessfully",e,
    })
  })
})

//login
app.post("/login",(request,response)=>{
  User.findOne({
    email:request.body.email,
  })
  .then((user)=>{
    bcrypt.compare(request.body.password,user.password)
  })
  .then((passwordCheck)={
    if(!passwordCheck){
      return response.status(400).send({
        message:"password does not match",
        error
      })
    }
    //create jwt jsonwebtoken
    const token=jwt.signin({
      userId:user._id,
      userEmail:user.email,
    },"RANDOM_TOKEN",
    {expiresIn:"24h"}
    );
    //return success response
    response.status(200).send({
      message:"login successful",
      email:user.email,
      token,
    });
  })
  .catch((error)=>{response.status.send({
    message:"password not found",
    error,
  })
  })
})
  
  .catch((error)=>{
    response.status(404).send({
      message:"email not found",
      error,
    })
  })
})
//excute database connection 
dbConnect();
app.use((request, response, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content,Accept,Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,UPDATE,PATCH,PUT,OPTIONS");
  next();
  
})
// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});


