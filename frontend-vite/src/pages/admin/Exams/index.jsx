// import React, {useEffect, useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// import PageTitle from '../../../components/PageTitle'
// import {Table,message} from 'antd'
// import { useDispatch } from 'react-redux'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
// import { getAllExams, deleteExam } from '../../../apicalls/exams'

// function ExamsPage() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [exams,setExams] = useState([])
//   const columns = [
//     {
//       title: "Quiz Name",
//       dataIndex: "name",
//     },
//     // {
//     //   title: "Duration",
//     //   dataIndex: "duration"
//     // },
//     // {
//     //   title: "Category",
//     //   dataIndex: "category"
//     // },
//     // {
//     //   title: "Total Marks",
//     //   dataIndex: "totalMarks"
//     // },
//     // {
//     //   title: "Passing Marks",
//     //   dataIndex: "passingMarks"
//     // },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (text,record) => {
//         return <div className='flex gap-2'>
//           <i className='ri-pencil-line cursor-pointer'
//           onClick={()=>navigate(`/admin/exams/edit/${record._id}`)}></i>
//           {/* <i className='ri-delete-bin-line cursor-pointer' onClick={()=>{deleteExamById(record._id)}}></i> */}
//         </div>
//       }
//     }
//   ]
//   const getExamsData = async() => {
//     try{
//       dispatch(ShowLoading())
//       const response = await getAllExams()
//       dispatch(HideLoading())
//       if(response.success){
//        message.success(response.message)
//        setExams(response.data)
//       }
//       else{
//        message.error(response.message)
//       }
//     }
//     catch(error){
//          dispatch(HideLoading())
//          message.error(error.message)
//     }
//   }
//   const deleteExamById = async(id) => {
//     try{
//       dispatch(ShowLoading());
//       const response = await deleteExam(id);
//       dispatch(HideLoading())
//       if(response.success){
//         message.success(response.message);
//         getExamsData()
//       }
//       else{
//         message.error(response.message)
//       }
//     }
//     catch(error){
//       dispatch(HideLoading())
//       message.error(error.message)
//     }
//   }
//   useEffect(()=>{
//      getExamsData()
//   },[])
//   return (
//     <>
//     <div className='flex justify-between mt-1'>
//        <PageTitle title="Exams"/>
//        <button className='primary-outlined-btn flex items-center cursor-pointer' onClick={()=>navigate('/admin/exams/add')}>
//        {/* <button className='primary-outlined-btn flex items-center cursor-pointer' onClick={()=>navigate('/quiz')}> */}
//         <i className='ri-add-line'></i>
//         Add Exam
//        </button>
//     </div>
//     <div className='divider mt-1'></div>
//     <Table columns={columns} dataSource={exams}/>
//     </>
//   )
// }

// export default ExamsPage




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PageTitle from '../../../components/PageTitle';
// import { Table, message } from 'antd';
// import { useDispatch } from 'react-redux';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { getAllExams } from '../../../apicalls/exams';

// function ExamsPage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [exams, setExams] = useState([]);

//   // Define columns for the table
//   const columns = [
//     {
//       title: 'Quiz Name',
//       dataIndex: 'name', // Assuming 'name' is the field for quiz name
//     },
//     {
//       title: 'Total No. of Questions',
//       dataIndex: 'totalQuestions', // Assuming 'totalQuestions' will be provided in API response
//       render: (text, record) => record.questions.length, // Calculating the total questions based on the questions array
//     },
//     // {
//     //   title: 'Action',
//     //   dataIndex: 'action',
//     //   render: (text, record) => {
//     //     return (
//     //       <div className='flex gap-2'>
//     //         <i
//     //           className='ri-pencil-line cursor-pointer'
//     //           onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
//     //         ></i>
//     //         <i
//     //           className='ri-delete-bin-line cursor-pointer'
//     //           onClick={() => deleteExamById(record._id)}
//     //         ></i>
//     //       </div>
//     //     );
//     //   },
//     // },
//   ];

//   // Fetch the exams data from the API
//   const getExamsData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllExams();
//       dispatch(HideLoading());

//       if (response.success) {
//         console.log("all quizes are shown to me aayush(maa muje sab dik ra hai)");
//         setExams(response.data); // Set the exams data in the state
//       } else {
//         console.log("all quizes are not shown to me aayush(maa muje kuhc ni dik ra hai)");
//         message.error(response.message);
//       }
//     } catch (error) {
//       console.log("exams page ka hogya banta dhar");
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getExamsData(); // Fetch the exams data on component mount
//   }, []);

//   return (
//     <>
//       <div className='flex justify-between mt-1'>
//         <PageTitle title='Exams' />
//         <button
//           className='primary-outlined-btn flex items-center cursor-pointer'
//           onClick={() => navigate('/admin/exams/add')}
//         >
//           <i className='ri-add-line'></i>
//           Add Exam
//         </button>
//       </div>
//       <div className='divider mt-1'></div>
//       {/* Display the table with exams data */}
//       <Table
//         columns={columns}
//         dataSource={exams}
//         rowKey='_id' // Use _id as a unique key for each row
//         pagination={false} // Disable pagination for now
//         locale={{ emptyText: 'No data' }} // Show 'No data' when there are no exams
//       />
//     </>
//   );
// }

// export default ExamsPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getAllExams, deleteExam } from '../../../apicalls/exams'
import { DeleteOutlined } from '@ant-design/icons';

function ExamsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);

  // Define columns for the table
  const columns = [
    {
      title: 'Quiz Title',
      dataIndex: 'title', // Display quiz title
    },
    {
      title: 'Total No. of Questions',
      dataIndex: 'totalQuestions', // Display total number of questions
    },
    // If needed, add Action column
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className='flex gap-2'>
            {/* <i
              className='ri-pencil-line cursor-pointer'
              onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
            ></i> */}
            <DeleteOutlined
              onClick={() => deleteExamById(record._id)} />
            {/* <i
              className='ri-delete-bin-line cursor-pointer'
              onClick={() => deleteExamById(record._id)}
            ></i> */}
          </div>
        );
      },
    },
  ];

  // Fetch the exams (quizzes) data from the API
  // const getExamsData = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await getAllExams();
  //     dispatch(HideLoading());

  //     if (response) {
  //       // Extract quiz data from the response and calculate total questions
  //       const formattedExams = response.map((quiz) => ({
  //         title: quiz.title, // Fetch quiz title
  //         totalQuestions: quiz.questions.length || 0, // Calculate total number of questions
  //       }));
  //       setExams(formattedExams); // Set the formatted exams in the state
  //     } else {
  //       message.error('Failed to load quizzes');
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };
  const getExamsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      dispatch(HideLoading());

      if (response) {
        // Extract quiz data from the response and calculate total questions
        const formattedExams = response.map((quiz) => ({
          _id: quiz._id, // Include quiz ID for action purposes
          title: quiz.title, // Fetch quiz title
          totalQuestions: quiz.questions.length || 0, // Calculate total number of questions
        }));
        setExams(formattedExams); // Set the formatted exams in the state
      } else {
        message.error('Failed to load quizzes');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExamById = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteExam(id);
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        getExamsData()
      }
      else {
        message.error(response.message)
      }
    }
    catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }

  useEffect(() => {
    getExamsData(); // Fetch the exams data on component mount
  }, []);

  return (
    <>
      <div className='flex justify-between mt-1'>
        <PageTitle title='Exams' />
        <button
          className='primary-outlined-btn flex items-center cursor-pointer'
          onClick={() => navigate('/admin/exams/add')}
        >
          <i className='ri-add-line'></i>
          Add Exam
        </button>
      </div>
      <div className='divider mt-1'></div>
      {/* Display the table with exams data */}
      <Table
        columns={columns}
        dataSource={exams}
        rowKey='title' // Use the quiz title as a unique key for each row
        pagination={false} // Disable pagination for now
        locale={{ emptyText: 'No quizzes found' }} // Show this text when there are no quizzes
      />
    </>
  );
}

export default ExamsPage;
