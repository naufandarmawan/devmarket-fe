import React, { useState } from 'react'
import HeroAuth from '../../components/module/HeroAuth'
import FormContainer from '../../components/module/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { ToastContainer, toast } from 'react-toastify';

import { useDispatch} from "react-redux"
import { login } from '../../configs/redux/authSlice'

const Login = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login({form, navigate}))
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-[#F6F7F8]">

      <div className="px-[75px] py-[39px] max-lg:px-[30px]">
        <div className='container mx-auto flex gap-[70px] max-lg:flex-col'>

          <div className='flex flex-col basis-1/2'>
            <HeroAuth>Discover talented and top-notch developers across various fields of expertise.</HeroAuth>
          </div>

          <div className='flex flex-col basis-1/2'>
            <FormContainer formTitle='Hello, Pewpeople' formDescription='Discover talented and skilled developers in various fields of expertise.'>
              <div className="flex flex-col gap-4">
                <Input
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <Input
                  type='password'
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Link className="text-end font-normal text-base text-[#1F2A36]" to="/resetpassword">Forgot your password?</Link>
                {/* <Link className="text-end font-normal text-base text-[#FBB017]" to="/resetpassword">Lupa kata sandi?</Link> */}
                <Button variant='primary-yellow' onClick={handleLogin} text='Log In' />
                <p className="flex flex-col gap-2 text-center font-normal text-base text-[#1F2A36]">Don't have an account yet?
                  <Link className="text-[#FBB017]" to="/register-talent">Register as talent</Link>
                  <Link className="text-[#FBB017]" to="/register-recruiter">Register as recruiter</Link>
                </p>
              </div>
            </FormContainer>
          </div>

        </div>
      </div >

    </div >
  )
}

export default Login