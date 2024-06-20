import React from 'react'
import Person1 from '../../../assets/person-1.png'


const ProfileImage = ({image, className, ...props}) => {
  return (
    <img {...props} className={`size-[150px] rounded-full ${className}`} src={image ? image : Person1} alt="" />
  )
}

export default ProfileImage