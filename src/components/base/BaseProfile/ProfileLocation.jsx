import React from 'react'
import GreyPin from '../../../assets/grey-pin.svg'

const ProfileLocation = ({location}) => {
  return (
    <div className="flex gap-[11px]">
      <img src={GreyPin}/>
      <p className="font-normal text-sm leading-5 text-[#9EA0A5]">{location ? location : 'Domicile'}</p>
    </div>
  )
}

export default ProfileLocation