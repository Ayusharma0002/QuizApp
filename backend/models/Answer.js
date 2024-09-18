// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
//     questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     selectedOption: { type: Number, required: true },
//     marksObtained: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('Answer', answerSchema);
// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//     userId: { type: String, required: true },  // Change this to String
//     quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
//     questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     selectedOption: { type: Number, required: true },
//     marksObtained: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('Answer', answerSchema);
// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
//     questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     selectedOption: { type: Number, required: true },
//     marksObtained: { type: Number, default: 0 } // Optional: for storing calculated marks
// });

// module.exports = mongoose.model('Answer', answerSchema);









// const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
//     questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     selectedOption: { type: Number, required: true },
//     marksObtained: { type: Number, default: 0 }, // For storing calculated marks
//     category: { type: String, required: true } // Adding category to track the question category
// });

// module.exports = mongoose.model('Answer', answerSchema);





const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: Number, required: true },
    marksObtained: { type: Number, default: 0 }, // For storing calculated marks
    category: { type: String, enum: ['Technical Skills', 'Human Skills', 'Conceptual Skills'], required: true } // Adding category to track the question category
});

module.exports = mongoose.model('Answer', answerSchema);
