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























































import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamById } from '../../../apicalls/exams';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import Instructions from './Instructions';
import { message } from 'antd';
import axios from 'axios';
import ReportBarGraph from './ReportBarGraph';
import { PDFDocument, rgb } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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

  // const updateExistingPDF = async () => {
  //   try {
  //     // Fetch the existing PDF file from the public folder
  //     const existingPdfBytes = await fetch('/report.pdf').then((res) =>
  //       res.arrayBuffer()
  //     );
  
  //     // Load the PDF with pdf-lib
  //     const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
  //     // Get the pages of the PDF
  //     const pages = pdfDoc.getPages();
  //     const lastPage = pages[pages.length - 1]; // Get the last page to add the graph
  
  //     // Replace <Participant Name> with the actual user's name
  //     const userName = user.name || 'Participant';
  //     const page = pages[0]; // Assuming the name is on the first page
  //     page.drawText(userName, {
  //       x: 150, // Set x coordinate based on where the name is located
  //       y: 700, // Set y coordinate based on where the name is located
  //       size: 12,
  //       color: rgb(0, 0, 0),
  //     });
  
  //     // Capture the graph as an image using html2canvas
  //     const chartElement = document.getElementById('report-chart');
      
  //     // Ensure the chartElement exists before trying to use html2canvas
  //     if (chartElement) {
  //       const canvas = await html2canvas(chartElement);
  //       const imgData = canvas.toDataURL('image/png');
  
  //       // Add the graph image to the last page of the PDF
  //       const pngImage = await pdfDoc.embedPng(imgData);
  //       const pngDims = pngImage.scale(0.5); // Scale the image
  
  //       lastPage.drawImage(pngImage, {
  //         x: 50,
  //         y: 300, // Adjust these coordinates as needed
  //         width: pngDims.width,
  //         height: pngDims.height,
  //       });
  
  //       // Serialize the updated PDF
  //       const pdfBytes = await pdfDoc.save();
  
  //       // Trigger download of the updated PDF
  //       const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //       saveAs(blob, 'updated-report.pdf');
  //     } else {
  //       console.error('Error: report-chart element not found.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating PDF:', error);
  //   }
  // };
 

const updateExistingPDF = async () => {
  // console.log(user);
  console.log("mai hoon use  updateExistingPDF")
      console.log(user);
  try {
    // Fetch the existing PDF file from the public folder
    const existingPdfBytes = await fetch('/report.pdf').then((res) =>
      res.arrayBuffer()
    );

    // Load the PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the pages of the PDF
    const pages = pdfDoc.getPages();
    console.log(`Total number of pages: ${pages.length}`); // Log the number of pages

    const lastPageIndex = 7; // Index for the 8th page
    if (lastPageIndex < pages.length) {
      const lastPage = pages[lastPageIndex]; // Get the 8th page to add the graph
      const LastPage=pages[6];

      // Replace <Participant Name> with the actual user's name
      // const userName = user?.name || 'Participant'; // Check if user has a name property
      // const userName = user?.name || 'Participant'; 
      const userName=user.name;
      const textToReplace = '<Participant Name>'; // Placeholder text to replace

      
      // Measure the size of the text to replace
      const textWidth = lastPage.getWidth() - 50; // Setting a width for placement
      const textHeight = 12; // Font size
      const placeholderHeight = 700; // Y coordinate where the placeholder is located


      for (let i = 0; i < pages.length; i++) {
        const currentPage = pages[i];
      
        // Logic to replace text on page 6 (if needed)
      
        // Add user name to footer
        const footerText = `Page ${i + 1} of ${pages.length} | Leadership Diagnostic Report | Situational Leadership | ${userName}`;
        currentPage.drawText(footerText, {
          x: 50,
          y: currentPage.getHeight() - 20,
          size: 8,
          color: rgb(0, 0, 0),
        });
        // lastPage.drawText(footerText, {
        //   x: 50, // Adjust X coordinate for footer placement
        //   y: lastPage.getHeight() - 20, // Adjust Y coordinate for footer placement
        //   // x: 100, // Adjust X coordinate for footer placement
        //   // y: lastPage.getHeight() -30, // Adjust Y coordinate for footer placement
        //   size: 8, // Adjust font size for footer
        //   color: rgb(0, 0, 0), // Black color
        // });
      }

      // Draw the user's name on the page
      LastPage.drawText(userName, {
        x: 120, // Set x coordinate based on where the name is located
        y: placeholderHeight, // Set y coordinate based on where the name is located
        size: textHeight,
        color: rgb(0, 0, 0), // Black color
      });

      // Capture the graph as an image using html2canvas
      const chartElement = document.getElementById('report-chart');

      // Ensure the chartElement exists before trying to use html2canvas
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');

        // Add the graph image to the last page of the PDF
        const pngImage = await pdfDoc.embedPng(imgData);
        const pngDims = pngImage.scale(0.5); // Scale the image

        // Calculate positioning for the graph
        const xPos = lastPage.getWidth() / 2 - pngDims.width / 2; // Center the graph
        const yPos = lastPage.getHeight() - 300; // Adjust y position

        // Draw a rectangle around the graph with a black border
        lastPage.drawRectangle({
          x: xPos - 5, // Slightly larger for border
          y: yPos - 5,
          width: pngDims.width + 10, // Slightly larger for border
          height: pngDims.height + 10,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
          color: rgb(1, 1, 1), // White background
        });

        // Draw the chart image inside the rectangle
        lastPage.drawImage(pngImage, {
          x: xPos,
          y: yPos,
          width: pngDims.width,
          height: pngDims.height,
        });

        // Calculate total marks
        const totalMarks = result.technical + result.human + result.conceptual;

        // Calculate percentages and round them
        const technicalPercentage = Math.round((result.technical / totalMarks) * 100);
        const humanPercentage = Math.round((result.human / totalMarks) * 100);
        const conceptualPercentage = Math.round((result.conceptual / totalMarks) * 100);

        // Adjust the position for percentage texts to be inside the rectangle
        const percentageX = xPos + 10; // X position for percentage text
        const percentageYStart = yPos - 60; // Start Y position for the first percentage text inside the rectangle

        // Draw the percentage texts with different colors inside the rectangle
        lastPage.drawText(`Technical: ${technicalPercentage}%`, {
          x: percentageX,
          y: percentageYStart,
          size: 12,
          color: rgb(24 / 255, 144 / 255, 255 / 255), // Technical Color
        });
        lastPage.drawText(`Human: ${humanPercentage}%`, {
          x: percentageX,
          y: percentageYStart - 20, // Move down for the next label
          size: 12,
          color: rgb(115 / 255, 209 / 255, 61 / 255), // Human Color
        });
        lastPage.drawText(`Conceptual: ${conceptualPercentage}%`, {
          x: percentageX,
          y: percentageYStart - 40, // Move down for the next label
          size: 12,
          color: rgb(255 / 255, 169 / 255, 64 / 255), // Conceptual Color
        });

        // Serialize the updated PDF
        const pdfBytes = await pdfDoc.save();

        // Trigger download of the updated PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'updated-report.pdf');
      } else {
        console.error('Error: report-chart element not found.');
      }
    } else {
      console.error(`Error: The PDF does not have a page at index ${lastPageIndex}.`);
    }
  } catch (error) {
    console.error('Error updating PDF:', error);
  }
};

// const updateExistingPDF = async (user) => {
//   // console.log(user);
//   try {
//     // Fetch the existing PDF file from the public folder
//     const existingPdfBytes = await fetch('/report.pdf').then((res) =>
//       res.arrayBuffer()
//     );

//     // Load the PDF with pdf-lib
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);

//     // Get the pages of the PDF
//     const pages = pdfDoc.getPages();
//     console.log(`Total number of pages: ${pages.length}`); // Log the number of pages

//     const lastPageIndex = 7; // Index for the 8th page
//     if (lastPageIndex < pages.length) {
//       const lastPage = pages[lastPageIndex]; // Get the 8th page to add the graph

//       // Replace <Participant Name> with the actual user's name
//       // const userName = user?.name || 'Participant'; // Check if user has a name property
//       const userName = user?.name || 'Participant'; 
//       const textToReplace = '<Participant Name>'; // Placeholder text to replace

      
//       // Measure the size of the text to replace
//       const textWidth = lastPage.getWidth() - 50; // Setting a width for placement
//       const textHeight = 12; // Font size
//       const placeholderHeight = 700; // Y coordinate where the placeholder is located

