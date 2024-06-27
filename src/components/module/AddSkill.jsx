import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import Button from '../base/Button'
import Tag from '../base/Tag'
import api from '../../configs/api'
import RemoveIcon from '../../assets/grey-arrow-left.svg'

const AddSkill = () => {
    const [skill, setSkill] = useState('')
    const [mySkill, setMySkill] = useState([])

    const getSkill = () => {
        api.get('/skills')
            .then((res) => {
                const skills = res.data.data
                setMySkill(skills)
            })
    }

    const handleSkill = () => {
        api.post(`/skills`,
            { skill_name: skill })
            .then((res) => {
                setSkill('')
                getSkill()
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleDelete = (id) => {
        api.delete(`/skills/${id}`)
            .then(() => {
                getSkill()
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getSkill()
    }, [])


    return (
        <div className='flex flex-col gap-[30px]'>
            <div className='flex gap-[30px]'>
                <Input
                    className='w-full'
                    type='text'
                    label=''
                    placeholder='Masukkan skill'
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />
                <Button variant='primary-yellow' onClick={handleSkill} text='Tambah'/>
            </div>
            <ul className='flex gap-2'>
                {mySkill.map((item) => (
                    <div key={item.id} className='flex justify-between items-center gap-1'>
                        <Tag key={item.id} skill={item.skill_name} />
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