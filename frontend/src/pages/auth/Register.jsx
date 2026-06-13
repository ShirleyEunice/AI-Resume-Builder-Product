import API from '@/api/axios';
import AuthLayout from '@/layouts/AuthLayout';
import { loginSuccess } from '@/redux/slices/authSlice';
import { form } from 'framer-motion/client';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    Password: "",
  });

  const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e)=>{
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async(e)=>{
    e.preventDefault();
    if(!passwordRegex.test(formData.password)){
        return toast.error(
            "Password must contain uppercase, lowercase, number and special character"
        )
    }
    try {
      setLoading(true);
      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      //redux update
      dispatch(
        loginSuccess(res.data)
      );
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <AuthLayout>
      <div className='space-y-6'>
        <div>
          <h2 className='text-3xl font-bold'>Create an account</h2>
          <p className='text-gray-500 mt-2'>Register to continue</p>
        </div>

        <form className='space-y-4' onSubmit={handleRegister}>
        <input 
          type="text"
          value={formData.name}
          name='name'
          placeholder='Name'
          onChange={handleChange}
          className='w-full border rounded-xl p-3' />

          <input 
          type="email"
          value={formData.email}
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='w-full border rounded-xl p-3' />

          <input 
          type="password"
          value={formData.password}
          name='password'
          placeholder='Password'
          onChange={handleChange}
          className='w-full border rounded-xl p-3' />

          <button
          type='submit'
          disabled={loading}
          className='w-full bg-brand-primary hover:bg-violet-700 rounded-xl p-3 font-medium'>{loading ? "Registering..." : "Register"}</button>
        </form>

        <p className='text-xs text-center text-gray-500'>Already have an account?
        <Link to="/login" className='text-brand-primary ml-1 font-medium'>Login</Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Register