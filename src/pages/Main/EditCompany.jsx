import Person1 from '../../assets/person-1.png'
import InstagramIcon from '../../assets/grey-instagram.svg'
import PhoneIcon from '../../assets/grey-phone.svg'
import LinkedinIcon from '../../assets/grey-linkedin.svg'

import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'

import Button from '../../components/base/Button'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../configs/api'
import FormSubContainer from '../../components/base/FormSubContainer'
import Input from '../../components/base/Input'


const EditCompany = () => {
  const [profile, setProfile] = useState({})
  const [form, setForm] = useState({
    company: '',
    position: '',
    city: '',
    description: '',
    phone: '',
    instagram: '',
    linkedin: '',
    photo: '',
    email: ''
  });

  useEffect(() => {
    api.get(`/recruiters/profile`)
      .then((res) => {
        const result = res.data.data
        console.log(result);
        setProfile(result)
        setForm({
          company: result.company || '',
          position: result.position || '',
          city: result.city || '',
          description: result.description || '',
          phone: result.phone || '',
          instagram: result.instagram || '',
          linkedin: result.linkedin || '',
          photo: result.photo || '',
          email: result.email || ''
        })
      })
      .catch((err) => {
        console.log(err.response);
      })
  }, [])

  const navigate = useNavigate()
  const handleCancel = () => {
    navigate(`/company/profile/`)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // console.log(form);
    api.put('/recruiters/profile', form)
      .then((res) => {
        console.log(res)
        navigate(`/company/profile`)
      })
      .catch((err) => {
        console.log(err.response);
        alert(`Gagal untuk memperbarui data - ${err.response.data.message}`)
      })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    api.post(`/upload`, formData)
      .then((res) => {
        const { file_url } = res.data.data
        setForm({ ...form, photo: file_url })
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div className='bg-[#F6F7F8]'>

      <NavBar />
      <div className='bg-[#5E50A1] h-[361px] mb-[-361px] '></div>

      <div className='px-[150px] pt-[70px] pb-[210px] max-lg:px-[30px]'>
        <div className="flex gap-[30px] container mx-auto max-lg:flex-col">

          <div className="flex flex-col basis-4/12 gap-[34px] h-fit">
            <div className="flex flex-col gap-5 items-center bg-[#FFFFFF] p-[30px] rounded-lg">
              <ProfileImage image={profile.photo} />
              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.company} />
                <ProfileJob job={profile.position} />
                <ProfileLocation location={profile.city} />
              </div>
            </div>
            <div className='flex flex-col gap-[15px]'>
              <Button variant='primary-purple' onClick={handleSave} text='Save' />
              <Button variant='secondary-purple' onClick={handleCancel} text='Cancel' />
            </div>
          </div>

          <div className="flex flex-col basis-8/12 gap-[34px] h-fit">
            <FormSubContainer subTitle='Data diri'>
              <Input
                type='text'
                value={form.company}
                onChange={handleChange}
                name="company"
                label="Nama Perusahaan"
                placeholder="Masukan nama perusahan"
              />
              <Input
                type='text'
                value={form.position}
                onChange={handleChange}
                name="position"
                label="Bidang"
                placeholder="Masukan bidang perusahaan ex : Financial"
              />
              <Input
                type='text'
                value={form.city}
                onChange={handleChange}
                name="city"
                label="Kota"
                placeholder="Masukan kota"
              />
              <Input
                type='text'
                value={form.description}
                onChange={handleChange}
                name="description"
                label="Deskripsi singkat"
                placeholder="Tuliskan deskripsi singkat"
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
                type='url'
                value={form.instagram}
                onChange={handleChange}
                name="instagram"
                label="Instagram"
                placeholder="Masukan nama Instagram"
              />
              <Input
                type='tel'
                value={form.phone}
                onChange={handleChange}
                name="phone"
                label="Nomor Telepon"
                placeholder="Masukan nomor telepon"
              />
              <Input
                type='url'
                value={form.linkedin}
                onChange={handleChange}
                name="linkedin"
                label="Linkedin"
                placeholder="Masukan nama Linkedin"
              />

              {form.photo && <img src={form.photo} />}
              <input type="file" onChange={handleUpload} />
            </FormSubContainer>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditCompany