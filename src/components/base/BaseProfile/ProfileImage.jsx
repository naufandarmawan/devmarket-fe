import React from 'react'
import UserThumbnail from '../../../assets/user-thumbnail.jpg'


const ProfileImage = ({image, className, ...props}) => {
  return (
    <img {...props} className={`size-[150px] rounded-full object-cover ${className}`} src={image ? image : UserThumbnail} alt="" />
  )
}

export default ProfileImage