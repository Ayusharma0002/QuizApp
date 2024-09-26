import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../../apicalls/exams';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Instructions from './Instructions';
import { message } from 'antd';
import axios from 'axios';
import ReportBarGraph from './ReportBarGraph';
function WriteExam() {
  const [examData, setExamData] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState('instructions');
  const { user } = useSelector(state => state.users);
  const navigate = useNavigate();
  const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });

  const optionLabels = [
    'Not True',
    'Seldom True',
    'Occasionally True',
    'Somewhat True',
    'Very True',
  ];

  const getExamDataById = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById(id);
      dispatch(HideLoading());

      if (response) {
        setExamData(response);
        setQuestions(response.questions);
      } else {
        message.error('Failed to load exam data.');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error('An error occurred while fetching exam data.');
    }
  };

  useEffect(() => {
    if (id) {
      getExamDataById(id);
    }
  }, [id]);

  const calculateResult = () => {
    const categoryScores = {
      technical: 0,
      human: 0,
      conceptual: 0,
    };

    questions.forEach((question, index) => {
      const selectedOption = selectedOptions[index];
      if (selectedOption !== undefined) {
        switch (question.category) {
          case 'Technical Skills':
            categoryScores.technical += question.options[selectedOption].marks;
            break;
          case 'Human Skills':
            categoryScores.human += question.options[selectedOption].marks;
            break;
          case 'Conceptual Skills':
            categoryScores.conceptual += question.options[selectedOption].marks;
            break;
          default:
            break;
        }
      }
    });

    setResult(categoryScores);
    setView("result");
  };

  const submitQuiz = async () => {
    // Constructing answers in the correct format
    const answers = Object.keys(selectedOptions).map((questionIndex) => ({
      questionId: questions[questionIndex]._id, // Correct question ID
      selectedOption: selectedOptions[questionIndex], // Selected option index (not label)
    }));

    try {
      dispatch(ShowLoading());

      // Submitting quiz answers
      const response = await axios.post(`/quiz/${id}/submit`, {
        userId: user._id, // Ensure this is sent correctly
        answers, // Send the formatted answers array
      });

      if (response) {
        // Calculate results after successful submission
        calculateResult();

        // Hide loading, as email will be sent after result calculation
        dispatch(HideLoading());
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      dispatch(HideLoading());
      message.error('Failed to submit quiz');
    }
  };

  useEffect(() => {
    if (view === 'result') {
      const sendEmailWithResults = async () => {
        try {
          const emailResponse = await axios.post(`http://localhost:3000/sendResults`, {
            email: user.email, // User's email
            quizTitle: examData.title, // Quiz title
            results: result, // Correct result object to send
          });

          console.log('Email sent successfully:', emailResponse.data); // Debugging response
        } catch (error) {
          console.error('Error sending email:', error); // Improved error logging
        }
      };

      // Send email with results after view switches to "result"
      // sendEmailWithResults();
    }
  }, [view, result, examData, user.email]);


  return (
    examData && (
      <div className='mt-2'>
        <div className='divider'></div>
        <h1 className='text-center'>{examData?.title}</h1>
        <div className='divider'></div>

        {view === 'instructions' && (
          <Instructions
            examData={examData}
            setExamData={setExamData}
            view={view}
            setView={setView}
          />
        )}

        {/* {view === 'questions' && questions.length > 0 && (
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex justify-between'>
              <h1 className='text-2xl'>
                {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
              </h1>
            </div>

            <div className='flex flex-col gap-2'>
              {questions[selectedQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
                  onClick={() => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [selectedQuestionIndex]: index, // Store the index directly
                    });
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <h1 className='text-xl'>
                    {optionLabels[index]} 
                  </h1>
                </div>
              ))}
            </div>

            <div className='flex justify-between'>
              {selectedQuestionIndex > 0 && (
                <button
                  className='primary-outlined-btn'
                  onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className='primary-contained-btn'
                  onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
                >
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className='primary-contained-btn'
                  onClick={submitQuiz}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )} */}


        {view === 'questions' && questions.length > 0 && (
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex justify-between'>
              <h1 className='text-2xl'>
                {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
              </h1>
            </div>

            <div className='flex flex-col justify-between gap-2'>
              {questions[selectedQuestionIndex].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
                  style={{
                    cursor: 'pointer',
                    color: selectedOptions[selectedQuestionIndex] === index ? 'green' : 'inherit',
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${selectedQuestionIndex}`}
                    value={index}
                    checked={selectedOptions[selectedQuestionIndex] === index}
                    onChange={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: index,
                      });
                    }}
                    style={{ accentColor: 'green', width: '20px' }}
                  />
                  <span className='text-xl'>
                    {optionLabels[index]}
                  </span>
                </label>
              ))}
            </div>

            <div className='flex justify-between'>
              {selectedQuestionIndex > 0 && (
                <button
                  className='primary-outlined-btn'
                  onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className='primary-contained-btn'
                  onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
                >
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className='primary-contained-btn'
                  onClick={submitQuiz}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}


        {view === "result" && (
          <div className='flex justify-center mt-2 gap-2'>
            <div className='flex flex-col gap-2 result'>
              <h1 className='text-2xl'>Result</h1>
              {/* <div className='marks'>
                <h1 className='text-md'>Technical Skills Marks: {result.technical}</h1>
                <h1 className='text-md'>Human Skills Marks: {result.human}</h1>
                <h1 className='text-md'>Conceptual Skills Marks: {result.conceptual}</h1>
              </div> */}
              <div>
                <ReportBarGraph result={result} />
              </div>
              <div className='flex justify-center items-center gap-2'>
                {/* <button
                  className='primary-outlined-btn'
                  onClick={() => {
                    setView('instructions');
                    setSelectedQuestionIndex(0);
                    setSelectedOptions({});
                  }}
                >
                  Retake Exam
                </button> */}
                <button
                  className='secondary-contained-btn'
                  onClick={() => navigate('/')}
                >
                  Close
                </button>
                <a href='/report.pdf' download>
                  <button className='primary-contained-btn'>
                    Download Complete Report
                  </button>
                </a>
              </div>
              {/* <div className="lottie-animation mt-6">
                <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_uu0x8lqv.json" background="transparent" speed="1" loop autoplay></lottie-player>
              </div> */}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
