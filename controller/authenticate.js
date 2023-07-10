const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"sumit",(err,decoded)=>{
            if(decoded){
                req.body.id=decoded.userID
                next();
            }else{
                req.send({"msg":"Please login first"})
            }
        })
    }else{
        res.send({"msg":"Invalid Token"})
    }
}
module.exports={auth}