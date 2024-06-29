import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'
import ProfileStatus from '../../components/base/BaseProfile/ProfileStatus'
import ProfileDescription from '../../components/base/BaseProfile/ProfileDescription'

import Tag from '../../components/base/Tag'
import Button from '../../components/base/Button'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'
import Input from '../../components/base/Input'
import FormContainer from '../../components/module/FormContainer'

import { useDispatch, useSelector } from 'react-redux';
import { hireWorker } from '../../configs/redux/hireSlice'


const HireTalent = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const [profile, setProfile] = useState({})

  const [form, setForm] = useState({
    worker_id: '',
    message_purpose: '',
    name: '',
    email: '',
    phone: '',
    desciption: '',
  });
  
  const [skills, setSkills] = useState([])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getProfile = () => {
    api.get(`/workers/${id}`)
      .then((res) => {
        const result = res.data.data
        console.log(result);
        setProfile(result)
        setForm({ ...form, worker_id: id })
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  useEffect(() => {
    getProfile()
    api.get(`/skills/${id}`)
      .then((res) => {
        const result = res.data.data
        setSkills(result)
      })
      .catch((err) => {
        console.log(err.response);
      })
  }, [])

  const handleHire = (e) => {
    e.preventDefault()
    // console.log(form);
    console.log(form);
    dispatch(hireWorker(form));
    // api.post('/hire', form)
    //   .then((res) => {
    //     console.log(res)
    //     // navigate(`/talent/profile/${id}`)
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     alert('Gagal untuk memperbarui data')
    //   })
  }

  return (
    <div className="bg-[#F6F7F8]">

      <NavBar />

      <div className='px-[150px] pt-[70px] pb-[210px] max-lg:px-[30px]'>
        <div className="flex gap-[30px] container mx-auto max-lg:flex-col">

          <div className="flex flex-col basis-4/12 gap-[34px] bg-[#FFFFFF] p-[30px] h-fit rounded-lg">
            <div className="flex flex-col gap-5 items-center">
              <ProfileImage image={profile.photo} />
              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.name} />
                <ProfileJob job={profile.job_desk} />
                <ProfileLocation location={profile.domicile} />
                <ProfileStatus status={profile.workplace} />
              </div>
              <ProfileDescription>{profile.description}</ProfileDescription>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-[22px] leading-6 text-[#1F2A36]">Skill</h3>
              <ul className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
                {skills.map((item) => (
                  <Tag key={item.id} skill={item.skill_name} />
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col basis-8/12 gap-[52px] px-[30px] h-fit">
            <div className='flex flex-col basis-1/2'>
              <FormContainer formTitle={`Hubungi ${profile.name}`} formDescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.'>
                <div className="flex flex-col gap-4">
                  <Input
                    type='text'
                    value={form.message_purpose}
                    onChange={handleChange}
                    name="message_purpose"
                    label="Tujuan tentang pesan ini"
                    placeholder="Projek"
                  />
                  <Input
                    type='text'
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                    label="Nama lengkap"
                    placeholder="Masukan nama lengkap"
                  />
                  <Input
                    type='email'
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="Masukan email"
                  />
                  <Input
                    type='tel'
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    label="No Handpone"
                    placeholder="Masukan no handpone"
                  />
                  <Input
                    type='textarea'
                    value={form.desciption}
                    onChange={handleChange}
                    name="desciption"
                    label="Deskripsi"
                    placeholder="Deskripsikan/jelaskan lebih detail "
                  />
                </div>
                <div className='flex flex-col gap-[15px]'>
                  <Button variant='primary-yellow' onClick={handleHire} text='Hire' />
                </div>
              </FormContainer>
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  )
}

export default HireTalent