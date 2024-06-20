import React, { useState } from 'react'
import HeroAuth from '../../components/module/HeroAuth'
import FormContainer from '../../components/module/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/base/Input'
import Button from '../../components/base/Button'
import api from '../../configs/api'
import { registerRecruiter } from '../../configs/redux/action/authAction'
import { useDispatch } from "react-redux"


const RegisterRecruiter = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
    password:'',
    name:'',
    company:'',
    position:'',
    phone:''
  })

  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(registerRecruiter(form, navigate))
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
                  type='text'
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  placeholder="Masukkan nama"
                />
                <Input
                  type='email'
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  placeholder="Masukkan email"
                />
                <Input
                  type='text'
                  value={form.company}
                  onChange={handleChange}
                  name="company"
                  label="Perusahaan"
                  placeholder="Masukan nama perusahaan"
                />
                <Input
                  type='text'
                  value={form.position}
                  onChange={handleChange}
                  name="position"
                  label="Jabatan"
                  placeholder="Posisi di perusahaan Anda"
                />
                <Input
                  type='tel'
                  value={form.phone}
                  onChange={handleChange}
                  name="phone"
                  label="Phone"
                  placeholder="Masukkan phone"
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
                <Button variant='primary-yellow' onClick={handleRegister} text='Daftar'/>
                <p className="text-center font-normal text-base text-[#1F2A36]">Anda sudah punya akun? <Link className="text-[#FBB017]" to="/login">Masuk disini</Link></p>
              </div>
            </FormContainer>
          </div>

        </div>
      </div >

    </div >
  )
}

export default RegisterRecruiter