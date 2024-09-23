// import React, {useState, useEffect} from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { getExamById } from '../../../apicalls/exams'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
// import { message } from 'antd'
// import Instructions from './Instructions'
// import { addReport } from '../../../apicalls/reports'
// import { useSelector } from 'react-redux'

// function WriteExam() {
//   const [examData, setExamData] = useState()
//   const [questions, setQuestions] = useState([])
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0)
//   const [selectedOptions, setSelectedOptions] = useState({})
//   const [result, setResult] = useState()
//   const {id} = useParams()
//   const dispatch = useDispatch()
//   const [view, setView] = useState("instructions")
//   const [secondsLeft,setSecondsLeft] = useState(0)
//   const [timeUp, setTimeUp] = useState(false)
//   const [intervalId, setIntervalId] = useState(null);
//   const {user} = useSelector(state=>state.users)
//   const navigate = useNavigate();
// //   const getExamDataById = async(id) => {
// //     try{
// //        dispatch(ShowLoading())
// //        const response = await getExamById(id)

// //        console.log(response); // Debug check
// //        dispatch(HideLoading())
// //       //  if(response.success){
// //        if(response){
// //           // message.success(response.message)
// //           console.log("Write exam page ka hoon mai ")
// //         console.log(response); // Debug check
// //           setExamData(response.data)
// //           setQuestions(response.data.questions)
// //           setSecondsLeft(response.data.duration)
// //        }
// //        else{
// //         console.log("Write exam page ki error hoon mai ");
// //           message.error(response.message)
// //        }
// //     }
// //     catch(error){
// //        dispatch(HideLoading())
// //        console.log("Write exam page ki khntk error hoon mai ");
// //        message.error(error.message)
// //     }
// // }
// const getExamDataById = async (id) => {
//   try {
//     dispatch(ShowLoading());
    
//     // Making API call
    
//     const response = await getExamById(id);
//     console.log("yooym");
//     console.log(response); // Log the response for debugging
    
//     dispatch(HideLoading());
    
//     // Check if the response contains the expected data structure
//     if (response) {
//       console.log("Exam data fetched successfully");
//       setExamData(response);  // Set the exam data
//       setQuestions(response.questions);  // Set the questions from the response
//       // setSecondsLeft(response.data.duration);  // Set the exam duration
//     } else {
//       console.log("Exam data not found or incorrect response structure");
//       message.error("Failed to load exam data.");
//     }
//   } catch (error) {
//     dispatch(HideLoading());
    
//     // Log the error details for better understanding
//     console.error("Error fetching exam data:", error);
//     message.error("An error occurred while fetching exam data.");
//   }
// };

// const calculateResult = async() => {
//     try{
//     let correctAnswers = [];
//     let wrongAnswers = [];

//     questions.forEach((question,index)=>{
//       if(question.correctOption===selectedOptions[index]){
//         correctAnswers.push(question);
//       }
//       else{
//         wrongAnswers.push(question);
//       }
//     })
//     let verdict = "Pass";
//     if(correctAnswers.length<examData.passingMarks){
//       verdict = "Fail";
//     }
//     const tempResult = {
//       correctAnswers,
//       wrongAnswers,
//       verdict,
//     }
//     setResult(tempResult)
//     dispatch(ShowLoading())
//     const response = await addReport({
//       exam: id,
//       result: tempResult,
//       user: user._id 
//     })
//     dispatch(HideLoading())
//     if(response.success){
//       setView("result"); 
//     }
//     else{
//       message.error(response.message)
//     }
//   }
//   catch(error){
//     dispatch(HideLoading())
//     message.error(error.message)
//   }
// }
// const startTimer = () => {
//    let totalSeconds = examData.duration;
//    const intervalId = setInterval(()=>{
//       if(totalSeconds>0){
//         totalSeconds=totalSeconds-1;
//         setSecondsLeft(totalSeconds)
//       }
//       else{
//         setTimeUp(true);
//       }
//    }, 1000);
//    setIntervalId(intervalId)
// }
// useEffect(()=>{
//   if(timeUp&&view==="questions"){
//     clearInterval(intervalId)
//     calculateResult(); 
//   }
// },[timeUp])
// useEffect(()=>{
//   if(id){
//     getExamDataById(id)
//   }
// },[])
//   return (
//    examData && (
//     <div className='mt-2'>
//     <div className='divider'></div>
//     <h1 className='text-center'>{examData.name}</h1>
//     <div className='divider'></div>
//     {view==="instructions"&&<Instructions examData={examData} setExamData={setExamData}
//     view={view}
//     setView={setView}
//     startTimer={startTimer}
//     />}
//     {(view==="questions"&&questions!==[])&&<div className='flex flex-col gap-2 mt-2'>
//      <div className='flex justify-between'>
//      <h1 className='text-2xl'>
//        {selectedQuestionIndex+1} : {questions[selectedQuestionIndex].name}
//      </h1>
//      <div className='timer'>
//       <span className='text-2xl'>{secondsLeft}</span>
//      </div>
//      </div>
//      <div className='flex flex-col gap-2'>
//       {Object.keys(questions[selectedQuestionIndex].options).map((option, index)=>{
//         return <div className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === option ? "selected-option" : "option" }`}
//         key={index}
//         onClick={()=>{
//           setSelectedOptions({...selectedOptions,[selectedQuestionIndex]: option})
//           console.log(selectedOptions)
//         }}
//         >
//             <h1 className='text-xl'>
//               {option} : {questions[selectedQuestionIndex].options[option]}
//             </h1>
//         </div>
//       })}
//      </div>
//      <div className='flex justify-between'>
//      {selectedQuestionIndex>0&&<button className='primary-outlined-btn'
//       onClick={()=>{
//           setSelectedQuestionIndex(selectedQuestionIndex-1)
//       }}
//       >
//        Previous
//       </button>}
//       {selectedQuestionIndex<questions.length-1&&<button className='primary-contained-btn'
//       onClick={()=>{
//           setSelectedQuestionIndex(selectedQuestionIndex+1)
//       }}
//       >
//        Next
//       </button>}
//       {selectedQuestionIndex===questions.length-1&&<button className='primary-contained-btn'
//       onClick={()=>{
//         clearInterval(intervalId)
//           setTimeUp(true)
//       }}
//       >
//        Submit
//       </button>}
//      </div>
//     </div>}
//     {view==="result"&&<div className='flex justify-center mt-2 gap-2'>
//       <div className='flex flex-col gap-2 result'>
//       <h1 className='text-2xl'>
//         Result
//       </h1>
//       <div className='marks'>
//         <h1 className='text-md'>
//            Total Marks : {examData.totalMarks}
//         </h1>
//         <h1 className='text-md'>
//            Passing Marks : {examData.passingMarks}
//         </h1>
//         <h1 className='text-md'>
//             Obtained Marks : {result.correctAnswers.length}
//         </h1>
//         <h1 className='text-md'>
//             Wrong Answers : {result.wrongAnswers.length}
//         </h1>
//         <h1 className='text-md'>
//             Verdict : {result.verdict}
//         </h1>
//         <div className='flex gap-2 mt-2'>
//           <button className='primary-outlined-btn'
//           onClick={()=>{
//             setView("instructions")
//             setSelectedQuestionIndex(0);
//             setSelectedOptions({});
//             setTimeUp(false);
//             setSecondsLeft(examData.duration)
//           }}
//           >
//           Retake Exam
//           </button>
//           <button className='primary-contained-btn' onClick={()=>{
//             setView("review");
//           }}>
//             Review Answers
//           </button>
//         </div>
//       </div>
//       </div>
//       <div className="lottie-animation">
//       {result.verdict==="Pass" && <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_uu0x8lqv.json"  background="transparent"  speed="1" loop autoplay></lottie-player>}
//       {result.verdict==="Fail"&&<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"  background="transparent" speed="1" loop autoplay></lottie-player>}
//       </div>
//     </div>}
//     {view==="review"&&<div className='flex flex-col gap-2'> 
//        {questions.map((question,index)=>{
//           const isCorrect = question.correctOption === selectedOptions[index]
//           return <div className={`flex flex-col gap-1 p-2 card ${isCorrect? "bg-success" : "bg-warning"}`}>
//             <h1 className='text-xl'>{index+1} : {question.name}</h1>
//             <h1 className='text-md'>Submitted Answer : {selectedOptions[index]} : {question.options[selectedOptions[index]]}</h1>
//             <h1 className='text-md'>Correct Answer : {question.correctOption} : {question.options[question.correctOption]}</h1>
//           </div>
//        })}
//        <div className='flex justify-center gap-2'>
//        <button className='primary-outlined-btn'
//           onClick={()=>{
//             setView("instructions")
//             setSelectedQuestionIndex(0);
//             setSelectedOptions({});
//             setTimeUp(false);
//             setSecondsLeft(examData.duration);
//           }}
//           >
//           Retake Exam
//           </button>
//           <button className='primary-contained-btn' onClick={()=>{
//             navigate("/")
//           }}>
//             Close
//           </button>
//        </div>
//     </div>}
//     </div>
//    )
//   )
// }

// export default WriteExam


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';
// // import { submitQuiz } from '../../../apicalls/reports';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [result, setResult] = useState();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState("instructions");
//   const [secondsLeft, setSecondsLeft] = useState(0);
//   const [timeUp, setTimeUp] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();

//   // const getExamDataById = async (id) => {
//   //   try {
//   //     dispatch(ShowLoading());
//   //     const response = await getExamById(id);
//   //     dispatch(HideLoading());
//   //     if (response) {
//   //       setExamData(response.data);
//   //       setQuestions(response.data.questions);
//   //       setSecondsLeft(response.data.duration);
//   //     } else {
//   //       message.error(response.message);
//   //     }
//   //   } catch (error) {
//   //     dispatch(HideLoading());
//   //     message.error(error.message);
//   //   }
//   // };
//   const getExamDataById = async (id) => {
//   try {
//     dispatch(ShowLoading());
    
//     // Making API call
    
//     const response = await getExamById(id);
//     console.log("yooym");
//     console.log(response); // Log the response for debugging
    
//     dispatch(HideLoading());
    
//     // Check if the response contains the expected data structure
//     if (response) {
//       console.log("Exam data fetched successfully");
//       setExamData(response);  // Set the exam data
//       setQuestions(response.questions);  // Set the questions from the response
//       // setSecondsLeft(response.data.duration);  // Set the exam duration
//     } else {
//       console.log("Exam data not found or incorrect response structure");
//       message.error("Failed to load exam data.");
//     }
//   } catch (error) {
//     dispatch(HideLoading());
    
//     // Log the error details for better understanding
//     console.error("Error fetching exam data:", error);
//     message.error("An error occurred while fetching exam data.");
//   }
// };


