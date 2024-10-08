// import axiosInstance from ".";

// export const addReport = async(payload) => {
//     try{
//         const response = await axiosInstance.post('/api/reports/addReport',payload)
//         return response.data
//     }
//     catch(error){
//         return error.response.data
//     }
// }

// export const getAllAttempts = async(payload) => {
//     try{
//         const response = await axiosInstance.post('/api/reports/getAllAttempts',payload)
//         return response.data
//     }
//     catch(error){
//         return error.response.data
//     }
// }


// export const getAllAttemptsByUser = async() => {
//     try{
//         const response = await axiosInstance.get('/api/reports/getAllAttemptsByUser')
//         return response.data
//     }
//     catch(error){
//         return error.response.data
//     }
// }
// import axiosInstance from ".";

// // Function to get all reports
// export const getReports = async (payload) => {
//     try {
//         const response = await axiosInstance.post('http://localhost:3000/admin/reports', payload); // Assuming you use POST method with payload for any filters
//         return response.data; // Return the data received from the API
//     } catch (error) {
//         return error.response.data; // Return error response in case of failure
//     }
// };
import axiosInstance from ".";

// Function to get all reports
export const getReports = async (payload) => {
    try {
        const response = await axiosInstance.get('http://localhost:3000/admin/reports', payload); // Absolute URL
        return response.data; // Return the data received from the API
    } catch (error) {
        return error.response ? error.response.data : { success: false, message: "An unexpected error occurred." };
    }
};

