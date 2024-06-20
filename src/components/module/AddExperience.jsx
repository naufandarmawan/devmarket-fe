import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import api from '../../configs/api'
import Button from '../base/Button'
import ExperienceContent from '../base/ExperienceContent'
import CompanyLogo from '../../assets/company-logo.png'


const AddExperience = () => {
    const [experience, setExperience] = useState([])
    const [form, setForm] = useState({
        id:null,
        position: '',
        company: '',
        work_month: '',
        work_year: '',
        description: '',
    });

    // const [selectedExperience, setSelectedExperience] = useState(null);

    const getExperience = () => {
        api.get(`/experience/`)
            .then((res) => {
                const result = res.data.data
                console.log(result);
                setExperience(result)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getExperience()
    }, [])

    const handleAddExperience = (e) => {
        e.preventDefault()
        // console.log(form);
        if (form.id) {
            const { id, created_at, updated_at, ...updateData } = form;
            api.put(`/experience/${form.id}`, {...updateData})
                .then((res) => {
                    console.log(res);
                    alert('Berhasil memperbarui data');
                    getExperience();
                    resetForm()
                    // setSelectedExperience(null); // Clear selected experience after update
                })
                .catch((err) => {
                    console.log(err.response);
                    alert('Gagal memperbarui data');
                });
        } else {
            api.post('/experience', form)
                .then((res) => {
                    console.log(res)
                    alert('Berhasil untuk memperbarui data')
                    resetForm()
                })
                .catch((err) => {
                    console.log(err.response);
                    alert('Gagal untuk memperbarui data')
                })
        }

    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (selectedExperience) => {
        
        setForm(selectedExperience);
        // setSelectedExperience(selected);
    }

    const handleDelete = (id) => {
        api.delete(`/experience/${id}`)
            .then(() => {
                getExperience()
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const resetForm = () => {
        setForm({
            id: null,
            position: '',
            company: '',
            work_month: '',
            work_year: '',
            description: '',
        })
    }

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
                        value={form.work_month}
                        onChange={handleChange}
                        name="work_month"
                        label="Bulan"
                        placeholder="Januari"
                    />
                    <Input
                        type='text'
                        value={form.work_year}
                        onChange={handleChange}
                        name="work_year"
                        label="Tahun"
                        placeholder="2018"
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
                                workMonth={item.work_month}
                                workYear={item.work_year}
                                description={item.description}
                            />
                            <div className='flex gap-2 h-fit'>
                                <Button variant='primary-yellow' onClick={()=>handleSelect(item)} text='Select' />
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