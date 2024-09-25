import React from 'react'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../../apicalls/users'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await registerUser(values)
      dispatch(HideLoading())
      if (response.success) {
        message.success(response.message);
        navigate("/login")
      }
      else {
        message.error(response.message)
      }
    }
    catch (error) {
      dispatch(HideLoading())
      message.error(error.message);
    }
  }
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray'>
      <div className='card w-400 p-3 bg-white'>
        <div className='flex flex-col'>
          <div className='flex gap-2 justify-center'>
            <h1 className='text-2xl'>
              Register Quiz-Portal
            </h1>
            <i className='ri-user-add-line text-2xl'></i>
          </div>
          <div className='divider'></div>
          <Form layout="vertical" className='mt-2' onFinish={onFinish}>
            <Form.Item name='name' label='Name' rules={[{ required: true }]}>
              <input type="text" placeholder='Enter your name' required />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true }]}>
              <input type="email" placeholder='Enter your email' required />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
              <input type="tel" placeholder="Enter your phone number" pattern="[0-9]{10}" required />
            </Form.Item>

            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <input type="password" placeholder='Enter your password' required />
            </Form.Item>
            <Form.Item name='confirmPassword' label='Confirm Password' rules={[{ required: true }]}>
              <input type="password" placeholder='Enter your confirm password' required />
            </Form.Item>
            <div className='flex flex-col gap-2'>
              <button type="submit" className='primary-contained-btn mt-2 w-100'>Register</button>
              <Link to="/login">
                Already have an account? Login Here
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage