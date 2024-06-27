import React, { useState } from 'react'
import HeroAuth from '../../components/module/HeroAuth'
import FormContainer from '../../components/module/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { ToastContainer, toast } from 'react-toastify';
// import { login } from '../../configs/redux/action/authAction'
// import { useDispatch } from "react-redux"

const Login = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // dispatch(login(form, navigate))
    api.post('/auth/login', form)
      .then((res) => {
        const { token, refreshToken } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success(`Login berhasil. Selamat datang!`)
        navigate('/')
      })
      .catch((err) => {
        console.log(err.response);
        const error = err.response.data
        toast.error(`Anda gagal login - ${error.message}`)
      })
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
            <HeroAuth>Temukan developer berbakat & terbaik di berbagai bidang keahlian</HeroAuth>
          </div>

          <div className='flex flex-col basis-1/2'>
            <FormContainer formTitle='Halo, Pewpeople' formDescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.'>
              <div className="flex flex-col gap-4">
                <Input
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  placeholder="Masukkan email"
                />
                <Input
                  type='password'
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  placeholder="Masukkan password"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Link className="text-end font-normal text-base text-[#1F2A36]" to="/resetpassword">Lupa kata sandi?</Link>
                {/* <Link className="text-end font-normal text-base text-[#FBB017]" to="/resetpassword">Lupa kata sandi?</Link> */}
                <Button variant='primary-yellow' onClick={handleLogin} text='Masuk' />
                <p className="flex flex-col gap-2 text-center font-normal text-base text-[#1F2A36]">Anda belum punya akun?
                  <Link className="text-[#FBB017]" to="/register-talent">Daftar sebagai talent</Link>
                  <Link className="text-[#FBB017]" to="/register-recruiter">Daftar sebagai recruiter</Link>
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