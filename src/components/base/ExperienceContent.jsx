import React from 'react'

const ExperienceContent = ({companyLogo, position, company, startDate, endDate, duration, description}) => {
    return (
        <div className='flex gap-8 w-full'>
            <img className='size-fit' src={companyLogo} alt="" />
            <div className='flex flex-col gap-4 w-full'>
                <div className=''>
                    <h4 className='font-semibold text-xl text-[#1F2A36]'>{position}</h4>
                    <p className='font-normal text-lg text-[#46505C]'>{company}</p>
                    <p className='font-normal text-base text-[#9EA0A5]'>{startDate} - {endDate}</p>
                    <p className='font-normal text-base text-[#9EA0A5]'>{duration} months</p>
                </div>
                <p className='font-normal text-sm leading-6 text-[#1F2A36]'>{description}</p>
                <div className='bg-[#E2E5ED] h-[1px]'></div>
            </div>
        </div>
    )
}

export default ExperienceContent