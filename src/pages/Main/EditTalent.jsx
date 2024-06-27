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
import Social from '../../components/base/Social'
import Button from '../../components/base/Button'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../configs/api'
import GreyEdit from '../../assets/grey-edit.svg'
import FormSubContainer from '../../components/base/FormSubContainer'
import Input from '../../components/base/Input'
import AddSkill from '../../components/module/AddSkill'
import AddExperience from '../../components/module/AddExperience'
import AddPortfolio from '../../components/module/AddPortfolio'


const EditTalent = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [form, setForm] = useState({
    name: '',
    job_desk: '',
    domicile: '',
    workplace: '',
    description: '',
    photo: '',
  });

  const getProfile = () => {
    api.get(`/workers/${id}`)
      .then((res) => {
        const result = res.data.data
        console.log(result);
        setProfile(result)
        setForm({
          name: result.name || '',
          job_desk: result.job_desk || '',
          domicile: result.domicile || '',
          workplace: result.workplace || '',
          description: result.description || '',
          photo: result.photo || '',
        })
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  const navigate = useNavigate()
  const handleCancel = () => {
    navigate(`/talent/profile/${id}`)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // console.log(form);

    if (form.photo !== profile.photo) {
      api.put(`/workers/profile/photo/`, { photo: form.photo })
        .then((res) => {
          console.log(res)
          // navigate(`/talent/profile/${id}`)
        })
        .catch((err) => {
          console.log(err.response);
          alert('Failed to update profile data')
        })
    }

    api.put('/workers/profile', {
      name: form.name,
      job_desk: form.job_desk,
      domicile: form.domicile,
      workplace: form.workplace,
      description: form.description,
    })
      .then((res) => {
        console.log(res)
        // navigate(`/talent/profile/${id}`)
      })
      .catch((err) => {
        console.log(err.response);
        alert('Gagal untuk memperbarui data')
      })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // const handleEdit = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handlePhoto = (e) => {
    const photo = e.target.files[0]
    const formData = new FormData()
    formData.append('photo', photo)
    // api.post(`/upload`, formData)
    //   .then((res) => {
    //     const { file_url } = res.data.data
    //     setForm({ ...form, photo: file_url })
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
    api.put(`/workers/profile/photo`, formData)
      .then((res) => {
        console.log(res);
        getProfile()
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

          <div className="flex flex-col basis-4/12 gap-[34px] h-fit ">
            <div className="flex flex-col gap-5 items-center p-[30px] bg-[#FFFFFF] rounded-lg">
              <ProfileImage image={profile.photo} />
              <label htmlFor="upload-photo">
                <input type="file" id="upload-photo" className='hidden' onChange={handlePhoto} />
                <div className='flex gap-[6px] items-center cursor-pointer'>
                  <img src={GreyEdit} className='h-[16px]' />
                  <p className='font-semibold text-[22px] text-[#9EA0A5]'>Edit</p>
                </div>
              </label>

              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.name} />
                <ProfileJob job={profile.job_desk} />
                <ProfileLocation location={profile.domicile} />
                <ProfileStatus status={profile.workplace} />
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
                value={form.name}
                onChange={handleChange}
                name="name"
                label="Nama lengkap"
                placeholder="Masukan nama lengkap"
              />
              <Input
                type='text'
                value={form.job_desk}
                onChange={handleChange}
                name="job_desk"
                label="Job desk"
                placeholder="Masukan job desk"
              />
              <Input
                type='text'
                value={form.domicile}
                onChange={handleChange}
                name="domicile"
                label="Domisili"
                placeholder="Masukan domisili"
              />
              <Input
                type='text'
                value={form.workplace}
                onChange={handleChange}
                name="workplace"
                label="Tempat kerja"
                placeholder="Masukan tempat kerja"
              />
              <Input
                type='text'
                value={form.description}
                onChange={handleChange}
                name="description"
                label="Deskripsi singkat"
                placeholder="Tuliskan deskripsi singkat"
              />
            </FormSubContainer>

            <FormSubContainer subTitle='Skill'>
              <AddSkill />
            </FormSubContainer>

            <FormSubContainer subTitle='Pengalaman Kerja'>
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