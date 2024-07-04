import React, { useState } from 'react'
import HeroAuth from '../../components/module/HeroAuth'
import FormContainer from '../../components/module/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { register } from '../../configs/redux/recruiterSlice'


const RegisterRecruiter = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    position: '',
    phone: ''
  })

  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(register({form, navigate}))
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
            <HeroAuth>Discover talented developers in various fields of expertise.</HeroAuth>
          </div>

          <div className='flex flex-col basis-1/2'>
            <FormContainer formTitle='Hello, Pewpeople' formDescription='Join Peworld as a recruiter to discover top talent globally.'>
              <div className="flex flex-col gap-4">
                <Input
                  type='text'
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
                <Input
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <Input
                  type='text'
                  value={form.company}
                  onChange={handleChange}
                  name="company"
                  label="Company"
                  placeholder="Enter your company name"
                />
                <Input
                  type='text'
                  value={form.position}
                  onChange={handleChange}
                  name="position"
                  label="Position"
                  placeholder="Enter your position"
                />
                <Input
                  type='tel'
                  value={form.phone}
                  onChange={handleChange}
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone number"
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
                <Button variant='primary-yellow' onClick={handleRegister} text='Register' />
                <p className="text-center font-normal text-base text-[#1F2A36]">Already have an account? <Link className="text-[#FBB017]" to="/login">Login here</Link></p>
              </div>
            </FormContainer>
          </div>

        </div>
      </div >

    </div >
  )
}

export default RegisterRecruiter