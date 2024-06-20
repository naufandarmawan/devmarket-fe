import React from 'react'

const ProfileStatus = ({status}) => {
  return (
    <p className="font-normal text-sm leading-5 text-[#9EA0A5]">{status ? status : 'Status'}</p>
  )
}

export default ProfileStatus