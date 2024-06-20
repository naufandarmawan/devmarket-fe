import React from 'react'
import LoginImage from '../../assets/login-image.png'
import WhiteLogo from '../../assets/white-logo.svg'
import { Link } from 'react-router-dom'

const HeroAuth = ({children}) => {
    return (
            <div className="sticky top-8 flex flex-col p-[44px] bg-cover" style={{ backgroundImage: `url(${LoginImage})` }} >
                <Link to='/'><img className="h-[24px] w-fit" src={WhiteLogo} alt="" /></Link>
                <h1 className="pl-5 pr-10 py-[173px] font-bold text-[44px] leading-[70px] text-white">{children}</h1>
            </div>
    )
}

export default HeroAuth