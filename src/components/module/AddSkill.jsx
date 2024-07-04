import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import Button from '../base/Button'
import Tag from '../base/Tag'

import { useDispatch, useSelector } from 'react-redux';
import { getMySkill, addSkill, deleteSkill } from '../../configs/redux/skillsSlice';


const AddSkill = () => {

    const dispatch = useDispatch();

    const [form, setForm] = useState('')

    const mySkill = useSelector((state) => state.skills.mySkills)

    const handleSkill = () => {
        dispatch(addSkill(form));
        setForm('');
        dispatch(getMySkill())
    }

    const handleDelete = (id) => {
        dispatch(deleteSkill(id));
    }

    useEffect(() => {
        dispatch(getMySkill())
    }, [])


    return (
        <div className='flex flex-col gap-[30px]'>
            <div className='flex gap-[30px]'>
                <Input
                    className='w-full'
                    type='text'
                    label=''
                    placeholder='Enter skill'
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                />
                <Button variant='primary-yellow' onClick={handleSkill} text='Add' />
            </div>
            <ul className='flex gap-2'>
                {mySkill.map((item) => (
                    <div key={item.id} className='flex justify-between items-center gap-1'>
                        <Tag skill={item.skill_name} />
                        {/* <img className='w-[12px]' onClick={()=>handleDelete(item.id)} src={RemoveIcon} /> */}
                        <p className='cursor-pointer' onClick={() => handleDelete(item.id)}>X</p>
                        {/* <div onClick={()=>handleDelete(item.id)}>Delete</div> */}
                    </div>
                ))}
            </ul>

        </div>
    )
}

export default AddSkill