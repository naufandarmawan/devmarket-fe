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
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/base/Input'
import FormContainer from '../../components/module/FormContainer'

import { useDispatch, useSelector } from 'react-redux';
import { hireWorker } from '../../configs/redux/hireSlice'
import { getProfile } from '../../configs/redux/workerSlice'
import { getSkill } from '../../configs/redux/skillsSlice'


const HireTalent = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile = useSelector((state) => state.worker.profile)
  const skills = useSelector((state) => state.skills.skills)

  const [form, setForm] = useState({
    worker_id: id,
    purpose: 'Full-time',
    name: '',
    company: '',
    email: '',
    phone: '',
    description: ''
  });

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setForm({
      ...form,
      purpose: selectedValue
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(getProfile(id))
    dispatch(getSkill(id))
  }, [dispatch])

  const handleHire = (e) => {
    e.preventDefault()
    dispatch(hireWorker(form));
    navigate(`/talent/profile/${id}`)
  }

  const handleCancel = () => {
    navigate(`/talent/profile/${id}`)
  }

  return (
    <div className="bg-[#F6F7F8]">

      <NavBar />

      <div className='px-[150px] pt-[70px] pb-[210px] max-lg:px-[30px]'>
        <div className="flex gap-[30px] container mx-auto max-lg:flex-col">

          <div className="flex flex-col basis-4/12 gap-[34px] h-fit">
            <div className="flex flex-col gap-10 items-center bg-[#FFFFFF] p-[30px] rounded-lg">
              <ProfileImage image={profile.photo} />
              <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName name={profile.name} />
                <ProfileJob job={profile.position} />
                <ProfileLocation location={profile.location} />
                <ProfileStatus status={profile.workplace} />
                <ProfileDescription>{profile.description}</ProfileDescription>
              </div>

              {skills.length > 0 &&
                <div className="flex flex-col gap-5 w-full">
                  <h3 className="font-semibold text-[22px] leading-6 text-[#1F2A36]">Skills</h3>
                  <ul className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
                    {skills.map((item) => (
                      <Tag key={item.id} skill={item.skill_name} />
                    ))}
                  </ul>
                </div>
              }

            </div>

            <div className='flex flex-col gap-[15px]'>
              <Button variant='secondary-purple' onClick={handleCancel} text='Cancel' />
            </div>
          </div>

          <div className="flex flex-col basis-8/12 gap-[52px] px-[30px] h-fit">
            <div className='flex flex-col basis-1/2'>
              <FormContainer formTitle={`Contact ${profile.name}`} formDescription='Reach out to this talent for job opportunities or collaborations.'>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="font-normal text-xs text-[#9EA0A5] pl-[5px]">Purpose of this message</label>
                    <select className='p-[15px] rounded-[4px] font-normal text-sm text-[#1F2A36] placeholder:text-[#858D96] outline-none border border-[#E2E5ED]' value={form.purpose}
                      onChange={handleSortChange}>
                      <option value="Full-time" selected>Full-time</option>
                      <option value="Part-time" selected>Part-time</option>
                      <option value="Self-employed" selected>Self-employed</option>
                      <option value="Freelance" selected>Freelance</option>
                      <option value="Contract" selected>Contract</option>
                      <option value="Internship" selected>Internship</option>
                      <option value="Apprenticeship" selected>Apprenticeship</option>
                      <option value="Seasonal" selected>Seasonal</option>
                    </select>
                  </div>
                  <Input
                    type='text'
                    value={form.name}
                    onChange={handleChange}
                    name="name"
                    label="Full Name"
                    placeholder="Enter full name"
                  />
                  <Input
                    type='text'
                    value={form.company}
                    onChange={handleChange}
                    name="company"
                    label="Company Name"
                    placeholder="Enter company name"
                  />
                  <Input
                    type='email'
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                  />
                  <Input
                    type='tel'
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter phone number"
                  />
                  <Input
                    type='textarea'
                    value={form.description}
                    onChange={handleChange}
                    name="description"
                    label="Description"
                    placeholder="Provide a detailed description"
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