//       // Draw the user's name on the page
//       lastPage.drawText(userName, {
//         x: 150, // Set x coordinate based on where the name is located
//         y: placeholderHeight, // Set y coordinate based on where the name is located
//         size: textHeight,
//         color: rgb(0, 0, 0), // Black color
//       });

//       // Capture the graph as an image using html2canvas
//       const chartElement = document.getElementById('report-chart');

//       // Ensure the chartElement exists before trying to use html2canvas
//       if (chartElement) {
//         const canvas = await html2canvas(chartElement);
//         const imgData = canvas.toDataURL('image/png');

//         // Add the graph image to the last page of the PDF
//         const pngImage = await pdfDoc.embedPng(imgData);
//         const pngDims = pngImage.scale(0.5); // Scale the image

//         // Calculate positioning for the graph
//         const xPos = lastPage.getWidth() / 2 - pngDims.width / 2; // Center the graph
//         const yPos = lastPage.getHeight() - 300; // Adjust y position

//         // Draw a rectangle around the graph with a black border
//         lastPage.drawRectangle({
//           x: xPos - 5, // Slightly larger for border
//           y: yPos - 5,
//           width: pngDims.width + 10, // Slightly larger for border
//           height: pngDims.height + 10,
//           borderColor: rgb(0, 0, 0),
//           borderWidth: 1,
//           color: rgb(1, 1, 1), // White background
//         });

//         // Draw the chart image inside the rectangle
//         lastPage.drawImage(pngImage, {
//           x: xPos,
//           y: yPos,
//           width: pngDims.width,
//           height: pngDims.height,
//         });

//         // Calculate total marks
//         const totalMarks = result.technical + result.human + result.conceptual;

//         // Calculate percentages and round them
//         const technicalPercentage = Math.round((result.technical / totalMarks) * 100);
//         const humanPercentage = Math.round((result.human / totalMarks) * 100);
//         const conceptualPercentage = Math.round((result.conceptual / totalMarks) * 100);

//         // Adjust the position for percentage texts to be inside the rectangle
//         const percentageX = xPos + 10; // X position for percentage text
//         const percentageYStart = yPos - 60; // Start Y position for the first percentage text inside the rectangle

//         // Draw the percentage texts with different colors inside the rectangle
//         lastPage.drawText(`Technical: ${technicalPercentage}%`, {
//           x: percentageX,
//           y: percentageYStart,
//           size: 12,
//           color: rgb(24 / 255, 144 / 255, 255 / 255), // Technical Color
//         });
//         lastPage.drawText(`Human: ${humanPercentage}%`, {
//           x: percentageX,
//           y: percentageYStart - 20, // Move down for the next label
//           size: 12,
//           color: rgb(115 / 255, 209 / 255, 61 / 255), // Human Color
//         });
//         lastPage.drawText(`Conceptual: ${conceptualPercentage}%`, {
//           x: percentageX,
//           y: percentageYStart - 40, // Move down for the next label
//           size: 12,
//           color: rgb(255 / 255, 169 / 255, 64 / 255), // Conceptual Color
//         });

//         // Serialize the updated PDF
//         const pdfBytes = await pdfDoc.save();

//         // Trigger download of the updated PDF
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         saveAs(blob, 'updated-report.pdf');
//       } else {
//         console.error('Error: report-chart element not found.');
//       }
//     } else {
//       console.error(`Error: The PDF does not have a page at index ${lastPageIndex}.`);
//     }
//   } catch (error) {
//     console.error('Error updating PDF:', error);
//   }
// };  
  useEffect(() => {
    if (view === 'result') {
      // console.log("mai hoon use effect")
      // console.log(user);
      // const sendEmailWithResults = async () => {
        // try {
          // const emailResponse = await axios.post('http://localhost:3000/sendResults', {
      //       email: user.email,
      //       quizTitle: examData.title,
      //       results: result,
      //     });

      //     console.log('Email sent successfully:', emailResponse.data);
      //   } catch (error) {
      //     console.error('Error sending email:', error);
      //   }
      // };
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
                  <span className='text-xl'>{optionLabels[index]}</span>
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
                <button className='primary-contained-btn' onClick={updateExistingPDF}>
                  Download PDF
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
