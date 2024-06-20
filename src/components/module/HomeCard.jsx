import React from 'react'
import ProfileImage from '../base/BaseProfile/ProfileImage'
import ProfileJob from '../base/BaseProfile/ProfileJob'
import ProfileLocation from '../base/BaseProfile/ProfileLocation'
import ProfileName from '../base/BaseProfile/ProfileName'
import Tag from '../base/Tag'
import Button from '../base/Button'


const HomeCard = ({ image, name, job, location, skills, onClick }) => {
    return (
        <div className="flex bg-[#FFFFFF] p-[20px] items-center justify-between h-fit">
            <div className="flex gap-5 items-center">
                <ProfileImage image={image} className='size-24' />
                <div className='flex flex-col gap-2'>
                    <ProfileName name={name} />
                    <ProfileJob job={job} />
                    <ProfileLocation location={location} />
                    <ul className="flex flex-wrap gap-x-[10px] gap-y-[20px]">
                        {skills.map((item) => (
                            <Tag skill={item}/>
                        ))}
                    </ul>
                </div>
            </div>
            <Button variant='primary-purple' text='View Profile' onClick={onClick} className="py-[15px] px-[30px] bg-[#5E50A1] rounded-[4px] font-bold text-base leading-5 text-[#FFFFFF]"/>
        </div>
    )
}

export default HomeCard