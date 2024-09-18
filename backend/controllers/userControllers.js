const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//user registration
// const register = async(req,res) => {
//    try{
//      // check if user already exists
//      const userExists = await User.findOne({email: req.body.email})
//      if(userExists){
//         res.status(200).send({
//             message: "User already exists.",
//             success: false
//         })
//      }
//      else{
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(req.body.password,salt)
//         const newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         await newUser.save()
//         res.status(200).send({
//             message: "User registered successfully.",
//             success: true
//         })
//      }
//    }
//    catch(error){
//       res.status(400).send({
//         message: error.message,
//         data: error,
//         success: false
//       })
//    }
// }

const register = async(req, res) => {
  try {
      // check if user already exists
      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
          res.status(200).send({
              message: "User already exists.",
              success: false
          });
      } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              PhoneNumber: req.body.phone // Add PhoneNumber here
          });
          await newUser.save();
          res.status(200).send({
              message: "User registered successfully.",
              success: true
          });
      }
  } catch (error) {
      res.status(400).send({
          message: error.message,
          data: error,
          success: false
      });
  }
};


// //user login
// const login = async(req,res) => {
//    try{
//      //check if user exists
//      const user = await User.findOne({email: req.body.email})
//      if(user){
//         const passwordsMatched = await bcrypt.compare(req.body.password,user.password)
//         //check if passwords are valid
//         if(passwordsMatched){
//             const token = jwt.sign({
//                 userid: user._id
//             },process.env.JWT_SECRET,{
//                 expiresIn: "1d"
//             })
//             res.send({
//               message: "User logged in successfully",
//               data: token,
//               success: true,
//             })
//         }
//         else{
//             res.status(200).send({
//                 message: "Invalid Password",
//                 success: false
//             })
//         }
//      }
//      else{
//         res.status(200).send({
//             message: "User doesnot exist.",
//             success: false
//         })
//      }     
//    }
//    catch(error){
//     res.status(400).send({
//         message: error.message,
//         data: error,
//         success: false
//     })
//    }
// }

// login
const login = async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const passwordsMatched = await bcrypt.compare(req.body.password, user.password);
        // Check if passwords are valid
        if (passwordsMatched) {
          const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        //  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          // res.send({
          //   message: "User logged in successfully",
          //   data: {
          //     token: token,
          //   },
          //   success: true
          // });
          res.status(200).send({
            message: "Login successful",
            token: token ,// Ensure this is the correct path
            success: true
          });
        } else {
          res.status(200).send({
            message: "Invalid Password",
            success: false
          });
        }
      } else {
        console.log("backend login usercontroller error1");
        res.status(200).send({
          message: "User does not exist.",
          success: false
        });
      }
    } catch (error) {
      console.log("backend login usercontroller error");
      res.status(400).send({
      
        message: error.message,
        data: error,
        success: false
      });
    }
  };
//get user info
const getUserInfo = async(req,res) => {
   try{
      const user = await User.findOne({_id: req.body.userid})
      console.log(req.body);
      console.log("backend userinfo usercontroller success");
      if(user){
        res.status(200).send({
            message: "User Info fetched successfully",
            data: user,
            success: true
        })
      }
      else{
        console.log("backend userinfo usercontroller error");
        res.status(200).send({
            message: "Failed to fetch user info",
            data: null,
            success: false
        })
      }
   }
   catch(error){
    res.status(400).send({
        message: error.message,
        data: error,
        success: false
    })
   }
}

module.exports = { register, login, getUserInfo }



// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // User registration
// const register = async (req, res) => {
//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email: req.body.email });
//     if (userExists) {
//       res.status(200).send({
//         message: "User already exists.",
//         success: false
//       });
//     } else {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       });
//       await newUser.save();
//       res.status(200).send({
//         message: "User registered successfully.",
//         success: true
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       message: error.message,
//       data: error,
//       success: false
//     });
//   }
// };

// // User login
// const login = async (req, res) => {
//   try {
//     // Check if user exists
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const passwordsMatched = await bcrypt.compare(req.body.password, user.password);
//       // Check if passwords are valid
//       if (passwordsMatched) {
//         const token = jwt.sign(
//           { userid: user._id },
//           process.env.JWT_SECRET,
//           { expiresIn: "1d" }
//         );
//         res.send({
//           message: "User logged in successfully",
//           data: {
//             token: token,
//             userId: user._id // Include the user ID in the response
//           },
//           success: true
//         });
//       } else {
//         res.status(200).send({
//           message: "Invalid Password",
//           success: false
//         });
//       }
//     } else {
//       res.status(200).send({
//         message: "User does not exist.",
//         success: false
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       message: error.message,
//       data: error,
//       success: false
//     });
//   }
// };

// // Get user info
// const getUserInfo = async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.body.userid });
//     if (user) {
//       res.status(200).send({
//         message: "User Info fetched successfully",
//         data: user,
//         success: true
//       });
//     } else {
//       res.status(200).send({
//         message: "Failed to fetch user info",
//         data: null,
//         success: false
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       message: error.message,
//       data: error,
//       success: false
//     });
//   }
// };

// module.exports = { register, login, getUserInfo };
