import React from 'react'

const Tag = ({ skill, ...props }) => {
    return (
        <li {...props}
            className="px-[14px] py-[4px] bg-[#FBB017] bg-opacity-60 border border-[#FBB017] border-solid rounded-[4px] font-semibold text-xs leading-5 text-white">
            {skill ? skill : 'Skill'}</li>
    )
}

export default Tag