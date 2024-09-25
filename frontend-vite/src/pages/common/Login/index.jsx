import React from 'react'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../apicalls/users'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    //   try{
    //     dispatch(ShowLoading())
    //     const response = await loginUser(values)
    //     console.log("index.js file sucess messgae");
    //     console.log(response);
    //     dispatch(HideLoading())
    //     if(response.success){
    //       // message.success("You have logged in successfully 😊!!");
    //       console.log("You have logged in successfully 😊!!");
    //       message.success(response.message);
    //       localStorage.setItem("token",response.data)
    //       window.location.href="/";
    //     }
    //     else{
    //       message.error(response.message)
    //     }
    //   }
    //   catch(error){
    //       dispatch(HideLoading())
    //       message.error(error.message);
    //   }
    // }
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);

      console.log("index.js file success message");
      console.log(response);

      dispatch(HideLoading());

      // Access the data directly from response.data
      if (response.data.success) {
        // console.log("You have logged in successfully 😊!!");
        message.success("You have logged in successfully 😊!!"); // Show success message from response.data.message
        localStorage.setItem("token", response.data.token); // Store token from response.data.token
        window.location.href = "/";
      } else {
        message.error(response.data.message); // Show error message if success is false
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray'>
      <div className='card w-400 p-3 bg-white'>
        <div className='flex flex-col justify-center'>
          <div className='flex gap-2 justify-center'>
            <h1 className='text-2xl'>
              Login Quiz-Portal
            </h1>
            <i className='ri-login-circle-line text-2xl'></i>
          </div>
          <div className='divider'></div>
          <Form layout="vertical" className='mt-2' onFinish={onFinish}>
            <Form.Item name='email' label='Email'>
              <input type="email" placeholder='Enter your email' required />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <input type="password" placeholder='Enter your password' required />
            </Form.Item>
            <div className='flex flex-col gap-2'>
              <button type="submit" className='primary-contained-btn mt-2 w-100'>Login</button>
              <Link to="/register">
                Don't have an account? Register Here
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage