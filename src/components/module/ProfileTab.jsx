import React, { useEffect, useState } from 'react'
import CompanyLogo from '../../assets/company-logo.png'
import PortfolioContent from '../base/PortfolioContent'
import ExperienceContent from '../base/ExperienceContent'
// import { useParams } from 'react-router-dom'
import api from '../../configs/api'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPortfolio, getPortfolio } from '../../configs/redux/portfolioSlice'
import { getExperience, getMyExperience } from '../../configs/redux/experienceSlice'


const ProfileTab = ({ user }) => {

    const [toggle, setToggle] = useState(1)
    const handleToggle = (id) => {
        setToggle(id)
    }

    const dispatch = useDispatch()

    const portfolio = useSelector((state) => state.portfolio.portfolio)
    const myPortfolio = useSelector((state) => state.portfolio.myPortfolio)
    const experience = useSelector((state) => state.experience.experience)
    const myExperience = useSelector((state) => state.experience.myExperience)

    const [portfolioData, setPortfolioData] = useState([])
    const [experienceData, setExperienceData] = useState([])


    useEffect(() => {
        // const token = localStorage.getItem('token')
        // console.log(user);
        if (user) {
            dispatch(getPortfolio(user))
            dispatch(getExperience(user))
            // api.get(`/portfolio/${user}`)
            //     .then((res) => {
            //         const result = res.data.data
            //         console.log(result)
            //         setPortfolioData(result)
            //     })
            //     .catch((err) => {
            //         console.log(err.response);
            //     })

            // api.get(`/experience/${user}`)
            //     .then((res) => {
            //         const result = res.data.data
            //         console.log(result)
            //         setExperienceData(result)
            //     })
            //     .catch((err) => {
            //         console.log(err.response);
            //     })
        } else {
            dispatch(getMyPortfolio())
            dispatch(getMyExperience())
            // api.get(`/portfolio`)
            //     .then((res) => {
            //         const result = res.data.data
            //         console.log(result)
            //         setPortfolioData(result)
            //     })
            //     .catch((err) => {
            //         console.log(err.response);
            //     })

            // api.get(`/experience`)
            //     .then((res) => {
            //         const result = res.data.data
            //         console.log(result)
            //         setExperienceData(result)
            //     })
            //     .catch((err) => {
            //         console.log(err.response);
            //     })
        }

    }, [dispatch, user])

    useEffect(() => {
        if (user) {
            setPortfolioData(portfolio)
            setExperienceData(experience)
        } else {
            setPortfolioData(myPortfolio)
            setExperienceData(myExperience)
        }
    }, [user, portfolio, myPortfolio, experience, myExperience])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

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
                            key={item.id}
                            app={item.name}
                            image={item.image}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>

            <div className={toggle === 2 ? 'block' : 'hidden'}>
                <div className='flex flex-col gap-4'>
                    {experienceData.map((item) => (
                        <ExperienceContent
                            key={item.id}
                            companyLogo={item.photo ? item.photo : CompanyLogo}
                            position={item.position}
                            company={item.company}
                            startDate={formatDate(item.start_date)}
                            endDate={formatDate(item.end_date)}
                            duration={item.duration_in_months}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileTab