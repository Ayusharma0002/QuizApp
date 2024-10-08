// const express = require("express")
// const app = express()

// const path = require("path");

// require("dotenv").config()
// // const cors = require("cors")
// const db = require("./config/dbConfig")
// const userRoute = require("./routes/userRoutes")
 // // app.use("/api/users",userRoute)
// const examRoute = require("./routes/examRoutes")
// const reportRoute = require("./routes/reportRoutes")

// const port = process.env.PORT || 5000

// // app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))


// app.use("/api/users",userRoute)
// app.use("/api/exams",examRoute)
// app.use("/api/reports",reportRoute)


// // app.use(express.urlencoded({ extended: true }))
// const _dirname = path.resolve();
// app.use(express.static(path.join(_dirname, "/frontend/build")));
// app.get("*",(req,res)=>{
// res.sendFile(path.join(_dirname, "/frontend/build/index.html"))
// });

// app.use((err, req, res, next)=>{
// res.status(500).send({ message: err.message});
// })



// app.listen(port,()=>{
// console.log(`Server is running on PORT: ${port}`)
// })

// const express = require('express');
// const mongoose = require('mongoose');


// require("dotenv").config()
// const bodyParser = require('body-parser');

// // Import the models
// const Question = require('./models/Question');
// const Quiz = require('./models/Quiz');
// const Answer = require('./models/Answer');
// const userRoute = require("./routes/userRoutes")


// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json())


// app.use("/api/users",userRoute)

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/quizdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });

// // Routes

// // 1. Create a new quiz
// app.post('/quiz', async (req, res) => {
//     try {
//         const { title } = req.body;
//         const quiz = new Quiz({ title });
//         await quiz.save();
//         res.status(201).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // // 2. Add a question to a quiz
// // app.post('/quiz/:quizId/questions', async (req, res) => {
// //     try {
// //         const { quizId } = req.params;
// //         const { questionText, options } = req.body;

// //         // Create a new question
// //         const question = new Question({
// //             questionText,
// //             options
// //         });
// //         await question.save();

// //         // Add question to the quiz
// //         const quiz = await Quiz.findById(quizId);
// //         quiz.questions.push(question._id);
// //         await quiz.save();

// //         res.status(201).json(question);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });
// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const questions = req.body; // Assuming it's an array of questions

//         if (!Array.isArray(questions) || questions.length === 0) {
//             return res.status(400).json({ message: 'Invalid request: An array of questions is required.' });
//         }

//         // Find the quiz by ID
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // Iterate over each question and save it
//         const questionIds = [];
//         for (const questionData of questions) {
//             const { questionText, options } = questionData;

//             if (!questionText || !options || options.length === 0) {
//                 return res.status(400).json({ message: 'Each question must have text and options.' });
//             }

//             // Create and save the question
//             const question = new Question({
//                 questionText,
//                 options
//             });
//             await question.save();

//             // Push the question ID into the quiz
//             quiz.questions.push(question._id);
//             questionIds.push(question._id);
//         }

//         // Save the quiz with the new questions
//         await quiz.save();

//         res.status(201).json({ message: 'Questions added successfully', questionIds });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// // Get quiz details for a specific quiz
// app.get('/quiz/:quizId', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const quiz = await Quiz.findById(quizId).populate('questions');
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.status(200).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// // Submit answers for a specific quiz
// // app.post('/quiz/:quizId/submit', async (req, res) => {
// //     try {
// //         const { quizId } = req.params;
// //         const { userId, answers } = req.body; // answers should be an array of objects containing questionId, selectedOption, etc.

// //         // Validate answers array
// //         if (!Array.isArray(answers) || answers.length === 0) {
// //             return res.status(400).json({ message: 'No answers provided' });
// //         }

// //         // Save each answer
// //         const answerPromises = answers.map(async (answer) => {
// //             const { questionId, selectedOption } = answer;

// //             // Create a new answer entry
// //             const userAnswer = new Answer({
// //                 userId,
// //                 quizId,
// //                 questionId,
// //                 selectedOption
// //             });

// //             return userAnswer.save();
// //         });

// //         const savedAnswers = await Promise.all(answerPromises);

// //         res.status(201).json({
// //             message: 'Answers submitted successfully',
// //             savedAnswers
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });
// app.post('/quiz/:quizId/submit', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, answers } = req.body; // answers should be an array of objects containing questionId, selectedOption, etc.

//         // Validate answers array
//         if (!Array.isArray(answers) || answers.length === 0) {
//             return res.status(400).json({ message: 'No answers provided' });
//         }

//         // Save each answer
//         const answerPromises = answers.map(async (answer) => {
//             const { questionId, selectedOption } = answer;

//             // Find the question to get the correct option and marks
//             const question = await Question.findById(questionId);
//             if (!question) {
//                 throw new Error(`Question with ID ${questionId} not found`);
//             }

//             const selectedOptionData = question.options[selectedOption];
//             if (!selectedOptionData) {
//                 throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
//             }

//             // Create a new answer entry
//             const userAnswer = new Answer({
//                 userId,
//                 quizId,
//                 questionId,
//                 selectedOption,
//                 marksObtained: selectedOptionData.marks // Correctly assign marks
//             });

//             return userAnswer.save();
//         });

//         const savedAnswers = await Promise.all(answerPromises);

//         res.status(201).json({
//             message: 'Answers submitted successfully',
//             savedAnswers
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get user's answers for a specific quiz
// app.get('/quiz/:quizId/answers/:userId', async (req, res) => {
//     try {
//         const { quizId, userId } = req.params;
//         const answers = await Answer.find({ quizId, userId }).populate('questionId');
//         if (!answers) {
//             return res.status(404).json({ message: 'No answers found' });
//         }
//         res.status(200).json(answers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 3. Get all quizzes
// app.get('/quiz', async (req, res) => {
//     try {
//         const quizzes = await Quiz.find().populate('questions');
//         res.status(200).json(quizzes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 4. Submit an answer
// app.post('/quiz/:quizId/answer', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, questionId, selectedOptionIndex } = req.body;

//         // Find the question and get the marks for the selected option
//         const question = await Question.findById(questionId);
//         const selectedMarks = question.options[selectedOptionIndex].marks;

//         // Create a new answer
//         const answer = new Answer({
//             userId,
//             quizId,
//             questionId,
//             selectedOption: selectedOptionIndex,
//             marksObtained: selectedMarks
//         });
//         await answer.save();

//         res.status(201).json(answer);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const bodyParser = require('body-parser');

// // Import the models
// const Question = require('./models/Question');
// const Quiz = require('./models/Quiz');
// const Answer = require('./models/Answer');
// const userRoute = require("./routes/userRoutes");

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json());

// app.use("/api/users", userRoute);

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/quizdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });

// // Routes

// // 1. Create a new quiz
// app.post('/quiz', async (req, res) => {
//     try {
//         const { title } = req.body;
//         const quiz = new Quiz({ title });
//         await quiz.save();
//         res.status(201).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 2. Add questions to a quiz
// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const questions = req.body; // Assuming it's an array of questions

//         if (!Array.isArray(questions) || questions.length === 0) {
//             return res.status(400).json({ message: 'Invalid request: An array of questions is required.' });
//         }

//         // Find the quiz by ID
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // Iterate over each question and save it
//         const questionIds = [];
//         for (const questionData of questions) {
//             const { questionText, options, category } = questionData;

//             if (!questionText || !options || options.length === 0 || !category) {
//                 return res.status(400).json({ message: 'Each question must have text, options, and a category.' });
//             }

//             // Create and save the question
//             const question = new Question({
//                 questionText,
//                 options,
//                 category
//             });
//             await question.save();

//             // Push the question ID into the quiz
//             quiz.questions.push(question._id);
//             questionIds.push(question._id);
//         }

//         // Save the quiz with the new questions
//         await quiz.save();

//         res.status(201).json({ message: 'Questions added successfully', questionIds });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get quiz details for a specific quiz
// app.get('/quiz/:quizId', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const quiz = await Quiz.findById(quizId).populate('questions');
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.status(200).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // // Submit answers for a specific quiz
// // app.post('/quiz/:quizId/submit', async (req, res) => {
// //     try {
// //         const { quizId } = req.params;
// //         const { userId, answers } = req.body; // answers should be an array of objects containing questionId, selectedOption, etc.

// //         // Validate answers array
// //         if (!Array.isArray(answers) || answers.length === 0) {
// //             return res.status(400).json({ message: 'No answers provided' });
// //         }

// //         // Save each answer
// //         const answerPromises = answers.map(async (answer) => {
// //             const { questionId, selectedOption } = answer;

// //             // Find the question to get the correct option and marks
// //             const question = await Question.findById(questionId);
// //             if (!question) {
// //                 throw new Error(`Question with ID ${questionId} not found`);
// //             }

// //             const selectedOptionData = question.options[selectedOption];
// //             if (!selectedOptionData) {
// //                 throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
// //             }

// //             // Create a new answer entry
// //             const userAnswer = new Answer({
// //                 userId,
// //                 quizId,
// //                 questionId,
// //                 selectedOption,
// //                 marksObtained: selectedOptionData.marks ,
// //                 category: question.category
// //             });

// //             return userAnswer.save();
// //         });

// //         const savedAnswers = await Promise.all(answerPromises);

// //         res.status(201).json({
// //             message: 'Answers submitted successfully',
// //             savedAnswers
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// // app.post('/quiz/:quizId/submit', async (req, res) => {
// //     try {
// //         const { quizId } = req.params;
// //         const { userId, answers } = req.body;

// //         // Validate answers array
// //         if (!Array.isArray(answers) || answers.length === 0) {
// //             return res.status(400).json({ message: 'No answers provided' });
// //         }

// //         // Save each answer
// //         const answerPromises = answers.map(async (answer) => {
// //             const { questionId, selectedOption } = answer;

// //             // Find the question to get the correct option and marks
// //             const question = await Question.findById(questionId);
// //             if (!question) {
// //                 throw new Error(`Question with ID ${questionId} not found`);
// //             }

// //             const selectedOptionData = question.options[selectedOption];
// //             if (!selectedOptionData) {
// //                 throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
// //             }

// //             // Create a new answer entry
// //             const userAnswer = new Answer({
// //                 userId,
// //                 quizId,
// //                 questionId,
// //                 selectedOption,
// //                 marksObtained: selectedOptionData.marks,
// //                 category: question.category
// //             });

// //             return userAnswer.save();
// //         });

// //         const savedAnswers = await Promise.all(answerPromises);

// //         // Generate report
// //         const report = await generateReport(userId);

// //         res.status(201).json({
// //             message: 'Answers submitted successfully',
// //             savedAnswers,
// //             report
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });
// app.post('/quiz/:quizId/submit', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, answers } = req.body;

//         // Validate answers array
//         if (!Array.isArray(answers) || answers.length === 0) {
//             return res.status(400).json({ message: 'No answers provided' });
//         }

//         // Save each answer
//         const answerPromises = answers.map(async (answer) => {
//             const { questionId, selectedOption } = answer;

//             // Find the question to get the correct option and marks
//             const question = await Question.findById(questionId);
//             if (!question) {
//                 throw new Error(`Question with ID ${questionId} not found`);
//             }

//             const selectedOptionData = question.options[selectedOption];
//             if (!selectedOptionData) {
//                 throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
//             }

//             // Create a new answer entry
//             const userAnswer = new Answer({
//                 userId,
//                 quizId,
//                 questionId,
//                 selectedOption,
//                 marksObtained: selectedOptionData.marks,
//                 category: question.category
//             });

//             return userAnswer.save();
//         });

//         const savedAnswers = await Promise.all(answerPromises);

//         // Generate report with both userId and quizId
//         const report = await generateReport(userId, quizId);

//         res.status(201).json({
//             message: 'Answers submitted successfully',
//             savedAnswers,
//             report
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// // // Helper function to generate the report
// // const generateReport = async (userId) => {
// //     try {
// //         const results = await Answer.aggregate([
// //             { $match: { userId: mongoose.Types.ObjectId(userId) } },
// //             { $group: { _id: "$category", totalScore: { $sum: "$marksObtained" } } }
// //         ]);

// //         const report = {};
// //         results.forEach(result => {
// //             if (result._id) {
// //                 report[result._id] = result.totalScore;
// //             }
// //         });

// //         // Add zero scores for categories with no answers if needed
// //         ['Technical Skills', 'Human Skills', 'Conceptual Skills'].forEach(category => {
// //             if (!report[category]) {
// //                 report[category] = 0;
// //             }
// //         });

// //         return report;
// //     } catch (error) {
// //         throw new Error('Error generating report: ' + error.message);
// //     }
// // };


// const generateReport = async (userId, quizId) => {
//     try {
//         // Log the userId and quizId for debugging
//         console.log("Generating report for userId:", userId, "and quizId:", quizId);

//         // Perform the aggregation query
//         const results = await Answer.aggregate([
//             { $match: { userId: mongoose.Types.ObjectId(userId), quizId: mongoose.Types.ObjectId(quizId) } },
//             { $group: { _id: "$category", totalScore: { $sum: "$marksObtained" } } }
//         ]);

//         // Log the raw results from the aggregation
//         console.log("Aggregation results:", results);

//         // Process the results and construct the report
//         const report = {};
//         results.forEach(result => {
//             if (result._id) {
//                 report[result._id] = result.totalScore;
//             } else {
//                 report['Uncategorized'] = (report['Uncategorized'] || 0) + result.totalScore;
//             }
//         });

//         // Log the final report before returning
//         console.log("Final report:", report);

//         return report;
//     } catch (error) {
//         // Log any errors encountered during report generation
//         console.error('Error generating report:', error.message);
//         throw new Error('Error generating report: ' + error.message);
//     }
// };


// // Get user's answers for a specific quiz
// app.get('/quiz/:quizId/answers/:userId', async (req, res) => {
//     try {
//         const { quizId, userId } = req.params;
//         const answers = await Answer.find({ quizId, userId }).populate('questionId');
//         if (!answers) {
//             return res.status(404).json({ message: 'No answers found' });
//         }
//         res.status(200).json(answers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 3. Get all quizzes
// app.get('/quiz', async (req, res) => {
//     try {
//         const quizzes = await Quiz.find().populate('questions');
//         res.status(200).json(quizzes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 4. Submit an answer
// app.post('/quiz/:quizId/answer', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, questionId, selectedOptionIndex } = req.body;

//         // Find the question and get the marks for the selected option
//         const question = await Question.findById(questionId);
//         if (!question) {
//             return res.status(404).json({ message: 'Question not found' });
//         }
//         const selectedOption = question.options[selectedOptionIndex];
//         if (!selectedOption) {
//             return res.status(400).json({ message: 'Invalid option selected' });
//         }

//         const answer = new Answer({
//             userId,
//             quizId,
//             questionId,
//             selectedOption: selectedOptionIndex,
//             marksObtained: selectedOption.marks
//         });
//         await answer.save();

//         res.status(201).json(answer);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const pdfMake = require('pdfmake');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing CORS

// Import the models
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const Answer = require('./models/Answer');
const User = require('./models/userModel');

const userRoute = require("./routes/userRoutes");
// const emailRoutes = require("./routes/emailRoutes"); // Import the email routes


const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enabling CORS for all routes
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRoute);
// app.use("/api/email", emailRoutes); // Use the email routes

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/quizdb', {
mongoose.connect('mongodb://localhost:27017/quizdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes

// Setup Nodemailer transport
// nodemailer is used for sending emails , gmail mai jao ,2step verification on,karo, then,app passowrd,mai jake ,create app name
// then ,passowrd milega ,usme se space remove kar dena, aur password ko ,pass ki jagah lik dena ,jaise neeche lik ra
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    port:465,
    auth: {
      user: 'aayusharma9009@gmail.com',
      pass: 'vegrxnmdqxdiuxnn'
    }
  });
//   const generatePdf = async (user) => {
//     const pdfContent = [
//         {
//             text: `Dear ${user.username},`,
//             style: 'header',
//         },
//         {
//             text: `Your score for the ${user.testName} test is: ${user.testScore}`,
//             style: 'bodyText',
//         },
//     ];

//     const pdfDoc = pdfMake.createPdf({ content: pdfContent });
//     const pdfBuffer = await new Promise((resolve, reject) => {
//         pdfDoc.getBuffer((buffer) => {
//             resolve(buffer);
//         });
//     });

//     return pdfBuffer;
// };

// app.post('/sendResults', async (req, res) => {
//     const { email, quizTitle, results, userId } = req.body;

//     // Validate input
//     if (!email || !quizTitle || !results || !userId) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//         // Fetch user from the database using userId
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate PDF from user test results
//         const pdfBuffer = await generatePdf(user);

//         const mailOptions = {
//             from: 'aayusharma90009@gmail.com',
//             to: email,
//             subject: `Your Results for ${quizTitle} Quiz`,
//             html: `
//               <html>
//                 <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
//                   <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//                     <h2 style="color: #007bff;">Thank You for Attempting the ${quizTitle} Quiz!</h2>
//                     <p>Below are your results:</p>
//                     <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//                       <tr style="background-color: #f9f9f9;">
//                         <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Category</th>
//                         <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Marks</th>
//                       </tr>
//                       <tr>
//                         <td style="padding: 10px; border-bottom: 1px solid #ddd;">Technical Skills</td>
//                         <td style="padding: 10px; border-bottom: 1px solid #ddd;">${results.technical}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 10px; border-bottom: 1px solid #ddd;">Human Skills</td>
//                         <td style="padding: 10px; border-bottom: 1px solid #ddd;">${results.human}</td>
//                       </tr>
//                       <tr>
//                         <td style="padding: 10px; border-bottom: 1px solid #ddd;">Conceptual Skills</td>
//                         <td style="padding: 10px;">${results.conceptual}</td>
//                       </tr>
//                     </table>
//                     <p style="margin-top: 20px;">Thank you for participating in our quiz. We hope you found it insightful.</p>
//                     <p>Best Regards,<br>Samvit Shikshan Private Limited</p>
//                   </div>
//                 </body>
//               </html>
//             `,
//             attachments: [
//                 {
//                     filename: 'test-result.pdf',
//                     content: pdfBuffer,
//                     contentType: 'application/pdf',
//                 },
//             ],
//         };

//         // Send email with results and PDF
//         await transporter.sendMail(mailOptions);
//         res.status(200).send('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Failed to send email');
//     }
// });

// ye sahi hai bilkul send result upr jo code lik ra vo pdf se realted lik ra
app.post('/sendResults', async (req, res) => {
    // console.log("tututututuu")
    const { email, quizTitle, results } = req.body;
  
  
    if (!email || !quizTitle || !results) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // console.log(email);
    // console.log(quizTitle);
    // console.log(results);
  
    // const mailOptions = {
    //   from: 'aayusharma90009@gmail.com',
    //   to: email,
    // //   to: "aayusharma90009@gmail.com",
    //   subject: `Your Results for ${quizTitle} Quiz`,
    //   text: `
    //     Thank you for attempting the ${quizTitle} quiz.
    //     Below is your score for this quiz:
  
    //     Technical Skills Marks: ${results.technical}
    //     Human Skills Marks: ${results.human}
    //     Conceptual Skills Marks: ${results.conceptual}
  
    //     Thank you,
    //     Team Samvit
    //   `,
    // };
    const mailOptions = {
        from: 'aayusharma90009@gmail.com',
        to: email,
        subject: `Your Results for ${quizTitle} Quiz`,
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
              <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="color: #007bff;">Thank You for Attempting the ${quizTitle} Quiz!</h2>
                <p>Below are your results:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr style="background-color: #f9f9f9;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Category</th>
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Marks</th>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Technical Skills</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${results.technical}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Human Skills</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${results.human}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">Conceptual Skills</td>
                    <td style="padding: 10px;">${results.conceptual}</td>
                  </tr>
                </table>
                <p style="margin-top: 20px;">Thank you for participating in our quiz. We hope you found it insightful.</p>
                <p>Best Regards,<br>Samvit Shikshan Private Limited</p>
              </div>
            </body>
          </html>
        `,
      };
      
    //  console.log(mailOptions);
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      res.status(500).send('Failed to send email');
    }


  });
  
  
// 1. Create a new quiz
app.post('/quiz', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const quiz = new Quiz({ title });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// // 2. Add questions to a quiz
// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const questions = req.body; // Assuming it's an array of questions

//         if (!Array.isArray(questions) || questions.length === 0) {
//             return res.status(400).json({ message: 'Invalid request: An array of questions is required.' });
//         }

//         // Find the quiz by ID
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // Iterate over each question and save it
//         const questionIds = [];
//         for (const questionData of questions) {
//             const { questionText, options, category } = questionData;

//             if (!questionText || !options || options.length === 0 || !category) {
//                 return res.status(400).json({ message: 'Each question must have text, options, and a category.' });
//             }

//             // Create and save the question
//             const question = new Question({
//                 questionText,
//                 options,
//                 category
//             });
//             await question.save();

//             // Push the question ID into the quiz
//             quiz.questions.push(question._id);
//             questionIds.push(question._id);
//         }

//         // Save the quiz with the new questions
//         await quiz.save();

//         res.status(201).json({ message: 'Questions added successfully', questionIds });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 2. Add a question to a quiz
// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const questionData = req.body; // Expect a single question object

//         if (!questionData || !questionData.questionText || !questionData.options || questionData.options.length === 0 || !questionData.category) {
//             return res.status(400).json({ message: 'Invalid request: Question must have text, options, and a category.' });
//         }

//         // Find the quiz by ID
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // Create and save the question
//         const question = new Question(questionData);
//         await question.save();

//         // Push the question ID into the quiz
//         quiz.questions.push(question._id);

//         // Save the quiz with the new question
//         await quiz.save();

//         res.status(201).json({ message: 'Question added successfully', questionId: question._id });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         console.log('Received quizId:', quizId); // Debugging log
//         if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
//             return res.status(400).json({ message: 'Invalid quiz ID' });
//         }

//         const questionData = req.body;
//         console.log('Received questionData:', questionData); // Debugging log

//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         const question = new Question(questionData);
//         await question.save();

//         quiz.questions.push(question._id);
//         await quiz.save();

//         res.status(201).json({ message: 'Question added successfully', questionId: question._id });
//     } catch (error) {
//         console.error('Error adding question:', error); // Debugging log
//         res.status(500).json({ message: error.message });
//     }
// });

// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         // console.log("ID being passed:", id); // Add this line to debug
//         const { quizId } = req.params;
//         console.log('Received quizId:', quizId); // Debugging log
        
//         // Check if quizId is valid
//         if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
//             console.error('Invalid quiz ID received:', quizId); // More detailed error log
//             return res.status(400).json({ message: 'Invalid quiz ID' });
//         }

//         const questionsData = req.body; // Assuming this is an array of questions
//         console.log('Received questionsData:', questionsData); // Debugging log

//         if (!Array.isArray(questionsData) || questionsData.length === 0) {
//             return res.status(400).json({ message: 'Invalid request: An array of questions is required.' });
//         }

//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // Save each question and update the quiz
//         const questionIds = [];
//         for (const questionData of questionsData) {
//             const { questionText, options, category } = questionData;

//             if (!questionText || !options || options.length === 0 || !category) {
//                 return res.status(400).json({ message: 'Each question must have text, options, and a category.' });
//             }

//             const question = new Question({
//                 questionText,
//                 options,
//                 category
//             });
//             await question.save();

//             quiz.questions.push(question._id);
//             questionIds.push(question._id);
//         }

//         await quiz.save();

//         res.status(201).json({ message: 'Questions added successfully', questionIds });
//     } catch (error) {
//         console.error('Error adding question:', error); // Debugging log
//         res.status(500).json({ message: error.message });
//     }
// });


app.post('/quiz/:quizId/questions', async (req, res) => {
    try {
        // console.log("ID being passed:", id);
        const { quizId } = req.params;
        console.log('Received quizId:', quizId); // Debugging log
        
        if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
            console.error('Invalid quiz ID received:', quizId); // More detailed error log
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }

        const questionData = req.body; // Expecting a single question object
        console.log('Received questionData:', questionData); // Debugging log

        const { questionText, options, category } = questionData;

        if (!questionText || !options || options.length === 0 || !category) {
            return res.status(400).json({ message: 'Each question must have text, options, and a category.' });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        const question = new Question({
            questionText,
            options,
            category
        });
        await question.save();

        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).json({ message: 'Question added successfully', questionId: question._id });
    } catch (error) {
        console.error('Error adding question:', error); // Debugging log
        res.status(500).json({ message: error.message });
    }
});

// Get quiz details for a specific quiz
app.get('/quiz/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit answers for a specific quiz
// app.post('/quiz/:quizId/submit', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, answers } = req.body;


//         // console.log(quizId);
//         // console.log(userId);
//         // console.log(answers);

//         // Validate answers array
//         if (!Array.isArray(answers) || answers.length === 0) {
//             console.log("No answers provided");
//             return res.status(400).json({ message: 'No answers provided' });
//         }

//         // Save each answer
//         const answerPromises = answers.map(async (answer) => {
//             const { questionId, selectedOption } = answer;

//             // Find the question to get the correct option and marks
//             const question = await Question.findById(questionId);
//             console.log("minto");
//             console.log(question);
//             if (!question) {
//                 throw new Error(`Question with ID ${questionId} not found`);
//             }

//             const selectedOptionData = question.options[selectedOption];
//             if (!selectedOptionData) {
//                 throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
//             }

//             // Create a new answer entry
//             const userAnswer = new Answer({
//                 userId,
//                 quizId,
//                 questionId,
//                 selectedOption,
//                 marksObtained: selectedOptionData.marks,
//                 category: question.category
//             });

//             return userAnswer.save();
//         });

//         const savedAnswers = await Promise.all(answerPromises);

//         // Generate report with both userId and quizId
//         const report = await generateReport(userId, quizId);

//         res.status(201).json({
//             message: 'Answers submitted successfully',
//             savedAnswers,
//             report
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
app.post('/quiz/:quizId/submit', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { userId, answers } = req.body;

        // Validate answers array
        if (!Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ message: 'No answers provided' });
        }

        // Save each answer
        const answerPromises = answers.map(async (answer) => {
            const { questionId, selectedOption } = answer;

            // Check if the questionId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(questionId)) {
                throw new Error(`Invalid Question ID ${questionId}`);
            }

            // Find the question to get the correct option and marks
            const question = await Question.findById(questionId);
            if (!question) {
                throw new Error(`Question with ID ${questionId} not found`);
            }

            // Validate selectedOption index
            if (selectedOption < 0 || selectedOption >= question.options.length) {
                throw new Error(`Invalid selectedOption ${selectedOption} for question ${questionId}`);
            }

            const selectedOptionData = question.options[selectedOption];

            // Create a new answer entry
            const userAnswer = new Answer({
                userId,
                quizId,
                questionId,
                selectedOption,
                marksObtained: selectedOptionData.marks,
                category: question.category,
            });

            return userAnswer.save();
        });

        const savedAnswers = await Promise.all(answerPromises);

        // Generate report with both userId and quizId
        const report = await generateReport(userId, quizId);

        res.status(201).json({
            message: 'Answers submitted successfully',
            savedAnswers,
            report,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// delete a quiz by particular id
// Delete a quiz by ID
app.delete('/quiz/:quizId', async (req, res) => {
    try {
        const { quizId } = req.params;

        // Validate quizId
        if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid quiz ID'
            });
        }

        // Find and delete the quiz
        const quiz = await Quiz.findByIdAndDelete(quizId);
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        // Optionally: Delete all associated questions
        await Question.deleteMany({ _id: { $in: quiz.questions } });

        return res.status(200).json({
            success: true,
            message: 'Quiz and associated questions deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});



// Helper function to generate the report
const generateReport = async (userId, quizId) => {
    try {
        const results = await Answer.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId), quizId: mongoose.Types.ObjectId(quizId) } },
            { $group: { _id: "$category", totalScore: { $sum: "$marksObtained" } } }
        ]);

        const report = {};
        results.forEach(result => {
            if (result._id) {
                report[result._id] = result.totalScore;
            } else {
                report['Uncategorized'] = (report['Uncategorized'] || 0) + result.totalScore;
            }
        });

        return report;
    } catch (error) {
        throw new Error('Error generating report: ' + error.message);
    }
};

// Get user's answers for a specific quiz
app.get('/quiz/:quizId/answers/:userId', async (req, res) => {
    try {
        const { quizId, userId } = req.params;
        const answers = await Answer.find({ quizId, userId }).populate('questionId');
        if (!answers) {
            return res.status(404).json({ message: 'No answers found' });
        }
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Get all quizzes
app.get('/quiz', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Submit an answer
app.post('/quiz/:quizId/answer', async (req, res) => {
    try {
        const { quizId } = req.params;
        const { userId, questionId, selectedOptionIndex } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const selectedOption = question.options[selectedOptionIndex];
        if (!selectedOption) {
            return res.status(400).json({ message: 'Invalid option selected' });
        }

        const answer = new Answer({
            userId,
            quizId,
            questionId,
            selectedOption: selectedOptionIndex,
            marksObtained: selectedOption.marks
        });
        await answer.save();

        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/// Admin Reports Route
app.get('/admin/reports', async (req, res) => {
    try {
        // Use aggregation to get unique quizId and userId pairs from Answer model
        const attempts = await Answer.aggregate([
            {
                $group: {
                    _id: { quizId: "$quizId", userId: "$userId" }
                }
            }
        ]);

        console.log(attempts);

        // Prepare the report for each user and their quiz
        const reports = await Promise.all(
            attempts.map(async (attempt) => {
                const { userId, quizId } = attempt._id;

                // Generate the report for technical, conceptual, human skills using the generateReport function
                const report = await generateReport(userId, quizId);

                // Fetch the user's info (name, phone number, and email)
                const user = await User.findById(userId);

                // Fetch the quiz title
                const quiz = await Quiz.findById(quizId);

                // If user or quiz is not found, skip this entry
                if (!user || !quiz) return null;

                return {
                    userName: user.name,
                    userPhone: user.PhoneNumber,  // Fetch user's phone number
                    userEmail: user.email,        // Fetch user's email
                    quizTitle: quiz.title,
                    report // This will include scores for Technical, Conceptual, and Human skills
                };
            })
        );

        // Filter out any null results in case a user or quiz wasn't found
        const filteredReports = reports.filter(report => report !== null);

        return res.status(200).json({
            success: true,
            data: filteredReports
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Import the models
// const Question = require('./models/Question');
// const Quiz = require('./models/Quiz');
// const Answer = require('./models/Answer');
// const userRoute = require("./routes/userRoutes");
// const emailRoute = require("./routes/emailRoutes"); // Import the email routes

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors()); // Enabling CORS for all routes
// app.use(bodyParser.json());
// app.use(express.json());

// app.use("/api/users", userRoute);
// app.use("/api/email", emailRoute); // Use the email routes

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/quizdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('MongoDB connection error:', err);
// });

// // Routes

// app.post('/quiz', async (req, res) => {
//     try {
//         const { title } = req.body;
//         if (!title) {
//             return res.status(400).json({ message: 'Title is required' });
//         }
//         const quiz = new Quiz({ title });
//         await quiz.save();
//         res.status(201).json(quiz);
//     } catch (error) {
//         console.error('Error creating quiz:', error);
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// });

// app.post('/quiz/:quizId/questions', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         console.log('Received quizId:', quizId); // Debugging log
        
//         if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
//             console.error('Invalid quiz ID received:', quizId); // More detailed error log
//             return res.status(400).json({ message: 'Invalid quiz ID' });
//         }

//         const questionData = req.body; // Expecting a single question object
//         console.log('Received questionData:', questionData); // Debugging log

//         const { questionText, options, category } = questionData;

//         if (!questionText || !options || options.length === 0 || !category) {
//             return res.status(400).json({ message: 'Each question must have text, options, and a category.' });
//         }

//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         const question = new Question({
//             questionText,
//             options,
//             category
//         });
//         await question.save();

//         quiz.questions.push(question._id);
//         await quiz.save();

//         res.status(201).json({ message: 'Question added successfully', questionId: question._id });
//     } catch (error) {
//         console.error('Error adding question:', error); // Debugging log
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get('/quiz/:quizId', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const quiz = await Quiz.findById(quizId).populate('questions');
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.status(200).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.post('/quiz/:quizId/submit', async (req, res) => {
//     try {
//         const { quizId } = req.params;
//         const { userId, answers } = req.body;

//         // Validate answers array
//         if (!Array.isArray(answers) || answers.length === 0) {
//             return res.status(400).json({ message: 'No answers provided' });
//         }

//         // Save each answer
//         const answerPromises = answers.map(async (answer) => {
//             const { questionId, selectedOption } = answer;

//             // Check if the questionId is a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(questionId)) {
//                 throw new Error(`Invalid Question ID ${questionId}`);
//             }

//             // Find the question to get the correct option and marks
//             const question = await Question.findById(questionId);
//             if (!question) {
//                 throw new Error(`Question with ID ${questionId} not found`);
//             }

//             // Validate selectedOption index
//             if (selectedOption < 0 || selectedOption >= question.options.length) {
//                 throw new Error(`Invalid selectedOption ${selectedOption} for question ${questionId}`);
//             }

//             const selectedOptionData = question.options[selectedOption];

//             // Create a new answer entry
//             const userAnswer = new Answer({
//                 userId,
//                 quizId,
//                 questionId,
//                 selectedOption,
//                 marksObtained: selectedOptionData.marks,
//                 category: question.category,
//             });

//             return userAnswer.save();
//         });

//         const savedAnswers = await Promise.all(answerPromises);

//         // Generate report with both userId and quizId
//         const report = await generateReport(userId, quizId);

//         res.status(201).json({
//             message: 'Answers submitted successfully',
//             savedAnswers,
//             report,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.delete('/quiz/:quizId', async (req, res) => {
//     try {
//         const { quizId } = req.params;

//         // Validate quizId
//         if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid quiz ID'
//             });
//         }

//         // Find and delete the quiz
//         const quiz = await Quiz.findByIdAndDelete(quizId);
//         if (!quiz) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Quiz not found'
//             });
//         }

//         // Optionally: Delete all associated questions
//         await Question.deleteMany({ _id: { $in: quiz.questions } });

//         return res.status(200).json({
//             success: true,
//             message: 'Quiz and associated questions deleted successfully'
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error',
//             error: error.message
//         });
//     }
// });

// const generateReport = async (userId, quizId) => {
//     try {
//         const results = await Answer.aggregate([
//             { $match: { userId: mongoose.Types.ObjectId(userId), quizId: mongoose.Types.ObjectId(quizId) } },
//             { $group: { _id: "$category", totalScore: { $sum: "$marksObtained" } } }
//         ]);

//         const report = {};
//         results.forEach(result => {
//             if (result._id) {
//                 report[result._id] = result.totalScore;
//             } else {
//                 report['Uncategorized'] = (report['Uncategorized'] || 0) + result.totalScore;
//             }
//         });

//         return report;
//     } catch (error) {
//         throw new Error('Error generating report: ' + error.message);
//     }
// };

// app.get('/quiz/:quizId/answers/:userId', async (req, res) => {
//     try {
//         const { quizId, userId } = req.params;
//         const answers = await Answer.find({ quizId, userId }).populate('questionId');
//         if (!answers) {
//             return res.status(404).json({ message: 'No answers found' });
//         }
//         res.status(200).json(answers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });





//     "66dee150b7f677b769c6ed1a",
//     "66dee150b7f677b769c6ed21",
//     "66dee150b7f677b769c6ed28",
//     "66dee150b7f677b769c6ed2f",
//     "66dee150b7f677b769c6ed36"






































































































