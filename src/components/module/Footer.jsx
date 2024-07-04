import React from 'react'
import WhiteLogo from '../../assets/white-logo.svg'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <footer className="bg-[#5E50A1] px-[150px] pt-[70px] pb-[42px] max-lg:p-8">
            <div className="container mx-auto flex flex-col gap-[67px] max-lg:gap-6">
                <div className="flex flex-col gap-[30px]">
                    <img className="h-[50px] w-fit max-lg:w-full" src={WhiteLogo} alt="" />
                    <p className="w-1/3 font-normal text-lg leading-7 text-white max-lg:w-full max-lg:text-center">Peworld provides an innovative solution to streamline the recruitment process, allowing talent to access the latest career opportunities globally.</p>
                </div>
                <div className="flex justify-between pt-[30px] border-t border-white max-lg:flex-col max-lg:items-center max-lg:gap-3">
                    <p className="font-normal text-lg leading-7 text-white max-lg:text-center">© 2024 Pewworld. All rights reserved.</p>
                    <div className="flex gap-[79px]">
                        <Link to='/' className='font-normal text-lg leading-7 text-white'>Phone</Link>
                        <Link to='mailto:naufandarmawan@gmail.com' className='font-normal text-lg leading-7 text-white'>Email</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer