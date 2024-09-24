import axiosInstance from ".";

// export const addExam = async(payload) => {
//     try{
//     //    const response = await axiosInstance.post('/api/exams/addExam',payload)
//        const response = await axiosInstance.post('/quiz',payload)
//        console.log(response.data);
//        return response.data
//     }
//     catch(error){
//      console.log("error ari exam create karne mai");
//         return error.response.data
//     }
// }
// export const addExam = async(payload) => {
//     try {
//         const response = await axiosInstance.post('/quiz', payload);
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error occurred while creating exam:", error.response ? error.response.data : error.message);
//         return error.response ? error.response.data : { message: "An error occurred" };
//     }
// }
// export const addExam = async (payload) => {
//     try {
//         const response = await axiosInstance.post('/quiz', payload);
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Error occurred while creating exam:", error.response ? error.response.data : error.message);
//         return error.response ? error.response.data : { message: "An error occurred" };
//     }
// }
export const addExam = async (payload) => {
    try {
      const response = await axiosInstance.post('/quiz', payload);
      console.log("hello bro");
      console.log(response.data);
      return response.data; // Make sure the backend sends a proper response
    } catch (error) {
      console.error("Error occurred while creating exam:", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : { message: "An error occurred" };
    }
  };
  


export const getAllExams = async() => {
    try{
    //    const response = await axiosInstance.get('/api/exams/getAllExams')
       const response = await axiosInstance.get('/quiz')
       console.log("Smjo hello bro mai get all exams hoon");
      console.log(response.data);
       return response.data
    }
    catch(error){
        console.error("Error occurred while getting all quizes :", error.response ? error.response.data : error.message);
      return error.response ? error.response.data : { message: "An error occurred" };
    }
}

export const getExamById = async(id) => {
    try{
       const response = await axiosInstance.get(`/quiz/${id}`);
       console.log("Smjo hello bro mai getExamById hoon");
       console.log(response.data);
       return response.data
    }
    catch(error){
        console.error("Error occurred while getting getExamById :", error.response ? error.response.data : error.message);
        return error.response.data
    }
}

export const editExam = async(payload,id) => {
    try{
      const response = await axiosInstance.put(`/api/exams//editExam/${id}`,payload)
      return response.data
    }
    catch(error){
        return error.response.data
    }
}

export const deleteExam = async(id) => {
    try{
        console.log(id);
      const response = await axiosInstance.delete(`/quiz/${id}`)
      console.log("quiz delete succesffuly");
      return response.data
    }
    catch(error){
        console.log("error in deleting quiz");
        return error.response.data
    }
}

// export const addQuestionToExam = async(payload,id) => {
//     try{
//         const response = await axiosInstance.post(`/quiz/${id}/questions`,payload)
//         return response.data
//     }
//     catch(error){
//         return error.response.data
//     }
// }
// Updated API call for adding a question to an exam
export const addQuestionToExam = async (payload, id) => {
    try {
        console.log("ID being passed:", id); // Add this line to debug
        const response = await axiosInstance.post(`/quiz/${id}/questions`, payload);
        console.log("mai to dar gya");
        return response.data;
    } catch (error) {
        console.error("Error occurred while adding question to exam:", error.response ? error.response.data : error.message);
        return error.response ? error.response.data : { message: "An error occurred" };
    }
};

export const editQuestionInExam = async(payload,id) => {
    try{
        const response = await axiosInstance.put(`/api/exams/editQuestionInExam/${id}`,payload)
        return response.data
    }
    catch(error){
        return error.response.data
    }
}

export const deleteQuestionFromExam = async(id,payload) => {
    try{
        const response = await axiosInstance.delete(`/api/exams/deleteQuestionFromExam/${id}`,payload)
        return response.data
    }
    catch(error){
        return error.response.data
    }
}