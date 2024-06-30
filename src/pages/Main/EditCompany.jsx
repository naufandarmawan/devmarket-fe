import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'

import Button from '../../components/base/Button'
import { useNavigate} from 'react-router-dom'
import FormSubContainer from '../../components/base/FormSubContainer'
import Input from '../../components/base/Input'

import GreyEdit from '../../assets/grey-edit.svg'

import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateProfile } from '../../configs/redux/recruiterSlice'
import { uploadFile } from '../../configs/redux/assetSlice'


const EditCompany = () => {

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.recruiter.profile)
  const image = useSelector((state)=>state.asset.file)


  const [form, setForm] = useState({
    photo: "",
    name: "",
    company: "",
    position: "",
    industry: "",
    location: "",
    description: "",
    instagram: "",
    phone: "",
    linkedin: ""
  });

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    console.log(profile);
    if (profile) {
      setForm({
        photo: profile.photo || '',
        name: profile.name || '',
        company: profile.company || '',
        industry: profile.industry || '',
        location: profile.location || '',
        description: profile.description || '',
        instagram: profile.instagram || '',
        phone: profile.phone || '',
        linkedin: profile.linkedin || ''
      })
    }
  }, [profile])

  useEffect(() => {
    if (image) {
      setForm((prevForm) => ({ ...prevForm, photo: image }));
    }
  }, [image]);

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(`/company/profile/`)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // console.log(form);
    dispatch(updateProfile(form))
    navigate('/company/profile')
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    dispatch(uploadFile(formData))
  }

  return (
    <div className='bg-[#F6F7F8]'>

      <NavBar />
      <div className='bg-[#5E50A1] h-[361px] mb-[-361px] '></div>

      <div className='px-[150px] pt-[70px] pb-[210px] max-lg:px-[30px]'>
        <div className="flex gap-[30px] container mx-auto max-lg:flex-col">

          <div className="flex flex-col basis-4/12 gap-[34px] h-fit">
            <div className="flex flex-col gap-5 items-center bg-[#FFFFFF] p-[30px] rounded-lg">
              <ProfileImage image={form.photo || profile.photo} />
              <label htmlFor="upload-photo">
                <input type="file" id="upload-photo" className='hidden' onChange={handleFile} />
                <div className='flex gap-[6px] items-center cursor-pointer'>
                  <img src={GreyEdit} className='h-[16px]' />
                  <p className='font-semibold text-[22px] text-[#9EA0A5]'>Edit</p>
                </div>
              </label>
              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.company} />
                <ProfileJob job={profile.industry} />
                <ProfileLocation location={profile.location} />
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
                value={form.industry}
                onChange={handleChange}
                name="industry"
                label="Bidang"
                placeholder="Masukan bidang perusahaan ex : Financial"
              />
              <Input
                type='text'
                value={form.location}
                onChange={handleChange}
                name="location"
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
                type='text'
                value={form.name}
                onChange={handleChange}
                name="name"
                label="Nama Lengkap"
                placeholder="Masukan nama lengkap"
              />
              {/* <Input
                type='text'
                value={form.position}
                onChange={handleChange}
                name="position"
                label="Jabatan"
                placeholder="Masukan jabatan"
              /> */}
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

            </FormSubContainer>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditCompany