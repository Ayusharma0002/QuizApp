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
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing CORS

// Import the models
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const Answer = require('./models/Answer');
const userRoute = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enabling CORS for all routes
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/users", userRoute);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes

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

            // Find the question to get the correct option and marks
            const question = await Question.findById(questionId);
            if (!question) {
                throw new Error(`Question with ID ${questionId} not found`);
            }

            const selectedOptionData = question.options[selectedOption];
            if (!selectedOptionData) {
                throw new Error(`Option with index ${selectedOption} not found for question ${questionId}`);
            }

            // Create a new answer entry
            const userAnswer = new Answer({
                userId,
                quizId,
                questionId,
                selectedOption,
                marksObtained: selectedOptionData.marks,
                category: question.category
            });

            return userAnswer.save();
        });

        const savedAnswers = await Promise.all(answerPromises);

        // Generate report with both userId and quizId
        const report = await generateReport(userId, quizId);

        res.status(201).json({
            message: 'Answers submitted successfully',
            savedAnswers,
            report
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




//     "66dee150b7f677b769c6ed1a",
//     "66dee150b7f677b769c6ed21",
//     "66dee150b7f677b769c6ed28",
//     "66dee150b7f677b769c6ed2f",
//     "66dee150b7f677b769c6ed36"