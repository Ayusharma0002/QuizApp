// // routes/emailRoutes.js
// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Setup Nodemailer transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ayush@samvit.online',
//     pass: 'S,h7VJY2!tvu:,H',
//   },
// });

// // Email sending endpoint
// router.post('/sendResults', async (req, res) => {
//   const { email, quizTitle, results } = req.body;

//   const mailOptions = {
//     from: 'ayush@samvit.online',
//     to: email,
//     subject: `Your Results for ${quizTitle} Quiz`,
//     text: `
//       Thank you for attempting the ${quizTitle} quiz.
//       Below is your score for this quiz:

//       Technical Skills Marks: ${results.technical}
//       Human Skills Marks: ${results.human}
//       Conceptual Skills Marks: ${results.conceptual}

//       Thank you,
//       Team Samvits
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;







// routes/emailRoutes.js
// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Setup Nodemailer transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ayush@samvit.online',
//     pass: 'S,h7VJY2!tvu:,H',
//   },
// });

// // Email sending endpoint
// router.post('/sendResults', async (req, res) => {
//   console.log("tututututuu")
//   const { email, quizTitle, results } = req.body;


//   if (!email || !quizTitle || !results) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const mailOptions = {
//     from: 'ayush@samvit.online',
//     to: email,
//     subject: `Your Results for ${quizTitle} Quiz`,
//     text: `
//       Thank you for attempting the ${quizTitle} quiz.
//       Below is your score for this quiz:

//       Technical Skills Marks: ${results.technical}
//       Human Skills Marks: ${results.human}
//       Conceptual Skills Marks: ${results.conceptual}

//       Thank you,
//       Team Samvit
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();

// router.post('/sendResults', async (req, res) => {
//     // Your email sending logic here
//     try {
//         const { email, quizTitle, results } = req.body;
//         // ... send email using Nodemailer ...
//         res.status(200).send('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Failed to send email');   

//     }
// });

// module.exports = router;

// const express = require('express');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Setup Nodemailer transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ayush@samvit.online',
//     pass: 'S,h7VJY2!tvu:,H',
//   },
// });

// // Email sending endpoint
// router.post('/sendResults', async (req, res) => {
//   console.log("tututututuu")
  
  
// });

// module.exports = router;


