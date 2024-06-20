import React, { Children } from 'react'

const FormSubContainer = ({ children, subTitle }) => {
  return (
    <div className='bg-[#FFFFFF] h-fit rounded-lg'>

      <h4 className='p-[30px] font-semibold text-[22px] text-[#1F2A36]'>{subTitle}</h4>
      <div className='bg-[#C4C4C4] h-[1px]'></div>

      <div className="flex flex-col gap-8 p-[30px]">
        {children}
      </div>

    </div>
  )
}

export default FormSubContainer