//   const calculateResult = async () => {
//     try {
//       let technicalMarks = 0;
//       let humanSkillsMarks = 0;
//       let conceptualMarks = 0;

//       questions.forEach((question, index) => {
//         const selectedOption = selectedOptions[index];
//         const selectedOptionData = question.options[selectedOption];

//         if (question.category === "Technical Skills") {
//           technicalMarks += selectedOptionData.marks;
//         } else if (question.category === "Human Skills") {
//           humanSkillsMarks += selectedOptionData.marks;
//         } else if (question.category === "Conceptual Skills") {
//           conceptualMarks += selectedOptionData.marks;
//         }
//       });

//       const report = {
//         technicalMarks,
//         humanSkillsMarks,
//         conceptualMarks,
//       };
//       setResult(report);

//       dispatch(ShowLoading());
//       // const response = await submitQuiz({
//       //   exam: id,
//       //   userId: user._id,
//       //   answers: selectedOptions,
//       // });
//       dispatch(HideLoading());

//       if (response) {
//         setView("result");
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   const startTimer = () => {
//     let totalSeconds = examData.duration;
//     const intervalId = setInterval(() => {
//       if (totalSeconds > 0) {
//         totalSeconds = totalSeconds - 1;
//         setSecondsLeft(totalSeconds);
//       } else {
//         setTimeUp(true);
//       }
//     }, 1000);
//     setIntervalId(intervalId);
//   };

//   useEffect(() => {
//     if (timeUp && view === "questions") {
//       clearInterval(intervalId);
//       calculateResult();
//     }
//   }, [timeUp]);

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, []);

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>
//         {view === "instructions" && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//             startTimer={startTimer}
//           />
//         )}
//         {view === "questions" && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
//               </h1>
//               <div className='timer'>
//                 <span className='text-2xl'>{secondsLeft}</span>
//               </div>
//             </div>
//             <div className='flex flex-col gap-2'>
//               {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {
//                 return (
//                   <div
//                     className={`flex gap-2 items-center ${
//                       selectedOptions[selectedQuestionIndex] === option ? 'selected-option' : 'option'
//                     }`}
//                     key={index}
//                     onClick={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: option,
//                       });
//                     }}
//                   >
//                     <h1 className='text-xl'>
//                       {option} : {questions[selectedQuestionIndex].options[option].marks} marks
//                     </h1>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex - 1);
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex + 1);
//                   }}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     clearInterval(intervalId);
//                     setTimeUp(true);
//                   }}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//         {view === "result" && (
//           <div className='flex justify-center mt-2 gap-2'>
//             <div className='flex flex-col gap-2 result'>
//               <h1 className='text-2xl'>Result</h1>
//               <div className='marks'>
//                 <h1 className='text-md'>Technical Skills: {result.technicalMarks}</h1>
//                 <h1 className='text-md'>Human Skills: {result.humanSkillsMarks}</h1>
//                 <h1 className='text-md'>Conceptual Skills: {result.conceptualMarks}</h1>
//               </div>
//               <div className='flex gap-2 mt-2'>
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setView("instructions");
//                     setSelectedQuestionIndex(0);
//                     setSelectedOptions({});
//                     setTimeUp(false);
//                     setSecondsLeft(examData.duration);
//                   }}
//                 >
//                   Retake Exam
//                 </button>
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setView("review");
//                   }}
//                 >
//                   Review Answers
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState("instructions");
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();

//   // Fetch exam data by ID
//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());

//       // Making API call
//       const response = await getExamById(id);
//       console.log(response); // Log the response for debugging

//       dispatch(HideLoading());

//       // Check if the response contains the expected data structure
//       if (response) {
//         console.log("Exam data fetched successfully");
//         setExamData(response); // Set the exam data
//         setQuestions(response.questions); // Set the questions from the response
//       } else {
//         console.log("Exam data not found or incorrect response structure");
//         message.error("Failed to load exam data.");
//       }
//     } catch (error) {
//       dispatch(HideLoading());

//       // Log the error details for better understanding
//       console.error("Error fetching exam data:", error);
//       message.error("An error occurred while fetching exam data.");
//     }
//   };

//   // Removed timer and calculateResult logic as requested

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>
//         {view === "instructions" && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}
//         {view === "questions" && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
//               </h1>
//             </div>
//             <div className='flex flex-col gap-2'>
//               {Object.keys(questions[selectedQuestionIndex].options).map((option, index) => {
//                 return (
//                   <div
//                     className={`flex gap-2 items-center ${
//                       selectedOptions[selectedQuestionIndex] === option ? 'selected-option' : 'option'
//                     }`}
//                     key={index}
//                     onClick={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: option,
//                       });
//                     }}
//                   >
//                     <h1 className='text-xl'>
//                       {option} : {questions[selectedQuestionIndex].options[option].marks} marks
//                     </h1>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex - 1);
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex + 1);
//                   }}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     // Submit logic here, timer and result calculation removed as requested
//                     message.success("Quiz completed! (Result submission logic is commented out)");
//                   }}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;




// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState("instructions");
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();

//   // Fetch exam data by ID
//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         console.log("i am question section");
//         // console.log(response.questions);
        
