// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import Instructions from './Instructions';
// import { message } from 'antd';
// import axios from 'axios';
// import ReportBarGraph from './ReportBarGraph';
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

//       // Submitting quiz answers
//       const response = await axios.post(`/quiz/${id}/submit`, {
//         userId: user._id, // Ensure this is sent correctly
//         answers, // Send the formatted answers array
//       });

//       if (response) {
//         // Calculate results after successful submission
//         calculateResult();

//         // Hide loading, as email will be sent after result calculation
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
//           const emailResponse = await axios.post(`http://localhost:3000/sendResults`, {
//             email: user.email, // User's email
//             quizTitle: examData.title, // Quiz title
//             results: result, // Correct result object to send
//           });

//           console.log('Email sent successfully:', emailResponse.data); // Debugging response
//         } catch (error) {
//           console.error('Error sending email:', error); // Improved error logging
//         }
//       };

//       // Send email with results after view switches to "result"
//       // sendEmailWithResults();
//     }
//   }, [view, result, examData, user.email]);


//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData?.title}</h1>
//         <div className='divider'></div>

//         {view === 'instructions' && (
//           <Instructions
//             examData={examData}
//             setExamData={setExamData}
//             view={view}
//             setView={setView}
//           />
//         )}

//         {/* {view === 'questions' && questions.length > 0 && (
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
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
//                   onClick={() => {
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [selectedQuestionIndex]: index, // Store the index directly
//                     });
//                   }}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <h1 className='text-xl'>
//                     {optionLabels[index]} 
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
//         )} */}


//         {view === 'questions' && questions.length > 0 && (
//           <div className='flex flex-col gap-2 mt-2'>
//             <div className='flex justify-between'>
//               <h1 className='text-2xl'>
//                 {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
//               </h1>
//             </div>

//             <div className='flex flex-col justify-between gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <label
//                   key={index}
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
//                   style={{
//                     cursor: 'pointer',
//                     color: selectedOptions[selectedQuestionIndex] === index ? 'green' : 'inherit',
//                   }}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${selectedQuestionIndex}`}
//                     value={index}
//                     checked={selectedOptions[selectedQuestionIndex] === index}
//                     onChange={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: index,
//                       });
//                     }}
//                     style={{ accentColor: 'green', width: '20px' }}
//                   />
//                   <span className='text-xl'>
//                     {optionLabels[index]}
//                   </span>
//                 </label>
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
//               {/* <div className='marks'>
//                 <h1 className='text-md'>Technical Skills Marks: {result.technical}</h1>
//                 <h1 className='text-md'>Human Skills Marks: {result.human}</h1>
//                 <h1 className='text-md'>Conceptual Skills Marks: {result.conceptual}</h1>
//               </div> */}
//               <div>
//                 <ReportBarGraph result={result} />
//               </div>
//               <div className='flex justify-center items-center gap-2'>
//                 {/* <button
//                   className='primary-outlined-btn'
//                   onClick={() => {
//                     setView('instructions');
//                     setSelectedQuestionIndex(0);
//                     setSelectedOptions({});
//                   }}
//                 >
//                   Retake Exam
//                 </button> */}
//                 <button
//                   className='secondary-contained-btn'
//                   onClick={() => navigate('/')}
//                 >
//                   Close
//                 </button>
//                 <a href='/report.pdf' download>
//                   <button className='primary-contained-btn'>
//                     Download Complete Report
//                   </button>
//                 </a>
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
// import ReportBarGraph from './ReportBarGraph';
// import { PDFDocument, rgb } from 'pdf-lib';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
// import Report from '../Reports/Report';

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
//     if (id && user) {
//       // console.log(`Kya haal hai ashwini bhai ${user}`);
//       console.log(`Kya haal hai ashwini bhai ${user.name}`);  // if user has a 'name' property


//       getExamDataById(id);
//     }
//   }, [id, user]);
  

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
//       // console.log("mai hoon use effect")
//       // console.log(user);
//       // const sendEmailWithResults = async () => {
//         // try {
//           // const emailResponse = await axios.post('http://localhost:3000/sendResults', {
//       //       email: user.email,
//       //       quizTitle: examData.title,
//       //       results: result,
//       //     });

//       //     console.log('Email sent successfully:', emailResponse.data);
//       //   } catch (error) {
//       //     console.error('Error sending email:', error);
//       //   }
//       // };
//     }
//   }, [view, result, examData, user.email]);

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData?.title}</h1>
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

//             <div className='flex flex-col justify-between gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <label
//                   key={index}
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
//                   style={{ cursor: 'pointer', color: selectedOptions[selectedQuestionIndex] === index ? 'green' : 'inherit' }}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${selectedQuestionIndex}`}
//                     value={index}
//                     checked={selectedOptions[selectedQuestionIndex] === index}
//                     onChange={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: index,
//                       });
//                     }}
//                     style={{ accentColor: 'green', width: '20px' }}
//                   />
//                   <span className='text-xl'>{optionLabels[index]}</span>
//                 </label>
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

        // {view === 'result' && (
        //   <div className='flex justify-center mt-2 gap-2'>
        //     <div className='flex flex-col gap-2 result'>
        //       <h1 className='text-2xl'>Result</h1>
        //       <div>
        //         <ReportBarGraph result={result} id="report-chart" /> {/* Add an ID for capturing chart */}
        //       </div>
        //       <div className='flex justify-center items-center gap-2'>
        //         <button className='secondary-contained-btn' onClick={() => navigate('/')}>
        //           Close
        //         </button>
        //         <Report result={result} userName={user?.name}/> 

        //         {/* <button className='primary-contained-btn'>
        //           Download PDF
        //         </button> */}
        //       </div>
        //     </div>
        //   </div>
        // )}
//       </div>
//     )
//   );
// }

// export default WriteExam;

















import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../../apicalls/exams';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Instructions from './Instructions';
import { message } from 'antd';
import axios from 'axios';
import ReportBarGraph from './ReportBarGraph';
import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import LeadershipSkills from '/LeadershipSkills.png'; // Assuming image files are available
import Footer from '/Footer.png';
 
function WriteExam() {
  const [examData, setExamData] = useState();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState('instructions');
  const { user } = useSelector(state => state.users);
  console.log("User : ",user);
  const userName = user?.name;
  const navigate = useNavigate();
  const [result, setResult] = useState({ technical: 0, human: 0, conceptual: 0 });
 
// Function to add page with text and image
async function addPageWithTextAndImage(pdfDoc, text, imageBytes, totalPages, pageNo, userName) {
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
 
  // Define margins
  const marginX = 20; // 20px margin from left and right
  const marginY = 40; // 40px margin from top and bottom
 
  // Embed a font for the text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 20;
 
  // Calculate the width of the header text
  const textWidth = font.widthOfTextAtSize(text, fontSize);
 
  // Calculate the x position to center the header text
  const xPosHeader = (width - textWidth) / 2;
 
  // Add text as a header at the top of the page
  const headerHeight = height - marginY - fontSize; // Top of the page with margin
  page.drawText(text, {
      x: xPosHeader, // Centered x position
      y: headerHeight, // Y-position for the header (near top)
      size: fontSize,
      font, // Use the embedded font
      color: rgb(0, 0, 0), // Black color for text
  });
 
  // Add footer text with page number
  const footerText = `Page ${pageNo} of ${totalPages} | Leadership Diagnostic Report | Situational Leadership | ${userName}`;
  const footerFontSize = 10;
  const footerTextWidth = font.widthOfTextAtSize(footerText, footerFontSize);
 
  // Calculate x position to center footer text
  const xPosFooter = (width - footerTextWidth) / 2;
 
  page.drawText(footerText, {
      x: xPosFooter, // Center footer text
      y: 20,  // Y position near the bottom of the page
      size: footerFontSize,
      font, // Use the embedded font
      color: rgb(0, 0, 0), // Text color (black)
  });
 
  // Embed and draw the image if imageBytes is provided
  if (imageBytes) {
      const image = await pdfDoc.embedPng(imageBytes); // Assuming PNG image
 
      // Calculate the image size to fit within the margins
      const availableWidth = width - 2 * marginX;
      const availableHeight = height - 2 * marginY - fontSize - 20; // Subtract header height
 
      const imageDims = image.scale(1.0);
 
      // Calculate scaling factor to fit the image within the available space
      const scaleX = availableWidth / imageDims.width;
      const scaleY = availableHeight / imageDims.height;
      const scaleFactor = Math.min(scaleX, scaleY);
 
      const imageWidth = imageDims.width * scaleFactor;
      const imageHeight = imageDims.height * scaleFactor;
 
      // Calculate x position to center the image
      const xPosImage = (width - imageWidth) / 2; // Center the image
      // Position image below the header
      const yPosImage = height - marginY - fontSize - imageHeight - 20; // Adjust y-position to account for header
 
      page.drawImage(image, {
          x: xPosImage,
          y: yPosImage,
          width: imageWidth,
          height: imageHeight,
      });
  }
}
 
const downloadReport = async () => {
  // Fetch the existing PDF file
  const existingPdfBytes = await fetch('../../../Report.pdf').then((res) => {
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }
      return res.arrayBuffer();
  });
 
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
 
  // Convert LeadershipSkills and Footer image to byte array for embedding
  const leadershipSkillsImage = await fetch(LeadershipSkills).then((res) =>
      res.arrayBuffer()
  );
  const footerImage = await fetch(Footer).then((res) => res.arrayBuffer());
 
  // Get the existing pages of the PDF
  const originalPages = pdfDoc.getPages(); // Fetch the original pages
  const totalOriginalPages = originalPages.length;
 
  // Create a new PDF document to add the pages in the desired order
  const newPdfDoc = await PDFDocument.create();
 
  // Add the first page with LeadershipSkills image and text
  await addPageWithTextAndImage(newPdfDoc, userName, leadershipSkillsImage, totalOriginalPages + 2, 1, userName);
 
  // Add original pages to the new document, with footers on each page
  for (let i = 0; i < totalOriginalPages; i++) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      const page = newPdfDoc.addPage(copiedPage);
     
      // Add the footer text to the copied page
      const font = await newPdfDoc.embedFont(StandardFonts.Helvetica);
      const footerText = `Page ${i + 2} of ${totalOriginalPages + 2} | Leadership Diagnostic Report | Situational Leadership | ${userName}`;
      const footerFontSize = 10;
      const footerTextWidth = font.widthOfTextAtSize(footerText, footerFontSize);
 
      // Calculate x position to center footer text
      const { width } = page.getSize();
      const xPosFooter = (width - footerTextWidth) / 2;
 
      page.drawText(footerText, {
          x: xPosFooter,
          y: 20,
          size: footerFontSize,
          font,
          color: rgb(0, 0, 0), // Text color (black)
      });
  }
 
  // Add a page at the end with Footer image (this page will not have a footer)
  await addPageWithTextAndImage(newPdfDoc, '', footerImage, totalOriginalPages + 2, totalOriginalPages + 2, userName);
 
  // Serialize the new PDFDocument to bytes (downloadable format)
  const pdfBytes = await newPdfDoc.save();
 
  // Use file-saver to save the file locally
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  saveAs(blob, 'Report.pdf');
};
 
 
 
 
 
  const optionLabels = ['Not True', 'Seldom True', 'Occasionally True', 'Somewhat True', 'Very True'];
 
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
      message.error('An error occurred while fetching exam data.', error);
    }
  };
 
  useEffect(() => {
    if (id && user) {
      getExamDataById(id);
    }
  }, [id, user]);
 
  const calculateResult = () => {
    const categoryScores = { technical: 0, human: 0, conceptual: 0 };
 
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
    setView('result');
  };
 
  const submitQuiz = async () => {
    const answers = Object.keys(selectedOptions).map((questionIndex) => ({
      questionId: questions[questionIndex]._id,
      selectedOption: selectedOptions[questionIndex],
    }));
 
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`/quiz/${id}/submit`, {
        userId: user._id,
        answers,
      });
 
      if (response) {
        calculateResult();
        dispatch(HideLoading());
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      dispatch(HideLoading());
      message.error('Failed to submit quiz');
    }
  };
 
  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData?.title}</h1>
        <div className="divider"></div>
 
        {view === 'instructions' && (
          <Instructions examData={examData} setExamData={setExamData} view={view} setView={setView} />
        )}
 
        {view === 'questions' && questions.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between">
              <h1 className="text-2xl">
                {selectedQuestionIndex + 1} : {questions[selectedQuestionIndex].questionText}
              </h1>
            </div>
 
            <div className="flex flex-col justify-between gap-2">
              {questions[selectedQuestionIndex].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'
                    }`}
                  style={{ cursor: 'pointer', color: selectedOptions[selectedQuestionIndex] === index ? 'green' : 'inherit' }}
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
                  <span className="text-xl">{optionLabels[index]}</span>
                </label>
              ))}
            </div>
 
            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button className="primary-outlined-btn" onClick={() => setSelectedQuestionIndex(selectedQuestionIndex - 1)}>
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button className="primary-contained-btn" onClick={() => setSelectedQuestionIndex(selectedQuestionIndex + 1)}>
                  Next
                </button>
              )}
              {selectedQuestionIndex === questions.length - 1 && (
                <button className="primary-contained-btn" onClick={submitQuiz}>
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
 
        {view === 'result' && (
          <div className='flex justify-center mt-2 gap-2'>
            <div className='flex flex-col gap-2 result'>
              <h1 className='text-2xl'>Result</h1>
              <div>
                <ReportBarGraph result={result} id="report-chart" /> {/* Add an ID for capturing chart */}
              </div>
              <div className='flex justify-center items-center gap-2'>
                <button className='secondary-contained-btn' onClick={() => navigate('/')}>
                  Close
                </button>
                {/* <Report result={result} userName={user?.name}/>  */}

                <button className='primary-contained-btn' onClick={downloadReport}>
                  Download Complete Report 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
 
export default WriteExam;
 











































































































































































































































































{/* <div className="lottie-animation mt-6">
                <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_uu0x8lqv.json" background="transparent" speed="1" loop autoplay></lottie-player>
              </div> */}



























































































































// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getExamById } from '../../../apicalls/exams';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import Instructions from './Instructions';
// import { message } from 'antd';
// import axios from 'axios';
// import ReportBarGraph from './ReportBarGraph';
// import jsPDF from 'jspdf'; // Import jsPDF

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
//           const emailResponse = await axios.post(`http://localhost:3000/sendResults`, {
//             email: user.email,
//             quizTitle: examData.title,
//             results: result,
//           });

//           console.log('Email sent successfully:', emailResponse.data);
//         } catch (error) {
//           console.error('Error sending email:', error);
//         }
//       };

//       // sendEmailWithResults();
//     }
//   }, [view, result, examData, user.email]);

//   // const generatePDF = () => {
//   //   const doc = new jsPDF();

//   //   // Add content to the PDF
//   //   doc.text(`Quiz Results: ${examData.title}`, 10, 10); // Quiz Title
//   //   doc.text(`Technical Skills Marks: ${result.technical}`, 10, 20);
//   //   doc.text(`Human Skills Marks: ${result.human}`, 10, 30);
//   //   doc.text(`Conceptual Skills Marks: ${result.conceptual}`, 10, 40);

//   //   // Save the generated PDF
//   //   doc.save(`${examData.title}_Results.pdf`);
//   // };

//   return (
//     examData && (
//       <div className='mt-2'>
//         <div className='divider'></div>
//         <h1 className='text-center'>{examData?.title}</h1>
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

//             <div className='flex flex-col justify-between gap-2'>
//               {questions[selectedQuestionIndex].options.map((option, index) => (
//                 <label
//                   key={index}
//                   className={`flex gap-2 items-center ${selectedOptions[selectedQuestionIndex] === index ? 'selected-option' : 'option'}`}
//                   style={{
//                     cursor: 'pointer',
//                     color: selectedOptions[selectedQuestionIndex] === index ? 'green' : 'inherit',
//                   }}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${selectedQuestionIndex}`}
//                     value={index}
//                     checked={selectedOptions[selectedQuestionIndex] === index}
//                     onChange={() => {
//                       setSelectedOptions({
//                         ...selectedOptions,
//                         [selectedQuestionIndex]: index,
//                       });
//                     }}
//                     style={{ accentColor: 'green', width: '20px' }}
//                   />
//                   <span className='text-xl'>
//                     {optionLabels[index]}
//                   </span>
//                 </label>
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
//               <div>
//                 <ReportBarGraph result={result} />
//               </div>
//               <div className='flex justify-center items-center gap-2'>
//                 <button
//                   className='secondary-contained-btn'
//                   onClick={() => navigate('/')}
//                 >
//                   Close
//                 </button>
//                 <button
//                   className='primary-contained-btn'
//                   // onClick={generatePDF} // Call generatePDF on click
//                 >
//                   Download Complete Report
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
