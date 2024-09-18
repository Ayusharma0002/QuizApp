const jwt = require("jsonwebtoken")

module.exports = function(req,res,next) {
    try{
      
       const token = req.headers.authorization.split(' ')[1];
      //  console.log(token);
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.body.userid=decoded.userid;
       console.log(req.body.userid);
       next();
    }
    catch(error){
      // console.log("Error ari meri jaan");
      res.send({
        message: error.message,
        data: error,
        success: false
      })
    }
}