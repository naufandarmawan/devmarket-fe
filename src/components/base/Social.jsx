import React from 'react'
import EmailIcon from '../../assets/grey-mail.svg'

const Social = ({image, social}) => {
    return (
        <div className="flex items-center gap-5">
            <img className="w-6" src={image ? image : EmailIcon} alt="" />
            <p className='font-normal text-sm leading-5 text-[#9EA0A5]'>{social ? social : 'Social Media'}</p>
        </div>
    )
}

export default Social