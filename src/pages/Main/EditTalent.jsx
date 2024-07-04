import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'
import ProfileStatus from '../../components/base/BaseProfile/ProfileStatus'
import ProfileDescription from '../../components/base/BaseProfile/ProfileDescription'

import Button from '../../components/base/Button'
import { useNavigate } from 'react-router-dom'
import GreyEdit from '../../assets/grey-edit.svg'
import FormSubContainer from '../../components/base/FormSubContainer'
import Input from '../../components/base/Input'
import AddSkill from '../../components/module/AddSkill'
import AddExperience from '../../components/module/AddExperience'
import AddPortfolio from '../../components/module/AddPortfolio'

import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile, updatePhoto, updateProfile } from '../../configs/redux/workerSlice'


const EditTalent = () => {

  const dispatch = useDispatch()

  // const [profile, setProfile] = useState({})
  const profile = useSelector((state) => state.worker.myProfile)

  const [form, setForm] = useState({
    name: '',
    position: '',
    location: '',
    workplace: '',
    description: '',
    phone: '',
    instagram: '',
    github: '',
    gitlab: ''
  });

  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        position: profile.position || '',
        location: profile.location || '',
        workplace: profile.workplace || '',
        description: profile.description || '',
        phone: profile.phone || '',
        instagram: profile.instagram || '',
        github: profile.github || '',
        gitlab: profile.gitlab || ''
      })
    }
  }, [profile])

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(`/talent/profile/`)
  }

  const handleSave = (e) => {
    e.preventDefault()

    dispatch(updateProfile({form, navigate}))
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    dispatch(updatePhoto(formData))

  }

  return (
    <div className='bg-[#F6F7F8]'>

      <NavBar />
      <div className='bg-[#5E50A1] h-[361px] mb-[-361px] '></div>

      <div className='px-[150px] pt-[70px] pb-[210px] max-lg:px-[30px]'>
        <div className="flex gap-[30px] container mx-auto max-lg:flex-col">

          <div className="flex flex-col basis-4/12 gap-[34px] h-fit ">
            <div className="flex flex-col gap-5 items-center p-[30px] bg-[#FFFFFF] rounded-lg">
              <ProfileImage image={profile.photo} />
              <label htmlFor="upload-photo">
                <input type="file" id="upload-photo" className='hidden' onChange={handlePhoto} />
                <div className='flex gap-[6px] items-center cursor-pointer'>
                  <img src={GreyEdit} className='h-[16px]' />
                  <p className='font-semibold text-[22px] text-[#9EA0A5]'>Change Photo</p>
                </div>
              </label>

              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.name} />
                <ProfileJob job={profile.position} />
                <ProfileLocation location={profile.location} />
                <ProfileStatus status={profile.workplace} />
              </div>
            </div>
            <div className='flex flex-col gap-[15px]'>
              <Button variant='primary-purple' onClick={handleSave} text='Save' />
              <Button variant='secondary-purple' onClick={handleCancel} text='Cancel' />
            </div>
          </div>

          <div className="flex flex-col basis-8/12 gap-[34px] h-fit">

            <FormSubContainer subTitle='Personal Information'>
              <Input
                type='text'
                value={form.name}
                onChange={handleChange}
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
              />
              <Input
                type='text'
                value={form.position}
                onChange={handleChange}
                name="position"
                label="Job Title"
                placeholder="Enter your job title"
              />
              <Input
                type='text'
                value={form.location}
                onChange={handleChange}
                name="location"
                label="Location"
                placeholder="Enter your location"
              />
              <Input
                type='text'
                value={form.workplace}
                onChange={handleChange}
                name="workplace"
                label="Workplace"
                placeholder="Enter your workplace"
              />
              <Input
                type='text'
                value={form.description}
                onChange={handleChange}
                name="description"
                label="Short Description"
                placeholder="Write a short description"
              />
              <Input
                type='tel'
                value={form.phone}
                onChange={handleChange}
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <Input
                type='text'
                value={form.instagram}
                onChange={handleChange}
                name="instagram"
                label="Instagram"
                placeholder="Enter your Instagram username"
              />
              <Input
                type='url'
                value={form.github}
                onChange={handleChange}
                name="github"
                label="GitHub"
                placeholder="Enter your GitHub username"
              />
              <Input
                type='url'
                value={form.gitlab}
                onChange={handleChange}
                name="gitlab"
                label="GitLab"
                placeholder="Enter your GitLab username"
              />
            </FormSubContainer>

            <FormSubContainer subTitle='Skills'>
              <AddSkill />
            </FormSubContainer>

            <FormSubContainer subTitle='Work Experience'>
              <AddExperience />
            </FormSubContainer>

            <FormSubContainer subTitle='Portfolio'>
              <AddPortfolio />
            </FormSubContainer>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EditTalent