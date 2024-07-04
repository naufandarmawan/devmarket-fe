import React, { useEffect, useState } from 'react'
import NavBar from '../../components/module/NavBar'
import Footer from '../../components/module/Footer'
import { useNavigate } from 'react-router-dom'
import SocialMedia from '../../components/base/Social'

import EmailIcon from '../../assets/grey-mail.svg'
import InstagramIcon from '../../assets/grey-instagram.svg'
import PhoneIcon from '../../assets/grey-phone.svg'
import LinkedinIcon from '../../assets/grey-linkedin.svg'

import ProfileImage from '../../components/base/BaseProfile/ProfileImage'
import ProfileName from '../../components/base/BaseProfile/ProfileName'
import ProfileJob from '../../components/base/BaseProfile/ProfileJob'
import ProfileLocation from '../../components/base/BaseProfile/ProfileLocation'
import ProfileDescription from '../../components/base/BaseProfile/ProfileDescription'
import Button from '../../components/base/Button'

import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../configs/redux/recruiterSlice'



const ProfileCompany = () => {

  const dispatch = useDispatch()

  const myProfile = useSelector((state)=>state.recruiter.profile)

  useEffect(() => {
    dispatch(getProfile())

  }, [dispatch])

  const navigate = useNavigate()
  
  const handleEdit = () => {
    navigate('edit')
  }

  return (
    <div className="bg-[#F6F7F8]">

      <NavBar />
      <div className="px-[150px] pt-[70px] pb-[210px] ">
        <div className="container mx-auto rounded-lg overflow-hidden">

          <div className="flex flex-col bg-[#5E50A1] px-[30px] py-[4px] h-[200px] justify-end items-end">
            <div className="flex items-center gap-[6px]">
              {/* <img className="w-[16px]" src={WhiteEdit} alt="" /> */}
              {/* <p className="font-semibold text-[22px] leading-[56px] text-white">Change Background</p> */}
            </div>
          </div>

          <div className="flex justify-center items-center my-[-75px]">
            <ProfileImage image={myProfile.photo} />
            {/* <img className="size-[150px] rounded-full object-cover" src={myProfile.photo ? myProfile.photo : Person1} alt="" /> */}
          </div>

          <div className="flex flex-col gap-[34px] bg-[#FFFFFF] pt-[95px] pb-[190px] px-[250px] items-center h-fit">
            <div className="flex flex-col gap-5 items-center text-center">
              <div className='flex flex-col gap-[13px] items-center'>
                <ProfileName name={myProfile.company} />
                <ProfileJob job={myProfile.industry} />
                <ProfileLocation location={myProfile.location} />
              </div>
              <ProfileDescription>{myProfile.description || 'Company Description:'}</ProfileDescription>
              <Button
              variant='primary-purple' 
              onClick={handleEdit}
              className='w-80'
              text='Edit profile'
              />
            </div>
            <div className="flex flex-col gap-6 font-normal text-sm leading-5 text-[#9EA0A5]">
              <SocialMedia
                image={EmailIcon}
                social={myProfile.email}
              />
              <SocialMedia
                image={InstagramIcon}
                social={myProfile.instagram}
              />
              <SocialMedia
                image={PhoneIcon}
                social={myProfile.phone}
              />
              <SocialMedia
                image={LinkedinIcon}
                social={myProfile.linkedin}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProfileCompany