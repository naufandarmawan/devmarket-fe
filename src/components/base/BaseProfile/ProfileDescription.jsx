import React from 'react'

const ProfileDescription = ({children='Description'}) => {
  return (
    <p className="font-normal text-sm leading-6 text-[#9EA0A5] w-full">{children}</p>
  )
}

export default ProfileDescription