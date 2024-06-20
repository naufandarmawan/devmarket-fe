import React from 'react'
import GreySearch from '../../assets/grey-search.svg'
import Button from '../base/Button'
import Input from '../base/Input'


const Search = ({...props}) => {
    return (
        <div className="flex bg-white p-[8px] rounded-[8px] overflow-hidden shadow-[0px_1px_20px_0_rgba(197,197,197,0.25)]">
            <div className='flex w-full pr-[25px]'>
                <Input {...props} className='p-[20px] outline-none font-normal text-sm leading-5 text-[#1F2A36] placeholder:text-[#858D96] border-0' label='' type="text" placeholder='Search for any skill'/>
                <img className='w-6' src={GreySearch} alt="" />
            </div>

            <div className='flex border-l pl-[25px] gap-[25px]'>
                <select className='outline-none font-normal text-sm leading-5 text-[#1F2A36]' name="" id="">
                    <option value="" selected>Kategori</option>
                    <option value="nama">Sortir berdasarkan nama</option>
                    <option value="skill">Sortir berdasarkan Skill</option>
                    <option value="lokasi">Sortir berdasarkan Lokasi</option>
                    <option value="freelance">Sortir berdasarkan freelance</option>
                    <option value="fulltime">Sortir berdasarkan fulltime</option>
                </select>
                <Button className="px-[30px] py-[15px] rounded-[4px] font-bold text-sm leading-6 text-white bg-[#5E50A1]">Search</Button>
            </div>
        </div>
    )
}

export default Search