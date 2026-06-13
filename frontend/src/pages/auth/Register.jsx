import API from '@/api/axios';
import AuthLayout from '@/layouts/AuthLayout';
import { loginSuccess } from '@/redux/slices/authSlice';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-400' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-400' };
  if (score <= 4) return { score, label: 'Good', color: 'bg-teal-400' };
  return { score, label: 'Strong', color: 'bg-brand-primary' };
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const strength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(formData.password)) {
      return toast.error(
        'Password must contain uppercase, lowercase, number and special character'
      );
    }
    try {
      setLoading(true);
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(loginSuccess(res.data));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
        {/* Header */}
        <div className='mb-7'>
          <div className='w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4'>
            <User className='w-5 h-5 text-brand-primary' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Create your account</h2>
          <p className='text-gray-500 mt-1 text-sm'>Start building your career today — it's free</p>
        </div>

        <form className='space-y-5' onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Full name</label>
            <div className='relative'>
              <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
              <input
                type='text'
                name='name'
                value={formData.name}
                placeholder='John Doe'
                onChange={handleChange}
                required
                className='w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Email address</label>
            <div className='relative'>
              <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
              <input
                type='email'
                name='email'
                value={formData.email}
                placeholder='you@example.com'
                onChange={handleChange}
                required
                className='w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                placeholder='••••••••'
                onChange={handleChange}
                required
                className='w-full border border-gray-200 rounded-xl pl-10 pr-11 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            {/* Password strength bar */}
            {formData.password && (
              <div className='mt-2'>
                <div className='flex gap-1 mb-1'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength.score ? strength.color : 'bg-gray-100'
                      }`}
                    />
                  ))}
                </div>
                <p className='text-xs text-gray-400'>
                  Password strength:{' '}
                  <span
                    className={`font-medium ${
                      strength.label === 'Weak'
                        ? 'text-red-500'
                        : strength.label === 'Fair'
                        ? 'text-amber-500'
                        : 'text-brand-primary'
                    }`}
                  >
                    {strength.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Requirements hint */}
          <div className='flex items-start gap-2 bg-brand-primary/5 rounded-xl p-3 border border-brand-primary/10'>
            <CheckCircle2 className='w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0' />
            <p className='text-xs text-gray-500 leading-relaxed'>
              Password must be 8+ characters with uppercase, lowercase, number and special character.
            </p>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-brand-primary hover:bg-teal-600 text-white rounded-xl py-2.5 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Login link */}
        <p className='text-xs text-center text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-brand-primary font-semibold hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
