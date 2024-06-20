import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'
import ProfileStatus from '../../components/base/BaseProfile/ProfileStatus'
import ProfileDescription from '../../components/base/BaseProfile/ProfileDescription'

import ProfileTab from '../../components/module/ProfileTab'

import Tag from '../../components/base/Tag'
import Social from '../../components/base/Social'
import Button from '../../components/base/Button'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../configs/api'

import EmailIcon from '../../assets/grey-mail.svg'
import InstagramIcon from '../../assets/grey-instagram.svg'
import GithubIcon from '../../assets/grey-github.svg'
import GitlabIcon from '../../assets/grey-gitlab.svg'


const ProfileTalent = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [skills, setSkills] = useState([])
  const [myProfile, setMyProfile] = useState({})

  useEffect(() => {
    api.get(`/workers/profile`)
      .then((res) => {
        const result = res.data.data
        setMyProfile(result)
      })
      .catch((err) => {
        console.log(err.response);
      })

    api.get(`/workers/${id}`)
      .then((res) => {
        const result = res.data.data
        setProfile(result)
      })
      .catch((err) => {
        console.log(err.response);
      })

    api.get(`/skills/${id}`)
      .then((res) => {
        const result = res.data.data
        setSkills(result)
      })
      .catch((err) => {
        console.log(err.response);
      })
  }, [])

  const navigate = useNavigate()
  const handleHire = () => {
    navigate('hire')
  }

  const handleEdit = () => {
    navigate('edit')
  }

  return (
    <div className='bg-[#F6F7F8]'>

      <NavBar />
      <div className='bg-[#5E50A1] h-[361px] mb-[-361px] '></div>

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
              {(profile.id === myProfile.id) ? <Button variant='primary-yellow' className='w-full' onClick={handleEdit} text='Edit' /> : <Button variant='primary-purple' className='w-full' onClick={handleHire} text='Hire' />}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-[22px] leading-6 text-[#1F2A36]">Skill</h3>
              <ul className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
                {skills.map((item) => (
                  <Tag key={item.id} skill={item.skill_name} />
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 font-normal text-sm leading-5 text-[#9EA0A5]">
              <Social
                image={EmailIcon}
                social={profile.email}
              />
              <Social
                image={InstagramIcon}
                social={profile.instagram}
              />
              <Social
                image={GithubIcon}
                social={profile.github}
              />
              <Social
                image={GitlabIcon}
                social={profile.gitlab}
              />
            </div>
          </div>

          <div className="flex flex-col basis-8/12 gap-[34px] bg-[#FFFFFF] p-[30px] h-fit rounded-lg ">
            <ProfileTab />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProfileTalent