// const mongoose = require('mongoose');

// const optionSchema = new mongoose.Schema({
//     text: { type: String, required: true },
//     marks: { type: Number, required: true }

// });



// const questionSchema = new mongoose.Schema({
//     questionText: { type: String, required: true },
//     options: [optionSchema]
// });

// module.exports = mongoose.model('Question', questionSchema);















// 4:10 tak 13-10-24 tak chalya uske bad ni use kara ise
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    marks: { type: Number, required: true }
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [optionSchema],
    category: {
        type: String,
        enum: ['Technical Skills', 'Human Skills', 'Conceptual Skills'],
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);









// "66e0016a4c0083feeddef59c",
// "66e0016a4c0083feeddef5a2",
// "66e0016a4c0083feeddef5a8",
// "66e0016a4c0083feeddef5ae",
// "66e0016a4c0083feeddef5b4"