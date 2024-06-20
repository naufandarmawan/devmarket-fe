import React from 'react'

const Button = ({ variant = '', text = 'Button', className, ...props }) => {
    if (variant === 'primary-purple') {
        return (
            <button {...props} className={`p-[15px] bg-[#5E50A1] rounded-[4px] font-bold text-base leading-5 text-[#FFFFFF] ${className}`}>{text}</button>
        )
    } else if (variant === 'secondary-purple') {
        return (
            <button {...props} className={`p-[15px] bg-white border border-[#5E50A1] rounded-[4px] font-bold text-base leading-5 text-[#5E50A1] ${className}`}>{text}</button>
        )
    } else if (variant === 'primary-yellow') {
        return (
            <button {...props} className={`p-[15px] bg-[#FBB017] rounded-[4px] font-bold text-base leading-5 text-[#FFFFFF] ${className}`}>{text}</button>
        )
    } else {
        return (
            <button {...props} className={`p-[15px] bg-white border border-[#FBB017] rounded-[4px] font-bold text-base leading-5 text-[#FBB017] ${className}`}>{text}</button>
        )
    }

}

export default Button