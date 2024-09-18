// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
//     totalMarks: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('Quiz', quizSchema);
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    totalMarks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Quiz', quizSchema);
