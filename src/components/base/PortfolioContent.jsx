import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const PortfolioContent = ({ app, image, link }) => {
  // const navigate = useNavigate()

  // const handleNavigate = () => {
  //   navigate(`${link}`)
  // }

  return (
    <Link to={link}>
      <div className='flex flex-col items-center gap-2'>
        <img className='w-[219px] h-[148px] object-cover' src={image} />
        <p className='font-normal text-sm leading-6 text-[#1F2A36]'>{app}</p>
      </div>
    </Link>
  )
}

export default PortfolioContent