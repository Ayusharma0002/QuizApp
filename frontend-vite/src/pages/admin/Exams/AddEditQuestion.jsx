// import React from 'react'
// import { Modal, Form, message } from 'antd'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
// import { useDispatch } from 'react-redux'
// import { addQuestionToExam, editQuestionInExam } from '../../../apicalls/exams'

// function AddEditQuestion(props) {
//   const {showAddEditQuestionModal,setShowAddEditQuestionModal,quizId,refreshData, selectedQuestion, setSelectedQuestion} = props
//   const dispatch = useDispatch()
//   const onFinish = async(values) => {
//    try{
//      dispatch(ShowLoading())
//      let response;
//      if(selectedQuestion){
//       const requiredPayload1 = {
//         name: values.name,
//         correctOption: values.correctOption,
//         options: {
//           A: values.A,
//           B: values.B,
//           C: values.C,
//           D: values.D
//         },
//         exam: quizId,
//         questionId: selectedQuestion?.quizId
//        }
//        response = await editQuestionInExam(requiredPayload1, quizId)
//      }
//      else{
//       const requiredPayload2 = {
//         name: values.name,
//         correctOption: values.correctOption,
//         options: {
//           A: values.A,
//           B: values.B,
//           C: values.C,
//           D: values.D
//         },
//         exam: quizId,
//        }
//       response = await addQuestionToExam(requiredPayload2,quizId)
//      }
//      dispatch(HideLoading())
//      if(response.success){
//       message.success(response.message)
//       refreshData(quizId)
//       setShowAddEditQuestionModal(false)
//      }
//      else{
//       message.error(response.message)
//       setShowAddEditQuestionModal(false)
//      }
//    }
//    catch(error){
//     dispatchEvent(HideLoading())
//     setShowAddEditQuestionModal(false)
//     message.error(error.message)
//    }
//   }
//   return (
//     <Modal title={selectedQuestion? "Edit Question" : "Add Question"} open={showAddEditQuestionModal} footer={false} onCancel={()=>{
//       setShowAddEditQuestionModal(false)
//       setSelectedQuestion()
//       }}>
//      <Form onFinish={onFinish} layout="vertical" initialValues={{
//        name: selectedQuestion?.name,
//        correctOption: selectedQuestion?.correctOption,
//        A: selectedQuestion?.options.A,
//        B: selectedQuestion?.options.B,
//        C: selectedQuestion?.options.C,
//        D: selectedQuestion?.options.D,
//      }}>
//        <Form.Item name="name" label="Question">
//         <input type="text"/>
//        </Form.Item>
//        <Form.Item name="correctOption" label="Correct Option">
//         <input type="text"/>
//        </Form.Item>
//        <div className='flex gap-2'>
//        <Form.Item name="A" label="Option A">
//         <input type="text"/>
//        </Form.Item>
//        <Form.Item name="B" label="Option B">
//         <input type="text"/>
//        </Form.Item>
//        </div>
//        <div className='flex gap-2'>
//        <Form.Item name="C" label="Option C">
//         <input type="text"/>
//        </Form.Item>
//        <Form.Item name="D" label="Option D">
//         <input type="text"/>
//        </Form.Item>
//        </div>
//        <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn'
//           type="submit"
//           >
//            Save
//           </button>
//           <button className='primary-outlined-btn'
//           type="button"
//           onClick={()=>{
//             setShowAddEditQuestionModal(false)
//             setSelectedQuestion()
//           }}
//           >
//            Cancel
//           </button>
//        </div>
//      </Form>
//     </Modal>
//   )
// }

// export default AddEditQuestion
// import React from 'react'
// import { Modal, Form, Input, Select, message } from 'antd'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
// import { useDispatch } from 'react-redux'
// import { addQuestionToExam, editQuestionInExam } from '../../../apicalls/exams'

// function AddEditQuestion(props) {
//   // const { showAddEditQuestionModal, setShowAddEditQuestionModal, quizId, refreshData, selectedQuestion, setSelectedQuestion } = props
//   const { quizId } = props
//   const dispatch = useDispatch()

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading())
//       let response
//       const payload = {
//         name: values.name,
//         category: values.category,
//         correctOption: values.correctOption,
//         options: {
//           A: { text: values.A, category: values.A_category, marks: values.A_marks },
//           B: { text: values.B, category: values.B_category, marks: values.B_marks },
//           C: { text: values.C, category: values.C_category, marks: values.C_marks },
//           D: { text: values.D, category: values.D, marks: values.D_marks },
//         },
//         exam: quizId,
//         questionId: selectedQuestion?.quizId
//       }

//       if (selectedQuestion) {
//         // Edit question logic
//         response = await editQuestionInExam(payload, selectedQuestion.quizId)
//       } else {
//         // Add question logic
//         response = await addQuestionToExam(payload, quizId)
//       }

//       dispatch(HideLoading())
//       if (response.success) {
//         message.success(response.message)
//         refreshData(quizId)
//         setShowAddEditQuestionModal(false)
//         setSelectedQuestion(null) // Clear selected question after saving
//       } else {
//         message.error(response.message)
//       }
//     } catch (error) {
//       dispatch(HideLoading())
//       message.error(error.message)
//     }
//   }

//   return (
//     <Modal
//       title={selectedQuestion ? "Edit Question" : "Add Question"}
//       open={showAddEditQuestionModal}
//       footer={false}
//       onCancel={() => {
//         setShowAddEditQuestionModal(false)
//         setSelectedQuestion(null) // Clear selected question on cancel
//       }}
//     >
//       <Form
//         onFinish={onFinish}
//         layout="vertical"
//         initialValues={{
//           name: selectedQuestion?.name,
//           category: selectedQuestion?.category,
//           correctOption: selectedQuestion?.correctOption,
//           A: selectedQuestion?.options?.A?.text,
//           B: selectedQuestion?.options?.B?.text,
//           C: selectedQuestion?.options?.C?.text,
//           D: selectedQuestion?.options?.D?.text,
//           A_category: selectedQuestion?.options?.A?.category,
//           B_category: selectedQuestion?.options?.B?.category,
//           C_category: selectedQuestion?.options?.C?.category,
//           D_category: selectedQuestion?.options?.D?.category,
//           A_marks: selectedQuestion?.options?.A?.marks,
//           B_marks: selectedQuestion?.options?.B?.marks,
//           C_marks: selectedQuestion?.options?.C?.marks,
//           D_marks: selectedQuestion?.options?.D?.marks,
//         }}
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical">Technical</Select.Option>
//             <Select.Option value="Human">Human</Select.Option>
//             <Select.Option value="Conceptual">Conceptual</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="correctOption" label="Correct Option" rules={[{ required: true, message: 'Please specify the correct option' }]}>
//           <Select>
//             <Select.Option value="A">A</Select.Option>
//             <Select.Option value="B">B</Select.Option>
//             <Select.Option value="C">C</Select.Option>
//             <Select.Option value="D">D</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_category" label="Option A Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_category" label="Option B Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_category" label="Option C Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_category" label="Option D Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button" onClick={() => {
//             setShowAddEditQuestionModal(false)
//             setSelectedQuestion(null)
//           }}>
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   )
// }

// export default AddEditQuestion
// import React from 'react'
// import { Modal, Form, Input, Select, message } from 'antd'
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
// import { useDispatch } from 'react-redux'
// import { addQuestionToExam } from '../../../apicalls/exams'
// import { useParams } from 'react-router-dom'

// function AddEditQuestion() {
//   // const { showAddEditQuestionModal, setShowAddEditQuestionModal, quizId, refreshData } = props
//   // const {quizId}=useParams();
//   const { quizId } = useParams(); // Extract quizId from URL params

//   console.log(quizId);
//   const dispatch = useDispatch()

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading())
//       const payload = {
//         name: values.name,
//         category: values.category,
//         correctOption: values.correctOption,
//         options: {
//           A: { text: values.A, category: values.A_category, marks: values.A_marks },
//           B: { text: values.B, category: values.B_category, marks: values.B_marks },
//           C: { text: values.C, category: values.C_category, marks: values.C_marks },
//           D: { text: values.D, category: values.D_category, marks: values.D_marks },
//         },
//         exam: quizId,
//       }

