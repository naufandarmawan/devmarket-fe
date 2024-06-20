import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import api from '../../configs/api'
import Button from '../base/Button'
import ExperienceContent from '../base/ExperienceContent'
import CompanyLogo from '../../assets/company-logo.png'
import PortfolioContent from '../base/PortfolioContent'


const AddPortfolio = () => {
    const [portfolio, setPortfolio] = useState([])
    const [form, setForm] = useState({
        id: '',
        application_name: '',
        link_repository: '',
        application: '',
        image: '',
    });

    // const [selectedExperience, setSelectedExperience] = useState(null);

    const getPortfolio = () => {
        api.get(`/portfolio/`)
            .then((res) => {
                const result = res.data.data
                console.log(result);
                setPortfolio(result)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        // console.log(form);
        const { id, created_at, updated_at, ...postData } = form;
        if (form.id) {
            api.put(`/portfolio/${form.id}`, postData)
                .then((res) => {
                    console.log(res);
                    alert('Berhasil memperbarui data');
                    getPortfolio();
                    resetForm()
                    // setSelectedExperience(null); // Clear selected experience after update
                })
                .catch((err) => {
                    console.log(err.response);
                    alert('Gagal memperbarui data');
                });
        } else {
            api.post('/portfolio', postData)
                .then((res) => {
                    console.log(res)
                    alert('Berhasil untuk memperbarui data')
                    getPortfolio()
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

    const handleSelect = (selectedPortfolio) => {

        setForm(selectedPortfolio);
        // setSelectedExperience(selected);
    }

    const handleDelete = (id) => {
        api.delete(`/portfolio/${id}`)
            .then(() => {
                getPortfolio()
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const resetForm = () => {
        setForm({
            id: '',
            application_name: '',
            link_repository: '',
            application: '',
            image: '',
        })
    }

    const handleUpload = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        api.post(`/upload`, formData)
            .then((res) => {
                const { file_url } = res.data.data
                setForm({ ...form, image: file_url })
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    return (
        <div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-8'>
                    <Input
                        type='text'
                        value={form.application_name}
                        onChange={handleChange}
                        name="application_name"
                        label="Nama Aplikasi"
                        placeholder="Gojek"
                    />
                    <Input
                        type='text'
                        value={form.link_repository}
                        onChange={handleChange}
                        name="link_repository"
                        label="Link Repo"
                        placeholder="Github" />
                    <Input
                        type='text'
                        value={form.application}
                        onChange={handleChange}
                        name="application"
                        label="Tipe"
                        placeholder="Tipe"
                    />
                    {form.image && <img src={form.image} />}
                    <input type="file" onChange={handleUpload} />
                </div >
                <div className='border-t border-[#E2E5ED] pt-[30px]'>
                    <Button
                        className='w-full'
                        text={form.id ? 'Perbaharui Portfolio Kerja' : 'Tambah Portfolio Kerja'}
                        onClick={handleAdd}
                    />
                </div>
                <ul className={portfolio ? 'grid grid-cols-3 gap-x-[18px] gap-y-[30px] max-lg:grid-cols-1 border-t border-[#E2E5ED] pt-[30px]' : 'border-hidden'} >
                    {portfolio.map((item) => (
                        <div key={item.id} className='flex flex-col gap-2 items-center'>
                            <PortfolioContent
                                key={item.id}
                                app={item.application_name}
                                image={item.image}
                                link={item.link_repository}
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
        // <div>
        //     <Input />
        //     <Input />
        //     <div className='flex'>
        //         <Input type='radio' />
        //         <Input type='radio' />
        //     </div>
        //     <Input type='file' />
        // </div>
    )
}

export default AddPortfolio