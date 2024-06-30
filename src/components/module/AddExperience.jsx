import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import api from '../../configs/api'
import Button from '../base/Button'
import ExperienceContent from '../base/ExperienceContent'
import CompanyLogo from '../../assets/company-logo.png'

import { useDispatch, useSelector } from 'react-redux';
import { addExperience, deleteExperience, getMyExperience, updateExperience } from '../../configs/redux/experienceSlice'


const AddExperience = () => {

    const dispatch = useDispatch()

    const experience = useSelector((state) => state.experience.myExperience)

    const [form, setForm] = useState({
        id: null,
        position: '',
        company: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    useEffect(() => {
        dispatch(getMyExperience())
    }, [])

    const handleAddExperience = async (e) => {
        e.preventDefault()
        
        console.log(form);
        if (form.id) {
            await dispatch(updateExperience(form))
            await dispatch(getMyExperience())
        } else {
            await dispatch(addExperience(form))
            await dispatch(getMyExperience())
        }
        resetForm();
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (selectedExperience) => {
        setForm(selectedExperience);
    }

    const handleDelete = (id) => {
        dispatch(deleteExperience(id))
    }

    const resetForm = () => {
        setForm({
            id: null,
            position: '',
            company: '',
            start_date: '',
            end_date: '',
            description: '',
        })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-8'>
                    <Input
                        type='text'
                        value={form.position}
                        onChange={handleChange}
                        name="position"
                        label="Posisi"
                        placeholder="web developer"
                    />
                    <Input
                        type='text'
                        value={form.company}
                        onChange={handleChange}
                        name="company"
                        label="Nama perusahaan"
                        placeholder="PT Harus bisa" />
                    <div className='flex gap-[15px]'>
                        <Input
                            type='text'
                            value={form.start_date}
                            onChange={handleChange}
                            name="start_date"
                            label="Tanggal Mulai"
                            placeholder="2022-01-15"
                        />
                        <Input
                            type='text'
                            value={form.end_date}
                            onChange={handleChange}
                            name="end_date"
                            label="Tanggal Berakhir"
                            placeholder="2022-06-30"
                        />
                    </div>
                    <Input
                        type='textarea'
                        value={form.description}
                        onChange={handleChange}
                        name="description"
                        label="Deskripsi singkat"
                        placeholder="Deskripsikan pekerjaan anda"
                    />
                </div >
                <div className='border-t border-[#E2E5ED] pt-[30px]'>
                    <Button
                        className='w-full'
                        text={form.id ? 'Perbaharui Pengalaman Kerja' : 'Tambah Pengalaman Kerja'}
                        onClick={handleAddExperience}
                    />
                </div>
                <ul className={experience ? 'border-t border-[#E2E5ED] pt-[30px] flex flex-col gap-4' : 'border-hidden'}>
                    {experience.map((item) => (
                        <div key={item.id} className='flex justify-between w-full items-center'>
                            <ExperienceContent
                                key={item.id}
                                companyLogo={item.photo ? item.photo : CompanyLogo}
                                position={item.position}
                                company={item.company}
                                startDate={formatDate(item.start_date)}
                                endDate={formatDate(item.end_date)}
                                duration={item.duration_in_months}
                                description={item.description}
                            />
                            <div className='flex gap-2 h-fit'>
                                <Button variant='primary-yellow' onClick={() => handleSelect(item)} text='Select' />
                                <Button variant='secondary-yellow' onClick={() => handleDelete(item.id)} text='Delete' />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AddExperience