//         const questionTexts = response.questions.map(question => question.questionText);
//         console.log("Questions:", questionTexts);
//         setQuestions(questionTexts);
//       } else {
//         message.error("Failed to load exam data.");
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error("An error occurred while fetching exam data.");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   const optionLabels = [
//     "Not True",
//     "Seldom True",
//     "Occasionally True",
//     "Somewhat True",
//     "Very True"
//   ];

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === "instructions" && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {view === "questions" && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].name}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {optionLabels.map((label, index) => {
//                 return (
//                   <div
//                     className={`flex gap-2 items-center ${
//                       selectedOptions[selectedQuestionIndex] === label ? 'selected-option' : 'option'
//                     }`}
//                     key={index}
//                     onClick={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: label,
//                       });
//                     }}
//                   >
//                     <h1 className='text-xl'>
//                       {label}
//                     </h1>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex - 1);
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex + 1);
//                   }}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     // Submit logic here, backend will handle the marks based on the selected options
//                     message.success("Quiz completed! (Submit logic will handle results)");
//                   }}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState("instructions");
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();

//   // Fetch exam data by ID
//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         console.log("i am question section");
//         // Set full questions array instead of just questionText
//         setQuestions(response.questions);
//       } else {
//         message.error("Failed to load exam data.");
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error("An error occurred while fetching exam data.");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   const optionLabels = [
//     "Not True",
//     "Seldom True",
//     "Occasionally True",
//     "Somewhat True",
//     "Very True"
//   ];

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === "instructions" && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {view === "questions" && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {optionLabels.map((label, index) => {
//                 return (
//                   <div
//                     className={`flex gap-2 items-center ${
//                       selectedOptions[selectedQuestionIndex] === label ? 'selected-option' : 'option'
//                     }`}
//                     key={index}
//                     onClick={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: label,
//                       });
//                     }}
//                   >
//                     <h1 className='text-xl'>
//                       {label}
//                     </h1>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex - 1);
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex + 1);
//                   }}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     // Submit logic here, backend will handle the marks based on the selected options
//                     message.success("Quiz completed! (Submit logic will handle results)");
//                   }}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;





















// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';
// import axios from 'axios';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState('instructions');
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();

//   const optionLabels = [
//     'Not True',
//     'Seldom True',
//     'Occasionally True',
//     'Somewhat True',
//     'Very True',
//   ];

//   // Fetch exam data by ID
//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         setQuestions(response.questions);
//       } else {
//         message.error('Failed to load exam data.');
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('An error occurred while fetching exam data.');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   // Function to handle quiz submission
//   // const submitQuiz = async () => {
//   //   const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//   //     questionId: questions[questionIndex]._id,
//   //     selectedOption: selectedOptions[questionIndex].label,
//   //   }));

//   //   try {
//   //     dispatch(ShowLoading());
//   //     console.log(id);
//   //     const response = await axios.post(`/quiz/${id}/submit`, {
//   //       userId: user._id,
//   //       answers,
//   //     });
//   //     console.log("submit quiz hoon mai");
//   //     console.log(response);
//   //     dispatch(HideLoading());

//   //     if (response.data) {
//   //       message.success('Quiz submitted successfully');
//   //       // Show the report (example logic, adjust based on actual structure)
//   //       console.log('Report:', response.data.report);
//   //       // navigate('/report', { state: { report: response.data.report } });
//   //     }
//   //   } catch (error) {
//   //     dispatch(HideLoading());
//   //     message.error('Failed to submit quiz');
//   //   }
//   // };
//   // Function to calculate and categorize result
// const calculateResult = () => {
//   const categoryScores = {
//     technical: 0,
//     human: 0,
//     conceptual: 0,
//   };

//   questions.forEach((question, index) => {
//     const selectedOption = selectedOptions[index];
//     if (selectedOption) {
//       // Add marks to the corresponding category based on the question's category
//       switch (question.category) {
//         case 'Technical Skills':
//           categoryScores.technical += selectedOption.marks;
//           break;
//         case 'Human Skills':
//           categoryScores.human += selectedOption.marks;
//           break;
//         case 'Conceptual Skills':
//           categoryScores.conceptual += selectedOption.marks;
//           break;
//         default:
//           break;
//       }
//     }
//   });

//   // Set result view with calculated scores
//   setResult(categoryScores);
//   setView("result");

//   // Optionally, save the result to the server
//   // saveResult(categoryScores);
// };
//   const submitQuiz = async () => {
//     const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//       questionId: questions[questionIndex]._id,
//       selectedOption: selectedOptions[questionIndex].label,
//     }));
  
//     try {
//       dispatch(ShowLoading());
//       const response = await axios.post(`/quiz/${id}/submit`, {
//         userId: user._id,
//         answers,
//       });
  
//       if (response.data) {
//         // Calculate result after successful submission
//         calculateResult();
//       }
  
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('Failed to submit quiz');
//     }
//   };
  
//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`flex gap-2 items-center ${
//                     selectedOptions[selectedQuestionIndex]?.label === option.label ? 'selected-option' : 'option'
//                   }`}
//                   onClick={() => {
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: {
//                         label: option.label,
//                         marks: option.marks,
//                       },
//                     });
//                   }}
//                 >
//                   <h1 className='text-xl'>
//                     {optionLabels[index]} ({option.marks} Marks)
//                   </h1>
//                 </div>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex - 1);
//                   }}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => {
//                     setSelectedQuestionIndex(selectedQuestionIndex + 1);
//                   }}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={submitQuiz}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { message } from 'antd';
// import Instructions from './Instructions';
// import axios from 'axios';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState('instructions');
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();
//   const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });

//   const optionLabels = [
//     'Not True',
//     'Seldom True',
//     'Occasionally True',
//     'Somewhat True',
//     'Very True',
//   ];

//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         setQuestions(response.questions);
//       } else {
//         message.error('Failed to load exam data.');
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('An error occurred while fetching exam data.');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   // const calculateResult = () => {
//   //   const categoryScores = {
//   //     technical: 0,
//   //     human: 0,
//   //     conceptual: 0,
//   //   };

//   //   questions.forEach((question, index) => {
//   //     const selectedOption = selectedOptions[index];
//   //     if (selectedOption) {
//   //       switch (question.category) {
//   //         case 'Technical Skills':
//   //           categoryScores.technical += selectedOption.marks;
//   //           break;
//   //         case 'Human Skills':
//   //           categoryScores.human += selectedOption.marks;
//   //           break;
//   //         case 'Conceptual Skills':
//   //           categoryScores.conceptual += selectedOption.marks;
//   //           break;
//   //         default:
//   //           break;
//   //       }
//   //     }
//   //   });

//   //   setResult(categoryScores);
//   //   setView("result");
//   // };

//   // const submitQuiz = async () => {
//   //   const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//   //     questionId: questions[questionIndex]._id,
//   //     selectedOption: selectedOptions[questionIndex].label,
//   //   }));

//   //   try {
//   //     dispatch(ShowLoading());
//   //     const response = await axios.post(`/quiz/${id}/submit`, {
//   //       userId: user._id,
//   //       answers,
//   //     });

//   //     if (response.data) {
//   //       calculateResult();
//   //     }

//   //     dispatch(HideLoading());
//   //   } catch (error) {
//   //     dispatch(HideLoading());
//   //     message.error('Failed to submit quiz');
//   //   }
//   // };
//   const calculateResult = () => {
//     const categoryScores = {
//       technical: 0,
//       human: 0,
//       conceptual: 0,
//     };
  
//     questions.forEach((question, index) => {
//       const selectedOption = selectedOptions[index];
//       if (selectedOption !== undefined) {
//         switch (question.category) {
//           case 'Technical Skills':
//             categoryScores.technical += question.options[selectedOption].marks;
//             break;
//           case 'Human Skills':
//             categoryScores.human += question.options[selectedOption].marks;
//             break;
//           case 'Conceptual Skills':
//             categoryScores.conceptual += question.options[selectedOption].marks;
//             break;
//           default:
//             break;
//         }
//       }
//     });
  
//     setResult(categoryScores);
//     setView("result");
//   };
  
//   const submitQuiz = async () => {
//     const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//       questionId: questions[questionIndex]._id, // Use the correct question ID
//       selectedOption: selectedOptions[questionIndex] // This should be the index of the selected option
//     }));
  
//     try {
//       dispatch(ShowLoading());


//       console.log("to to");
//       console.log(answers);

//       console.log("mi min min");
//       console.log(user._id);
      
//       const response = await axios.post(`http://localhost:3000/quiz/${id}/submit`, {
//         userId: user._id, // Make sure userId is included in the request
//         answers,
//       });
  
//       if (response.data) {
//         calculateResult(); // Calculate result only after a successful submission
//       }
  
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('Failed to submit quiz');
//     }
//   };
  

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex]?.label === option.label ? 'selected-option' : 'option'}`}
//                   onClick={() => {
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: {
//                         label: option.label,
//                         marks: option.marks,
//                       },
//                     });
//                   }}
//                 >
//                   <h1 className='text-xl'>
//                     {optionLabels[index]} ({option.marks} Marks)
//                   </h1>
//                 </div>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={submitQuiz}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {view === "result" && (
//           <div className='flex justify-center mt-2 gap-2'>
//             <div className='flex flex-col gap-2 result'>
//               <h1 className='text-2xl'>Result</h1>
//               <div className='marks'>
//                 <h1 className='text-md'>Technical Skills Marks: {result.technical}</h1>
//                 <h1 className='text-md'>Human Skills Marks: {result.human}</h1>
//                 <h1 className='text-md'>Conceptual Skills Marks: {result.conceptual}</h1>
//               </div>

//               <div className='flex gap-2 mt-2'>
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setView('instructions');
//                     setSelectedQuestionIndex(0);
//                     setSelectedOptions({});
//                   }}
//                 >
//                   Retake Exam
//                 </button>
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => navigate('/')}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;











// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import Instructions from './Instructions';
// import { message } from 'antd';
// import axios from 'axios';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState('instructions');
//   const { user } = useSelector(state => state.users);
//   const navigate = useNavigate();
//   const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });

//   const optionLabels = [
//     'Not True',
//     'Seldom True',
//     'Occasionally True',
//     'Somewhat True',
//     'Very True',
//   ];

//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         setQuestions(response.questions);
//       } else {
//         message.error('Failed to load exam data.');
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('An error occurred while fetching exam data.');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   const calculateResult = () => {
//     const categoryScores = {
//       technical: 0,
//       human: 0,
//       conceptual: 0,
//     };

//     questions.forEach((question, index) => {
//       const selectedOption = selectedOptions[index];
//       if (selectedOption !== undefined) {
//         switch (question.category) {
//           case 'Technical Skills':
//             categoryScores.technical += question.options[selectedOption].marks;
//             break;
//           case 'Human Skills':
//             categoryScores.human += question.options[selectedOption].marks;
//             break;
//           case 'Conceptual Skills':
//             categoryScores.conceptual += question.options[selectedOption].marks;
//             break;
//           default:
//             break;
//         }
//       }
//     });

//     setResult(categoryScores);
//     setView("result");
//   };

//   const submitQuiz = async () => {
//     // Constructing answers in the correct format
//     const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//       questionId: questions[questionIndex]._id, // Correct question ID
//       selectedOption: selectedOptions[questionIndex], // Selected option index (not label)
//     }));

//     try {
//       dispatch(ShowLoading());
//       console.log(user._id);
//       console.log(answers);
//       const response = await axios.post(`http://localhost:3000/quiz/${id}/submit`, {
//         userId: user._id, // Ensure this is sent correctly
//         answers, // Send the formatted answers array
//       });

//       if (response.data) {
//         calculateResult(); // Calculate results on successful submission
//       }

//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('Failed to submit quiz');
//     }
//   };

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex]?.label === option.label ? 'selected-option' : 'option'}`}
//                   onClick={() => {
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: {
//                         label: option.label,
//                         marks: option.marks,
//                       },
//                     });
//                   }}
//                 >
//                   <h1 className='text-xl'>
//                     {optionLabels[index]} ({option.marks} Marks)
//                   </h1>
//                 </div>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={submitQuiz}
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {view === "result" && (
//           <div className='flex justify-center mt-2 gap-2'>
//             <div className='flex flex-col gap-2 result'>
//               <h1 className='text-2xl'>Result</h1>
//               <div className='marks'>
//                 <h1 className='text-md'>Technical Skills Marks: {result.technical}</h1>
//                 <h1 className='text-md'>Human Skills Marks: {result.human}</h1>
//                 <h1 className='text-md'>Conceptual Skills Marks: {result.conceptual}</h1>
//               </div>

//               <div className='flex gap-2 mt-2'>
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setView('instructions');
//                     setSelectedQuestionIndex(0);
//                     setSelectedOptions({});
//                   }}
//                 >
//                   Retake Exam
//                 </button>
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => navigate('/')}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//     // Your component rendering logic here
//   );
// }

// export default WriteExam;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../../apicalls/exams';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Instructions from './Instructions';
import { message } from 'antd';
import axios from 'axios';

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

  // const submitQuiz = async () => {
  //   // Constructing answers in the correct format
  //   const answers = Object.keys(selectedOptions).map((questionIndex) => ({
  //     questionId: questions[questionIndex]._id, // Correct question ID
  //     selectedOption: selectedOptions[questionIndex], // Selected option index (not label)
  //   }));

  //   try {
  //     dispatch(ShowLoading());
  //     // const response = await axios.post(`http://localhost:3000/quiz/${id}/submit`, {
  //     const response = await axios.post(`/quiz/${id}/submit`, {
  //       userId: user._id, // Ensure this is sent correctly
  //       answers, // Send the formatted answers array
  //     });

  //     // if (response.data) {
  //     if (response) {
  //       calculateResult(); // Calculate results on successful submission
        
        
  //       // Send email with results
  //       console.log(user.email);
  //       console.log(examData.title);
  //       console.log(result.technical);
  //     await axios.post(`http://localhost:3000/sendResults`, {
  //       email: user.email, // User's email
  //       quizTitle: examData.name, // Quiz title
  //       results: result // Results to be sent
  //     });
  //     }

  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error('Failed to submit quiz');
  //   }
  // };
  // const submitQuiz = async () => {
  //   // Constructing answers in the correct format
  //   const answers = Object.keys(selectedOptions).map((questionIndex) => ({
  //     questionId: questions[questionIndex]._id, // Correct question ID
  //     selectedOption: selectedOptions[questionIndex], // Selected option index (not label)
  //   }));
  
  //   try {
  //     dispatch(ShowLoading());
      
  //     // Submitting quiz answers
  //     const response = await axios.post(`/quiz/${id}/submit`, {
  //       userId: user._id, // Ensure this is sent correctly
  //       answers, // Send the formatted answers array
  //     });
  
  //     if (response) {
  //       calculateResult(); // Calculate results on successful submission
  
  //       // Debugging: Check result values
  //       console.log('Email:', user.email);
  //       console.log('Quiz Title:', examData.title);
  //       console.log('Results:', result);
  
  //       // Sending email with results
  //       const emailResponse = await axios.post(`http://localhost:3000/sendResults`, {
  //         email: user.email, // User's email
  //         quizTitle: examData.title, // Quiz title
  //         results: result // Results to be sent
  //       });
  
  //       console.log('Email Response:', emailResponse.data); // Debugging response
  
  //       dispatch(HideLoading());
  //     }
  //   } catch (error) {
  //     console.error('Error submitting quiz or sending email:', error); // Improved error logging
  //     dispatch(HideLoading());
  //     message.error('Failed to submit quiz');
  //   }
  // };
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
      sendEmailWithResults();
    }
  }, [view, result, examData, user.email]);
  

  return (
    examData && (
      <div className='mt-2'>
        <div className='divider'></div>
        <h1 className='text-center'>{examData.name}</h1>
        <div className='divider'></div>

        {view === 'instructions' && (
          <Instructions
            examData={examData}
            setExamData={setExamData}
            view={view}
            setView={setView}
          />
        )}

        {view === 'questions' && questions.length > 0 && (
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
        )}

        {view === "result" && (
          <div className='flex justify-center mt-2 gap-2'>
            <div className='flex flex-col gap-2 result'>
              <h1 className='text-2xl'>Result</h1>
              <div className='marks'>
                <h1 className='text-md'>Technical Skills Marks: {result.technical}</h1>
                <h1 className='text-md'>Human Skills Marks: {result.human}</h1>
                <h1 className='text-md'>Conceptual Skills Marks: {result.conceptual}</h1>
              </div>

              <div className='flex gap-2 mt-2'>
                <button
                  className='primary-outlined-btn'
                  onClick={() => {
                    setView('instructions');
                    setSelectedQuestionIndex(0);
                    setSelectedOptions({});
                  }}
                >
                  Retake Exam
                </button>
                <button
                  className='primary-contained-btn'
                  onClick={() => navigate('/')}
                >
                  Close
                </button>
              </div>
              <div className="lottie-animation mt-6">
             <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_uu0x8lqv.json" background="transparent" speed="1" loop autoplay></lottie-player>
            </div>

            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;





// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2'; // Importing Bar chart from react-chartjs-2
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import Instructions from './Instructions';
// import { message } from 'antd';
// import axios from 'axios';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState('instructions');
//   const { user } = useSelector((state) => state.users);
//   const navigate = useNavigate();
//   const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });

//   const optionLabels = [
//     'Not True',
//     'Seldom True',
//     'Occasionally True',
//     'Somewhat True',
//     'Very True',
//   ];

//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         setQuestions(response.questions);
//       } else {
//         message.error('Failed to load exam data.');
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('An error occurred while fetching exam data.');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   const calculateResult = () => {
//     const categoryScores = {
//       technical: 0,
//       human: 0,
//       conceptual: 0,
//     };

//     questions.forEach((question, index) => {
//       const selectedOption = selectedOptions[index];
//       if (selectedOption !== undefined) {
//         switch (question.category) {
//           case 'Technical Skills':
//             categoryScores.technical += question.options[selectedOption].marks;
//             break;
//           case 'Human Skills':
//             categoryScores.human += question.options[selectedOption].marks;
//             break;
//           case 'Conceptual Skills':
//             categoryScores.conceptual += question.options[selectedOption].marks;
//             break;
//           default:
//             break;
//         }
//       }
//     });

//     setResult(categoryScores);
//     setView('result');
//   };

//   const submitQuiz = async () => {
//     const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//       questionId: questions[questionIndex]._id,
//       selectedOption: selectedOptions[questionIndex],
//     }));

//     try {
//       dispatch(ShowLoading());

//       const response = await axios.post(`/quiz/${id}/submit`, {
//         userId: user._id,
//         answers,
//       });

//       if (response) {
//         calculateResult();
//         dispatch(HideLoading());
//       }
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       dispatch(HideLoading());
//       message.error('Failed to submit quiz');
//     }
//   };

//   useEffect(() => {
//     if (view === 'result') {
//       const sendEmailWithResults = async () => {
//         try {
//           await axios.post(`http://localhost:3000/sendResults`, {
//             email: user.email,
//             quizTitle: examData.title,
//             results: result,
//           });
//         } catch (error) {
//           console.error('Error sending email:', error);
//         }
//       };

//       sendEmailWithResults();
//     }
//   }, [view, result, examData, user.email]);

//   const barChartData = {
//     labels: ['Technical Skills', 'Human Skills', 'Conceptual Skills'], // Labels for the x-axis
//     datasets: [
//       {
//         label: 'Category Scores',
//         data: [result.technical, result.human, result.conceptual], // Data from the result state
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 205, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions examData={examData} setExamData={setExamData} view={view} setView={setView} />
//         )}

//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1}: {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`flex gap-2 items-center ${
//                     selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'
//                   }`}
//                   onClick={() =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: index,
//                     })
//                   }
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <h1 className='text-xl'>{optionLabels[index]}</h1>
//                 </div>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button className='primary-contained-btn' onClick={submitQuiz}>
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {view === 'result' && (
//           <div className='flex justify-center mt-2 gap-2'>
//             <div className='flex flex-col gap-2 result'>
//               <h1 className='text-2xl'>Result</h1>
//               <Bar data={barChartData} options={barChartOptions} />
//               <div className='flex gap-2 mt-2'>
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setView('instructions');
//                     setSelectedQuestionIndex(0);
//                     setSelectedOptions({});
//                   }}
//                 >
//                   Retake Exam
//                 </button>
//                 <button className='primary-contained-btn' onClick={() => navigate('/')}>
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   );
// }

// export default WriteExam;




// import React, { useState, useEffect } from 'react';
// import { Bar } from '@ant-design/charts'; // Importing Bar chart from @ant-design/charts
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import Instructions from './Instructions';
// import { message } from 'antd';
// import axios from 'axios';

// function WriteExam() {
//   const [examData, setExamData] = useState();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [view, setView] = useState('instructions');
//   const { user } = useSelector((state) => state.users);
//   const navigate = useNavigate();
//   const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });

//   const optionLabels = [
//     'Not True',
//     'Seldom True',
//     'Occasionally True',
//     'Somewhat True',
//     'Very True',
//   ];

//   const getExamDataById = async (id) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getExamById(id);
//       dispatch(HideLoading());

//       if (response) {
//         setExamData(response);
//         setQuestions(response.questions);
//       } else {
//         message.error('Failed to load exam data.');
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('An error occurred while fetching exam data.');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getExamDataById(id);
//     }
//   }, [id]);

//   const calculateResult = () => {
//     const categoryScores = {
//       technical: 0,
//       human: 0,
//       conceptual: 0,
//     };

//     questions.forEach((question, index) => {
//       const selectedOption = selectedOptions[index];
//       if (selectedOption !== undefined) {
//         switch (question.category) {
//           case 'Technical Skills':
//             categoryScores.technical += question.options[selectedOption].marks;
//             break;
//           case 'Human Skills':
//             categoryScores.human += question.options[selectedOption].marks;
//             break;
//           case 'Conceptual Skills':
//             categoryScores.conceptual += question.options[selectedOption].marks;
//             break;
//           default:
//             break;
//         }
//       }
//     });

//     setResult(categoryScores);
//     setView('result');
//   };

//   const submitQuiz = async () => {
//     const answers = Object.keys(selectedOptions).map((questionIndex) => ({
//       questionId: questions[questionIndex]._id,
//       selectedOption: selectedOptions[questionIndex],
//     }));

//     try {
//       dispatch(ShowLoading());

//       const response = await axios.post(`/quiz/${id}/submit`, {
//         userId: user._id,
//         answers,
//       });

//       if (response) {
//         calculateResult();
//         dispatch(HideLoading());
//       }
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       dispatch(HideLoading());
//       message.error('Failed to submit quiz');
//     }
//   };

//   const barChartData = [
//     {
//       category: 'Technical Skills',
//       score: result.technical,
//     },
//     {
//       category: 'Human Skills',
//       score: result.human,
//     },
//     {
//       category: 'Conceptual Skills',
//       score: result.conceptual,
//     },
//   ];

//   const barChartConfig = {
//     data: barChartData,
//     xField: 'category',
//     yField: 'score',
//     seriesField: 'category',
//     meta: {
//       score: {
//         alias: 'Score',
//       },
//       category: {
//         alias: 'Category',
//       },
//     },
//     color: ['rgba(75, 192, 192, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 205, 86, 0.8)'],
//     label: {
//       position: 'right',
//       style: {
//         fill: '#aaa',
//         opacity: 0.6,
//       },
//     },
//     background: {
//       fill: '#FFFFFF', // White background
//     },
//   };
//   const barChartOptions = {
//     indexAxis: 'y', // For horizontal bar chart
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//   };
  
  
  

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData.name}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions examData={examData} setExamData={setExamData} view={view} setView={setView} />
//         )}

//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1}: {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`flex gap-2 items-center ${
//                     selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'
//                   }`}
//                   onClick={() =>
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: index,
//                     })
//                   }
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <h1 className='text-xl'>{optionLabels[index]}</h1>
//                 </div>
//               ))}
//             </div>

//             <div className='flex justify-between'>
//               {selectedQuestionIndex > 0 && (
//                 <button
//                   className='primary-outlined-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}
//                 >
//                   Previous
//                 </button>
//               )}
//               {selectedQuestionIndex < questions.length - 1 && (
//                 <button
//                   className='primary-contained-btn'
//                   onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}
//                 >
//                   Next
//                 </button>
//               )}
//               {selectedQuestionIndex === questions.length - 1 && (
//                 <button className='primary-contained-btn' onClick={submitQuiz}>
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

        
//           {view === 'result' && (
//   <div className='flex justify-center mt-2 gap-2'>
//     <div className='flex flex-col gap-2 result' style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px' }}>
//       <h1 className='text-2xl'>Result</h1>
//       <Bar data={barChartData} options={barChartOptions} />
//       <div className='flex gap-2 mt-2'>
//         <button
//           className='primary-outlined-btn'
//           onClick={() => {
//             setView('instructions');
//             setSelectedQuestionIndex(0);
//             setSelectedOptions({});
//           }}
//         >
//           Retake Exam
//         </button>
//         <button className='primary-contained-btn' onClick={() => navigate('/')}>
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

        
//       </div>
//     )
//   );
// }

// export default WriteExam;










// {view === 'result' && (
//   <div className='flex justify-center mt-2 gap-2'>
//     <div className='flex flex-col gap-2 result'>
//       <h1 className='text-2xl'>Result</h1>
//       <Bar {...barChartConfig} /> 
//       <div className='flex gap-2 mt-2'>
//         <button
//           className='primary-outlined-btn'
//           onClick={() => {
//             setView('instructions');
//             setSelectedQuestionIndex(0);
//             setSelectedOptions({});
//           }}
//         >
//           Retake Exam
//         </button>
//         <button className='primary-contained-btn' onClick={() => navigate('/')}>
//           Close
//         </button>
//       </div>
//     </div>
//   </div>






// {
//   "name": "frontend",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@reduxjs/toolkit": "^1.8.6",
//     "@testing-library/jest-dom": "^5.16.5",
//     "@testing-library/react": "^13.4.0",
//     "@testing-library/user-event": "^13.5.0",
//     "antd": "^4.23.5",
//     "axios": "^1.1.2",
//     "chart.js": "^4.4.4",
//     "http-proxy-middleware": "^3.0.2",
//     "moment": "^2.29.4",
//     "react": "^18.2.0",
//     "react-chartjs-2": "^5.2.0",
//     "react-dom": "^18.2.0",
//     "react-redux": "^8.0.4",
//     "react-router-dom": "^6.4.2",
//     "react-scripts": "4.0.3",
//     "redux": "^4.2.0",
//     "web-vitals": "^2.1.4"
//   },
//   "proxy": "http://localhost:3000",
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   }
// }
