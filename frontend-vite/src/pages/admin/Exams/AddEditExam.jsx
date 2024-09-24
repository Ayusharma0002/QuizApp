// import React,{useState,useEffect} from 'react';
// import PageTitle from '../../../components/PageTitle';
// import { Form, Row, Col, message, Tabs, Table } from 'antd';
// import { useNavigate, useParams } from 'react-router-dom';
// import { addExam, deleteQuestionFromExam, editExam, getExamById } from '../../../apicalls/exams';
// import { useDispatch } from 'react-redux';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import AddEditQuestion from './AddEditQuestion';

// function AddEditExam() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {id} = useParams()
//   const [examData,setExamData] = useState();
//   const [showAddEditQuestionModal, setShowAddEditQuestionModal] = useState(false)
//   const [selectedQuestion, setSelectedQuestion] = useState()
//   const onFinish = async(values) => {
//      try{
//        dispatch(ShowLoading())
//        let response;
//        if(id){
//          response = await editExam(values,id)
//        }
//        else{
//          response = await addExam(values)
//        }
//        dispatch(HideLoading())
//        if(response.success){
//         message.success(response.message)
//         navigate("/admin/exams")
//        }
//        else{
//         message.error(response.message)
//        }
//      }
//      catch(error){
//           dispatch(HideLoading())
//           message.error(error.message)
//      }
//   }
//   const getExamDataById = async(id) => {
//       try{
//          dispatch(ShowLoading())
//          const response = await getExamById(id)
//          dispatch(HideLoading())
//          if(response.success){
//             message.success(response.message)
//             setExamData(response.data)
//          }
//          else{
//             message.error(response.message)
//          }
//       }
//       catch(error){
//          dispatch(HideLoading())
//          message.error(error.message)
//       }
//   }
//   useEffect(()=>{
//     if(id){
//       getExamDataById(id)
//     }
//   },[])
//   const deleteQuestionById = async(questionId) =>{
//     try{
//       const reqPayload = {
//          questionId: questionId
//       }
//       dispatch(ShowLoading())
//       const response = await deleteQuestionFromExam(id,reqPayload)
//       dispatch(HideLoading())
//       if(response.success){
//          message.success(response.message)
//          getExamDataById(id)
//       }
//       else{
//          message.error(response.message)
//       }
//     }
//     catch(error){
//       dispatch(HideLoading())
//       message.error(error.message)
//     }
//   }
//   const questionColumns = [
//    {
//       title: "Question",
//       dataIndex: "name"
//    },
//    {
//       title: "Options",
//       dataIndex: "options",
//       render: (text,record) => {
//          return Object.keys(record.options).map((key)=>{
//             return <div>{key} : {record.options[key]}</div>
//          })
//       }
//    },
//    {
//       title: "Correct Option",
//       dataIndex: "correctOption",
//       render: (text,record) => {
//          return `${record.correctOption}. ${record.options[record.correctOption]}`;
//       }
//    },
//    {
//       title: "Action",
//       dataIndex: "action",
//       render: (text,record) => {
//          return (
//             <div className='flex gap-2'>
//               <i className='ri-pencil-line cursor-pointer'
//                onClick={()=>{
//                   setSelectedQuestion(record)
//                   setShowAddEditQuestionModal(true)
//                }}></i>
//               <i className='ri-delete-bin-line cursor-pointer' onClick={()=>{deleteQuestionById(record._id)}}></i>
//             </div>
//          )
//       }
//    }
// ]
//   return (
//     <div>
//         <PageTitle title={id?'Edit Exam':'Add Exam'}/>
//         <div className='divider'></div>
//         {(examData || !id) && <Form layout="vertical" onFinish={onFinish} initialValues={examData} className="mt-2">
//         <Tabs defaultActiveKey="1">
//           <Tabs.TabPane tab="Exam Details" key="1">
//           <Row gutter={[10,10]}>
//                 <Col span={8}>
//                    <Form.Item label="Exam Name" name="name">
//                     <input type="text"/>
//                    </Form.Item>
//                 </Col>
//                 {/* <Col span={8}>
//                    <Form.Item label="Exam Duration" name="duration">
//                     <input type="number" min={0}/>
//                    </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                    <Form.Item label="Category" name="category">
//                     <select>
//                     <option value="JavaScript">JavaScript</option>
//                     <option value="Nodejs">Nodejs</option>
//                     <option value="React">React</option>
//                     <option value="MongoDb">MongoDb</option>
//                     </select>
//                    </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                    <Form.Item label="Total Marks" name="totalMarks">
//                     <input type="number" min={0}/>
//                    </Form.Item>
//                 </Col>
//                 <Col span={8}>
//                    <Form.Item label="Passing Marks" name="passingMarks">
//                     <input type="number" min={0}/>
//                    </Form.Item>
//                 </Col> */}
//             </Row>
//             <div className='flex justify-end gap-2'>
//              <button className='primary-outlined-btn w-15 cursor-pointer' type="submit">
//                 Save
//              </button>
//              <button className='primary-contained-btn w-15 cursor-pointer'
//              onClick={()=>navigate('/admin/exams')}
//              >
//                 Cancel
//              </button>
//             </div>
//           </Tabs.TabPane>
//           {id && <Tabs.TabPane tab="Questions" key="2">
//               <div className='flex justify-end'> 
//               <button className="primary-outlined-btn cursor-pointer"
//               type="button"
//               onClick={()=>{
//                setShowAddEditQuestionModal(true)
//               }}>Add Question</button>
//               </div>
//               <Table columns={questionColumns} dataSource={examData?.questions} className="mt-1">

//               </Table>
//           </Tabs.TabPane>}
//         </Tabs>
//         </Form>}
//         {showAddEditQuestionModal&&<AddEditQuestion   setShowAddEditQuestionModal={setShowAddEditQuestionModal}
//          showAddEditQuestionModal={showAddEditQuestionModal}
//          examId = {id}
//          refreshData = {getExamDataById}
//          selectedQuestion={selectedQuestion}
//          setSelectedQuestion={setSelectedQuestion}
//         />}
//     </div>
//   )
// }

// export default AddEditExam



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Input, Button, message } from 'antd';
// import { addExam } from '../../../apicalls/exams';
// import { useDispatch } from 'react-redux';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

// function AddEditExam() {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await addExam({
//         title: values.title, // Send title in payload
//         // Add other fields as needed (like duration, totalMarks, etc.)
//       });
//       dispatch(HideLoading());
//       if (response.success) {
//         message.success('Quiz created successfully');
//         navigate('/admin/exams');
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error('Error occurred while creating exam');
//     }
//   };

//   return (
//     <div className="container">
//       <Form form={form} onFinish={onFinish} layout="vertical">
//         <Form.Item
//           label="Quiz Title"
//           name="title"
//           rules={[{ required: true, message: 'Please enter the quiz title' }]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Save Quiz
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default AddEditExam;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { addExam, getExamById, editExam } from '../../../apicalls/exams';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import AddEditQuestion from './AddEditQuestion';

function AddEditExam() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Check if we are editing
  const [examData, setExamData] = useState(null);

  // Fetch existing exam data if editing
  const fetchExamData = async () => {
    if (id) {
      console.log(`kya hall hai ${id}`);
      try {
        dispatch(ShowLoading());
        const response = await getExamById(id);
        console.log(`kya hall hai ${response}`);
        dispatch(HideLoading());
        if (response.success) {
          setExamData(response.data);
          form.setFieldsValue(response.data); // Set form fields with existing data
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error('Failed to load exam data');
      }
    }
  };

  // Call fetchExamData when component loads (if editing)
  useEffect(() => {
    fetchExamData();
  }, [id]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
  
      if (id) {
        // Editing an existing exam
        response = await editExam(values, id);
      } else {
        // Creating a new exam
        response = await addExam(values);
      }
  
      dispatch(HideLoading());
  
      // Log the entire response object for debugging
      console.log("API Response:", response);
  
      if (response && response._id) {
        message.success(`Quiz ${id ? 'updated' : 'created'} successfully`);
        console.log("smjhe kya .........");
        console.log(response._id);
        
        // Redirect to questions page after creating/editing
        navigate(`/quiz/${response._id}/questions`);
      } else {
        console.log("Failure:", response?.message || "No _id in response");
        message.error(response?.message || 'An error occurred');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error('Error occurred while saving exam');
    }
  };
  

  return (
    <div className="container">
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={examData || {}}>
        <Form.Item
          label="Quiz Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the quiz title' }]}
        >
          <Input />
        </Form.Item>

        {/* Add more fields as needed (e.g., duration, total marks, etc.) */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? 'Update Quiz' : 'Save Quiz'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddEditExam;
