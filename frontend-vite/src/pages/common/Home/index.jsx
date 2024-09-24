// import { message, Row, Col } from 'antd'
// import React,{useState,useEffect} from 'react'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { getAllExams } from '../../../apicalls/exams'
// import PageTitle from '../../../components/PageTitle'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'

// function HomePage() {
//   const [exams, setExams] = useState([])
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const user = useSelector(state=>state.users.user)
//   const getExams = async() => {
//     try{
//        dispatch(ShowLoading())
//        const response = await getAllExams()
//        dispatch(HideLoading())
//        if(response.success){
//         message.success(response.message);
//         setExams(response.data)
//        }
//        else{
//         message.error(response.message)
//        }
//     }
//     catch(error){
//        dispatch(HideLoading())
//        message.error(error.message)      
//     }
//   }
//   useEffect(()=>{
//     getExams()
//   },[])
//   return (
//     user && <div>
//       <PageTitle title={`Hi ${user.name}, Welcome to Quiz Portal`}/>
//       <div className='divider'></div>
//       <Row gutter={[16,16]} className="mt-2">
//         {exams&&exams.map((exam,index)=>{
//            return (
//             <Col span={6} key={index}>
//               <div className='card-lg flex flex-col gap-1 p-2'>
//                 <h1 className='text-2xl'>
//                   {exam.name}
//                 </h1>
//                 <div className='divider'>
//                 </div>
//                 <h1 className='text-md'>
//                   Category: {exam.category}
//                 </h1>
//                 <h1 className='text-md'>
//                   Total Questions: {exam.questions.length}
//                 </h1>
//                 <h1 className='text-md'>
//                   Total Marks: {exam.totalMarks}
//                 </h1>
//                 <h1 className='text-md'>
//                   Passing Marks: {exam.passingMarks}
//                 </h1>
//                 <h1 className='text-md'>
//                   Duration: {exam.duration}
//                 </h1>
//                 <button className='primary-outlined-btn cursor-pointer'
//                 onClick={()=>navigate(`/user/write-exam/${exam._id}`)}>
//                   Start Exam
//                 </button>
//               </div>
//             </Col>
//            )
//         })}
//       </Row>
//     </div>
//   )
// }

// export default HomePage




// import { message, Row, Col } from 'antd';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getAllExams } from '../../../apicalls/exams';
// import PageTitle from '../../../components/PageTitle';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

// function HomePage() {
//   const [exams, setExams] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(state => state.users.user);

//   const getExams = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllExams();
//       dispatch(HideLoading());
//       if (response.success) {
//         message.success(response.message);
//         setExams(response.data);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getExams();
//   }, []);

//   return (
//     user && (
//       <div>
//         <PageTitle title={`Hi ${user.name}, Welcome to Quiz Portal`} />
//         <div className='divider'></div>
//         <Row gutter={[16, 16]} className='mt-2'>
//           {exams &&
//             exams.map((exam, index) => {
//               return (
//                 <Col span={6} key={index}>
//                   <div className='card-lg flex flex-col gap-1 p-2'>
//                     {/* Display the quiz title */}
//                     <h1 className='text-2xl'>Quiz Title: {exam.title}</h1>

//                     {/* Display the total number of questions */}
//                     <h1 className='text-md'>
//                       Total No. of Questions: {exam.questions.length}
//                     </h1>

//                     <button
//                       className='primary-outlined-btn cursor-pointer'
//                       // onClick={() => navigate(`/user/write-exam/${exam._id}`)}
//                     >
//                       Start Exam
//                     </button>
//                   </div>
//                 </Col>
//               );
//             })}
//         </Row>
//       </div>
//     )
//   );
// }

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllExams } from '../../../apicalls/exams';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

function HomePage() {
  const [exams, setExams] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());

      // if (response.success) {
      if (response) {
        // message.success(response.message);
        console.log("Home page ka hoon mai ")
        console.log(response); // Debug check
        setExams(response);
        // const formattedExams = response.map((quiz) => ({
        //   _id: quiz._id, // Include quiz ID for action purposes
        //   title: quiz.title, // Fetch quiz title
        //   totalQuestions: quiz.questions.length || 0, // Calculate total number of questions
        // }));
        // setExams(formattedExams); // Set the formatted exams in the state
      } else {

        console.log("Home page ki error hoon mai ");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      console.log("Home page ki khntk error hoon mai ")
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);
  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user.name}, Welcome to Quiz Portal`} />
        <div className='divider'></div>
        <Row gutter={[16, 16]} className='mt-2'>
          {exams && exams.length > 0 ? (
            exams.map((exam) => (
              <Col xs={24} sm={12} md={8} lg={6} key={exam._id}>
                <div className='card-lg flex flex-col gap-1 p-2'>
                  {/* Display the quiz title */}
                  <h1 className='text-2xl'>Quiz Title: {exam.title}</h1>

                  {/* Display the total number of questions */}
                  <h1 className='text-md'>
                    Total No. of Questions: {exam.questions.length}
                  </h1>

                  <button
                    className='primary-outlined-btn cursor-pointer'
                    onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                  >
                    Start Exam
                  </button>
                </div>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div className='card-lg flex justify-center p-2'>
                <h1 className='text-md'>No quizzes available</h1>
              </div>
            </Col>
          )}
        </Row>
      </div>
    )
  );
}

export default HomePage;