//       const response = await addQuestionToExam(payload, quizId)
//       dispatch(HideLoading())
//       if (response.success) {
//         message.success(response.message)
//         // refreshData(quizId)
//         // setShowAddEditQuestionModal(false)
//       } else {
//         message.error(response.message)
//       }
//     } catch (error) {
//       dispatch(HideLoading())
//       message.error(error.message)
//     }
//   }

//   return (
//     <Modal
//       title="Add Question"
//     //  open={showAddEditQuestionModal}
//       footer={false}
//       // onCancel={() => setShowAddEditQuestionModal(false)}
//     >
//       <Form
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical">Technical</Select.Option>
//             <Select.Option value="Human">Human</Select.Option>
//             <Select.Option value="Conceptual">Conceptual</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="correctOption" label="Correct Option" rules={[{ required: true, message: 'Please specify the correct option' }]}>
//           <Select>
//             <Select.Option value="A">A</Select.Option>
//             <Select.Option value="B">B</Select.Option>
//             <Select.Option value="C">C</Select.Option>
//             <Select.Option value="D">D</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_category" label="Option A Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_category" label="Option B Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_category" label="Option C Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_category" label="Option D Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button" 
//           // onClick={() => setShowAddEditQuestionModal(false)}>
//             >Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   )
// }

// export default AddEditQuestion
// import React from 'react';
// import { Modal, Form, Input, Select, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { addQuestionToExam } from '../../../apicalls/exams';
// import { useParams } from 'react-router-dom';

// function AddEditQuestion() {
//   const { quizId } = useParams(); // Extract quizId from URL params
//   const dispatch = useDispatch();
//   console.log(quizId);

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading());
//       const payload = {
//         name: values.name,
//         category: values.category,
//         correctOption: values.correctOption,
//         options: {
//           A: { text: values.A, category: values.A_category, marks: values.A_marks },
//           B: { text: values.B, category: values.B_category, marks: values.B_marks },
//           C: { text: values.C, category: values.C_category, marks: values.C_marks },
//           D: { text: values.D, category: values.D_category, marks: values.D_marks },
//         },
//         exam: quizId, // Use quizId instead of _id
//       };

//       const response = await addQuestionToExam(payload);
//       dispatch(HideLoading());

//       if (response.success) {
//         message.success(response.message);
//         // Optionally, refresh data or perform additional actions here
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   return (
//     <Modal
//       title="Add Question"
//       footer={false}
//     >
//       <Form
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical">Technical</Select.Option>
//             <Select.Option value="Human">Human</Select.Option>
//             <Select.Option value="Conceptual">Conceptual</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="correctOption" label="Correct Option" rules={[{ required: true, message: 'Please specify the correct option' }]}>
//           <Select>
//             <Select.Option value="A">A</Select.Option>
//             <Select.Option value="B">B</Select.Option>
//             <Select.Option value="C">C</Select.Option>
//             <Select.Option value="D">D</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_category" label="Option A Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_category" label="Option B Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_category" label="Option C Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_category" label="Option D Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button">
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default AddEditQuestion;
// import React, { useState } from 'react';
// import { Modal, Form, Input, Select, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { addQuestionToExam } from '../../../apicalls/exams';
// import { useParams } from 'react-router-dom';

// function AddEditQuestion() {
//   const { quizId } = useParams(); // Extract quizId from URL params
//   console.log(quizId);
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(true); // State to control modal visibility

//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading());
//       const payload = {
//         name: values.name,
//         category: values.category,
//         correctOption: values.correctOption,
//         options: {
//           A: { text: values.A, category: values.A_category, marks: values.A_marks },
//           B: { text: values.B, category: values.B_category, marks: values.B_marks },
//           C: { text: values.C, category: values.C_category, marks: values.C_marks },
//           D: { text: values.D, category: values.D_category, marks: values.D_marks },
//         },
//         exam: quizId, // Use quizId instead of _id
//       };

//       const response = await addQuestionToExam(payload);
//       dispatch(HideLoading());

//       if (response.success) {
//         message.success(response.message);
//         setIsModalVisible(false); // Hide modal on success
//         // Optionally, refresh data or perform additional actions here
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   return (
//     <Modal
//       title="Add Question"
//       visible={isModalVisible} // Control modal visibility with state
//       onCancel={() => setIsModalVisible(false)} // Hide modal on cancel
//       footer={null}
//     >
//       <Form
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical">Technical</Select.Option>
//             <Select.Option value="Human">Human</Select.Option>
//             <Select.Option value="Conceptual">Conceptual</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="correctOption" label="Correct Option" rules={[{ required: true, message: 'Please specify the correct option' }]}>
//           <Select>
//             <Select.Option value="A">A</Select.Option>
//             <Select.Option value="B">B</Select.Option>
//             <Select.Option value="C">C</Select.Option>
//             <Select.Option value="D">D</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_category" label="Option A Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_category" label="Option B Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_category" label="Option C Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_category" label="Option D Category" rules={[{ required: true, message: 'Please select a category' }]}>
//             <Select>
//               <Select.Option value="Technical">Technical</Select.Option>
//               <Select.Option value="Human">Human</Select.Option>
//               <Select.Option value="Conceptual">Conceptual</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button" onClick={() => setIsModalVisible(false)}>
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default AddEditQuestion;
// import React, { useState } from 'react';
// // import { Modal, Form, Input, message } from 'antd';
// import { Modal, Form, Input, Select, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { addQuestionToExam } from '../../../apicalls/exams';
// import { useParams } from 'react-router-dom';

// function AddEditQuestion() {
//   const { quizId } = useParams(); // Extract quizId from URL params
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(true); // State to control modal visibility
//   const [form] = Form.useForm(); // Create form instance

//   // const onFinish = async (values) => {
//   //   try {
//   //     dispatch(ShowLoading());
//   //     const payload = {
//   //       name: values.name,
//   //       category: values.category, // Add category for the question
//   //       options: {
//   //         A: { text: values.A, marks: values.A_marks },
//   //         B: { text: values.B, marks: values.B_marks },
//   //         C: { text: values.C, marks: values.C_marks },
//   //         D: { text: values.D, marks: values.D_marks },
//   //         E: { text: values.E, marks: values.E_marks },
//   //       },
//   //       exam: quizId, // Use quizId instead of _id
//   //     };

//   //     const response = await addQuestionToExam(payload);
//   //     dispatch(HideLoading());

//   //     if (response.success) {
//   //       message.success('Question added successfully');
//   //       form.resetFields(); // Reset form fields after successful save
//   //     } else {
//   //       message.error(response.message);
//   //     }
//   //   } catch (error) {
//   //     dispatch(HideLoading());
//   //     message.error(error.message);
//   //   }
//   // };
//   // const onFinish = async (values) => {
//   //   try {
//   //     dispatch(ShowLoading());
//   //     const payload = [
//   //       {
//   //         name: values.name,
//   //         category: values.category,
//   //         options: [
//   //           { text: values.A, marks: values.A_marks },
//   //           { text: values.B, marks: values.B_marks },
//   //           { text: values.C, marks: values.C_marks },
//   //           { text: values.D, marks: values.D_marks },
//   //           { text: values.E, marks: values.E_marks },
//   //         ],
//   //       }
//   //     ];
  
//   //     const response = await addQuestionToExam(payload);
//   //     dispatch(HideLoading());
  
//   //     if (response.success) {
//   //       message.success('Question added successfully');
//   //       form.resetFields();
//   //     } else {
//   //       message.error(response.message);
//   //     }
//   //   } catch (error) {
//   //     dispatch(HideLoading());
//   //     message.error(error.message);
//   //   }
//   // };

// //   const onFinish = async (values) => {
// //     try {
// //         dispatch(ShowLoading());
// //         const payload = {
// //             questionText: values.name, // Update to match backend field names
// //             category: values.category,
// //             options: [
// //                 { text: values.A, marks: values.A_marks },
// //                 { text: values.B, marks: values.B_marks },
// //                 { text: values.C, marks: values.C_marks },
// //                 { text: values.D, marks: values.D_marks },
// //                 { text: values.E, marks: values.E_marks }
// //             ]
// //         };

// //         const response = await addQuestionToExam(payload); // Make sure this function sends a single object, not an array
// //         dispatch(HideLoading());

// //         if (response.success) {
// //             message.success('Question added successfully');
// //             form.resetFields(); // Reset form fields after successful save
// //         } else {
// //             message.error(response.message);
// //         }
// //     } catch (error) {
// //         dispatch(HideLoading());
// //         message.error(error.message);
// //     }
// // };
// const onFinish = async (values) => {
//   try {
//       if (!quizId) {
//           throw new Error('Quiz ID is not defined');
//       }

//       const payload = {
//           questionText: values.name,
//           category: values.category,
//           options: [
//               { text: values.A, marks: values.A_marks },
//               { text: values.B, marks: values.B_marks },
//               { text: values.C, marks: values.C_marks },
//               { text: values.D, marks: values.D_marks },
//               { text: values.E, marks: values.E_marks }
//           ]
//       };
// // 
//       // const response = await addQuestionToExam({quizId}, payload); // Ensure quizId is correctly passed
//       // const response = await addQuestionToExam(quizId, payload); // Ensure quizId is correctly passed
//       const response = await addQuestionToExam(payload,quizId); // Ensure quizId is correctly passed
//       dispatch(HideLoading());

//       if (response.success) {
//           message.success('Question added successfully');
//           form.resetFields();
//       } else {
//           message.error(response.message);
//       }
//   } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//   }
// };

  

//   return (
//     <Modal
//       title="Add Question"
//       visible={isModalVisible} // Control modal visibility with state
//       onCancel={() => setIsModalVisible(false)} // Hide modal on cancel
//       footer={null}
//     >
//       <Form
//         form={form}
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical Skills">Technical Skills</Select.Option>
//             <Select.Option value="Human Skills">Human Skills</Select.Option>
//             <Select.Option value="Conceptual Skills">Conceptual Skills</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks for Option A" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks for Option B" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks for Option C" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks for Option D" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="E" label="Option E" rules={[{ required: true, message: 'Please enter option E' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="E_marks" label="Marks for Option E" rules={[{ required: true, message: 'Please enter marks for option E' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button" onClick={() => setIsModalVisible(false)}>
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default AddEditQuestion;
// import React, { useState } from 'react';
// import { Modal, Form, Input, Select, message } from 'antd';
// import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
// import { useDispatch } from 'react-redux';
// import { addQuestionToExam } from '../../../apicalls/exams';
// import { useParams } from 'react-router-dom';

// function AddEditQuestion() {
//   const { quizId } = useParams(); // Extract quizId from URL params
//   const dispatch = useDispatch();
//   const [isModalVisible, setIsModalVisible] = useState(true); // State to control modal visibility
//   const [form] = Form.useForm(); // Create form instance

//   const onFinish = async (values) => {
//     try {
//       if (!quizId) {
//         throw new Error('Quiz ID is not defined');
//       }

//       const payload = {
//         questionText: values.name,
//         category: values.category,
//         options: [
//           { text: values.A, marks: parseInt(values.A_marks) },
//           { text: values.B, marks: parseInt(values.B_marks) },
//           { text: values.C, marks: parseInt(values.C_marks) },
//           { text: values.D, marks: parseInt(values.D_marks) },
//           { text: values.E, marks: parseInt(values.E_marks) }
//         ]
//       };

//       const response = await addQuestionToExam(payload, quizId); // Ensure quizId is correctly passed
//       dispatch(HideLoading());

//       if (response.message === 'Questions added successfully') {
//         message.success('Question added successfully');
//         form.resetFields(); // Reset form fields after successful save
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   return (
//     <Modal
//       title="Add Question"
//       visible={isModalVisible} // Control modal visibility with state
//       onCancel={() => setIsModalVisible(false)} // Hide modal on cancel
//       footer={null}
//     >
//       <Form
//         form={form}
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
//           <Select>
//             <Select.Option value="Technical Skills">Technical Skills</Select.Option>
//             <Select.Option value="Human Skills">Human Skills</Select.Option>
//             <Select.Option value="Conceptual Skills">Conceptual Skills</Select.Option>
//           </Select>
//         </Form.Item>

//         <div className='flex gap-2'>
//           <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="A_marks" label="Marks for Option A" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="B_marks" label="Marks for Option B" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="C_marks" label="Marks for Option C" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="D_marks" label="Marks for Option D" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex gap-2'>
//           <Form.Item name="E" label="Option E" rules={[{ required: true, message: 'Please enter option E' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="E_marks" label="Marks for Option E" rules={[{ required: true, message: 'Please enter marks for option E' }]}>
//             <Input type="number" />
//           </Form.Item>
//         </div>

//         <div className='flex justify-end gap-2 mt-2'>
//           <button className='primary-contained-btn' type="submit">
//             Save
//           </button>
//           <button className='primary-outlined-btn' type="button" onClick={() => setIsModalVisible(false)}>
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default AddEditQuestion;



import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { addQuestionToExam } from '../../../apicalls/exams';
import { useParams ,useNavigate} from 'react-router-dom';

function AddEditQuestion() {
  const { quizId } = useParams(); // Extract quizId from URL params
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(true); // State to control modal visibility
  const [form] = Form.useForm(); // Create form instance
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      if (!quizId) {
        throw new Error('Quiz ID is not defined');
      }

      const payload = {
        questionText: values.name,
        category: values.category,
        options: [
          { text: values.A, marks: parseInt(values.A_marks) },
          { text: values.B, marks: parseInt(values.B_marks) },
          { text: values.C, marks: parseInt(values.C_marks) },
          { text: values.D, marks: parseInt(values.D_marks) },
          { text: values.E, marks: parseInt(values.E_marks) }
        ]
      };

      dispatch(ShowLoading());
      const response = await addQuestionToExam(payload, quizId); // Ensure quizId is correctly passed
      dispatch(HideLoading());
      form.resetFields()

      if (response.message === 'Questions added successfully') {
        message.success('Question added successfully');
        form.resetFields(); // Reset form fields after successful save
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Add Question"
      visible={isModalVisible} // Control modal visibility with state
      onCancel={() => setIsModalVisible(false)} // Hide modal on cancel
      footer={null}
      width="100vw" // Fullscreen width
      style={{ top: 0 }} // Top-aligned modal
      bodyStyle={{ height: "100vh", backgroundColor: 'transparent', overflow: 'hidden' }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="w-full h-full flex flex-col justify-between" // Takes full height of modal
  >
        <Form.Item name="name" label="Question" rules={[{ required: true, message: 'Please enter the question' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="category" label="Question Category" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select>
            <Select.Option value="Technical Skills">Technical Skills</Select.Option>
            <Select.Option value="Human Skills">Human Skills</Select.Option>
            <Select.Option value="Conceptual Skills">Conceptual Skills</Select.Option>
          </Select>
        </Form.Item>

        <div className='flex gap-2'>
          <Form.Item name="A" label="Option A" rules={[{ required: true, message: 'Please enter option A' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="A_marks" label="Marks for Option A" rules={[{ required: true, message: 'Please enter marks for option A' }]}>
            <Input type="number" />
          </Form.Item>
        </div>

        <div className='flex gap-2'>
          <Form.Item name="B" label="Option B" rules={[{ required: true, message: 'Please enter option B' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="B_marks" label="Marks for Option B" rules={[{ required: true, message: 'Please enter marks for option B' }]}>
            <Input type="number" />
          </Form.Item>
        </div>

        <div className='flex gap-2'>
          <Form.Item name="C" label="Option C" rules={[{ required: true, message: 'Please enter option C' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="C_marks" label="Marks for Option C" rules={[{ required: true, message: 'Please enter marks for option C' }]}>
            <Input type="number" />
          </Form.Item>
        </div>

        <div className='flex gap-2'>
          <Form.Item name="D" label="Option D" rules={[{ required: true, message: 'Please enter option D' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="D_marks" label="Marks for Option D" rules={[{ required: true, message: 'Please enter marks for option D' }]}>
            <Input type="number" />
          </Form.Item>
        </div>

        <div className='flex gap-2'>
          <Form.Item name="E" label="Option E" rules={[{ required: true, message: 'Please enter option E' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="E_marks" label="Marks for Option E" rules={[{ required: true, message: 'Please enter marks for option E' }]}>
            <Input type="number" />
          </Form.Item>
        </div>

        <div className='flex justify-end gap-2 mt-2'>
          <button className='primary-contained-btn' type="submit" >
            Save
          </button>
          <button className='primary-outlined-btn' type="button" onClick={() => {
            navigate('/')
            setIsModalVisible(false)}
            }>
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
