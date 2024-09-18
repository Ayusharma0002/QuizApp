import axiosInstance from ".";
import axios from 'axios';

export const registerUser = async(payload) => {
    try{
      const response = await axiosInstance.post('/api/users/register',payload);
      console.log("register sucess hoon mai");
      return response.data
    }
    catch(error){
      console.log("register error hoon mai");
      return error.response.data
    }
}

// export const loginUser = async(payload) => {
//     try{
//       const response = await axiosInstance.post('/api/users/login',payload);
//     //   if (response.data.success) {
//     //     // Store token in localStorage
//     //     localStorage.setItem('token', response.data.data.token);
//     //     console.log("Login successful, token stored");
//     // }
//       console.log("login sucess hoon mai");
//       return response.data
//     }
//     catch(error){
//       console.log("login error hoon mai");
//       return error.response.data
//     }
// }


// ye important hai is sey hi chla tha main code, sab isne hi theek kara tha
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/login', credentials);
    // Assuming the response contains a token in response.data.token
    console.log('Full response:', response);
    localStorage.setItem('token', response.data.token);
    console.log('Token saved:', response.data.token); // Log to verify
    console.log('Message is:', response.data.message); // Log to verify
    return response;
    // return response.data.message;
  } catch (error) {
    console.error('Login error:', error);
  }
};




// export const loginUser = async (credentials) => {
//   try {
//     // Make the API call to the login endpoint
//     const response = await axios.post('http://localhost:3000/api/users/login', credentials);
    
//     // Log the full response for debugging
//     console.log('Full response:', response);
    
//     // Ensure the response data contains a token and success status
//     const { success, message, token } = response.data;
    
//     // Save token to localStorage if available
//     if (token) {
//       localStorage.setItem('token', token);
//       console.log('Token saved:', token);
//     }
    
//     // Return the structured response
//     return {
//       success,
//       message,
//       token
//     };
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Login error:', error);
    
//     // Throw a more informative error message if available
//     throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
//   }
// };


// export const loginUser = async (payload) => {
//   try {
//     const response = await axios.post('/api/users/login', payload, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log("Login successful:", response.data); // Log the successful response

//     return response.data; // Return the response data for further processing
//   } catch (error) {
//     console.error("Login error:", error.response.data);
//     return error.response.data; // Return the error data for handling errors
//   }
// };

export const getUserInfo = async() => {
  try{

    const response = await axiosInstance.post('/api/users/get-user-info')
    console.log("fonteend userinfo user.js success");
    console.log(response);
    // return response;
    return response.data;
  }
  catch(error){
    console.log("fonteend userinfo user.js error");
    return error.response.data
  }
}