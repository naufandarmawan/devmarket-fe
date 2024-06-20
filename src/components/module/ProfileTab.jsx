import React, { useEffect, useState } from 'react'
import CompanyLogo from '../../assets/company-logo.png'
import PortfolioContent from '../base/PortfolioContent'
import ExperienceContent from '../base/ExperienceContent'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'


const ProfileTab = () => {
    const { id } = useParams()
    const [toggle, setToggle] = useState(1)
    const handleToggle = (id) => {
        setToggle(id)
    }

    const [portfolioData, setPortfolioData] = useState([])
    const [experienceData, setExperienceData] = useState([])


    useEffect(() => {
        // const token = localStorage.getItem('token')

        api.get(`/portfolio/${id}`)
            .then((res) => {
                const result = res.data.data
                console.log(result)
                setPortfolioData(result)
            })
            .catch((err) => {
                console.log(err.response);
            })

        api.get(`/experience/${id}`)
            .then((res) => {
                const result = res.data.data
                console.log(result)
                setExperienceData(result)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [])

    return (
        <div className='flex flex-col gap-[34px]'>
            <ul className='flex gap-[30px] max-lg:overflow-x-scroll'>
                <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle(1)}>
                    <h1 className={toggle === 1 ? 'font-semibold text-[22px] text-[#1F2A36] max-lg:text-base' : 'font-semibold text-[22px] text-[#9EA0A5] max-lg:text-base'}>Portofolio</h1>
                    <div className={toggle === 1 ? 'bg-[#5E50A1] h-1 rounded-full' : 'bg-transparent h-1 rounded-full'}></div>
                </li>
                <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle(2)}>
                    <h1 className={toggle === 2 ? 'font-semibold text-[22px] text-[#1F2A36] max-lg:text-base' : 'font-semibold text-[22px] text-[#9EA0A5] max-lg:text-base'}>Pengalaman Kerja</h1>
                    <div className={toggle === 2 ? 'bg-[#5E50A1] h-1 rounded-full' : 'bg-transparent h-1 rounded-full'}></div>
                </li>
            </ul>

            <div className={toggle === 1 ? 'block' : 'hidden'}>
                <div className='grid grid-cols-3 gap-x-[18px] gap-y-[30px] max-lg:grid-cols-1'>
                    {portfolioData.map((item) => (
                        <PortfolioContent
                            app={item.application_name}
                            image={item.image}
                            link={item.link_repository}
                        />
                    ))}
                </div>
            </div>

            <div className={toggle === 2 ? 'block' : 'hidden'}>
                <div className='flex flex-col gap-4'>
                    {experienceData.map((item) => (
                        <ExperienceContent
                            companyLogo={item.photo ? item.photo : CompanyLogo}
                            position={item.position}
                            company={item.company}
                            workMonth={item.work_month}
                            workYear={item.work_year}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileTab