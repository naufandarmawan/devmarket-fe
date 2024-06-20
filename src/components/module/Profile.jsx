import React from 'react'
import ProfileDescription from '../base/BaseProfile/ProfileDescription'
import ProfileImage from '../base/BaseProfile/ProfileImage'
import ProfileJob from '../base/BaseProfile/ProfileJob'
import ProfileLocation from '../base/BaseProfile/ProfileLocation'
import ProfileName from '../base/BaseProfile/ProfileName'
import ProfileStatus from '../base/BaseProfile/ProfileStatus'
import Button from '../base/Button.jsx'
import Person1 from '../../assets/person-1.png'

const Profile = () => {
    return (
        <div className="flex flex-col gap-5 items-center">
            <ProfileImage image={Person1} />
            <div className='flex flex-col gap-[13px] w-full'>
                <ProfileName>Name</ProfileName>
                <ProfileJob>Web Developer</ProfileJob>
                <ProfileLocation>Purwokerto</ProfileLocation>
                <ProfileStatus>Freelance</ProfileStatus>
            </div>
                <ProfileDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, repudiandae!</ProfileDescription>
                <Button>Button</Button>
        </div>
    )
}

export default Profile