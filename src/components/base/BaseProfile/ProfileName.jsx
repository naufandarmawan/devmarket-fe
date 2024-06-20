import React from 'react'

const ProfileName = ({name}) => {
    return (
        <h2 className="font-semibold text-[22px] text-[#1F2A36]">{name ? name : 'Name'}</h2>
    )
}

export default ProfileName