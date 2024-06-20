import React from 'react'

const CarouselCard = ({image, name, position, description}) => {
    return (
        <div
            className="px-[36px] py-[36px] m-[15px] flex flex-col items-center gap-[12px] shadow-[0px_1px_20px_0_rgba(197,197,197,0.25)]">
            <img className="rounded-full border-[10px] w-fit border-[#FBB017]/[.37]"
                src={image} />
            <h3 className="font-semibold text-[30px] leading-[56px] text-[#1F2A36] text-center">{name}
            </h3>
            <p className="font-normal text-lg leading-7 text-[#9EA0A5] text-center">{position}</p>
            <p className="font-normal text-lg leading-7 text-[#46505C] text-center">{description}
            </p>
        </div>
    )
}

export default CarouselCard