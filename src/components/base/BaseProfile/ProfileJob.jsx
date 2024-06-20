import React from 'react'

const ProfileJob = ({job}) => {
  return (
    <p className="font-normal text-sm leading-6 text-[#1F2A36]">{job ? job : 'Position'}</p>
  )
}

export default ProfileJob