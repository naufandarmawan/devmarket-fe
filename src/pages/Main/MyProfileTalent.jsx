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

import { useDispatch, useSelector } from 'react-redux'
import { getMyProfile } from '../../configs/redux/workerSlice'
import { getMySkill } from '../../configs/redux/skillsSlice'


const MyProfileTalent = () => {

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.worker.myProfile)
  const skills = useSelector((state) => state.skills.mySkills)

  useEffect(() => {
    dispatch(getMyProfile())
    dispatch(getMySkill())
  }, [dispatch])

  const navigate = useNavigate()

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
                <ProfileJob job={profile.position} />
                <ProfileLocation location={profile.location} />
                <ProfileStatus status={profile.workplace} />
              </div>
              <ProfileDescription>{profile.description}</ProfileDescription>
              <Button variant='primary-yellow' className='w-full' onClick={handleEdit} text='Edit' />
            </div>

            {skills.length > 0 &&
              <div className="flex flex-col gap-5">
                <h3 className="font-semibold text-[22px] leading-6 text-[#1F2A36]">Skills</h3>
                <ul className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
                  {skills.map((item) => (
                    <Tag key={item.id} skill={item.skill_name} />
                  ))}
                </ul>
              </div>
            }

            <div className="flex flex-col gap-6 font-normal text-sm leading-5 text-[#9EA0A5]">

              {profile.email && <Social
                image={EmailIcon}
                social={profile.email}
              />
              }

              {profile.instagram && <Social
                image={InstagramIcon}
                social={profile.instagram}
              />
              }

              {profile.github && <Social
                image={GithubIcon}
                social={profile.github}
              />
              }

              {profile.gitlab && <Social
                image={GitlabIcon}
                social={profile.gitlab}
              />
              }

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

export default MyProfileTalent