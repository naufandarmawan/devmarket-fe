import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import api from '../../configs/api'
import Button from '../base/Button'
import ExperienceContent from '../base/ExperienceContent'
import CompanyLogo from '../../assets/company-logo.png'
import PortfolioContent from '../base/PortfolioContent'
import GreyUpload from '../../assets/grey-upload.svg'
import GreyImage from '../../assets/grey-photo.svg'
import GreySize from '../../assets/grey-expand.svg'

import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from '../../configs/redux/portfolioSlice';
import { uploadFile, clearImage } from '../../configs/redux/assetSlice'


const AddPortfolio = () => {

    const dispatch = useDispatch()

    // const [portfolio, setPortfolio] = useState([])

    const portfolio = useSelector((state) => state.portfolio.portfolio)
    const image = useSelector((state) => state.asset.image);
    const uploadStatus = useSelector((state) => state.asset.status);

    const [form, setForm] = useState({
        id: '',
        application_name: '',
        link_repository: '',
        application: 'Aplikasi Mobile',
        image: '',
    });

    // const getPortfolio = () => {
    //     api.get(`/portfolio/`)
    //         .then((res) => {
    //             const result = res.data.data
    //             console.log(result);
    //             setPortfolio(result)
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         })
    // }

    const handleAdd = (e) => {
        e.preventDefault()
        // console.log(form);
        // const { id, created_at, updated_at, ...postData } = form;
        // if (form.id) {
        //     api.put(`/portfolio/${form.id}`, postData)
        //         .then((res) => {
        //             console.log(res);
        //             alert('Berhasil memperbarui data');
        //             getPortfolio();
        //             resetForm()
        //             // setSelectedExperience(null); // Clear selected experience after update
        //         })
        //         .catch((err) => {
        //             console.log(err.response);
        //             alert('Gagal memperbarui data');
        //         });
        // } else {
        //     api.post('/portfolio', postData)
        //         .then((res) => {
        //             console.log(res)
        //             alert('Berhasil untuk memperbarui data')
        //             getPortfolio()
        //             resetForm()
        //         })
        //         .catch((err) => {
        //             console.log(err.response);
        //             alert('Gagal untuk memperbarui data')
        //         })
        // }
        if (form.id) {
            dispatch(updatePortfolio(form));
        } else {
            dispatch(addPortfolio(form));
        }
        resetForm();


    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (selectedPortfolio) => {
        setForm(selectedPortfolio);
    }

    const handleDelete = (id) => {
        // api.delete(`/portfolio/${id}`)
        //     .then(() => {
        //         getPortfolio()
        //     })
        //     .catch((err) => {
        //         console.log(err.response);
        //     })
        dispatch(deletePortfolio(id));
    }

    const resetForm = () => {
        setForm({
            id: '',
            application_name: '',
            link_repository: '',
            application: '',
            image: '',
        }),
            dispatch(clearImage());
    }

    const handleFile = (e) => {
        const file = e.target.files[0]

        dispatch(uploadFile(file));
        // const formData = new FormData()
        // formData.append('file', file)
        // api.post(`/upload`, formData)
        //     .then((res) => {
        //         const { file_url } = res.data.data
        //         setForm({ ...form, image: file_url })
        //     })
        //     .catch((err) => {
        //         console.log(err.response);
        //     });
    }

    // useEffect(() => {
    //     getPortfolio()
    // }, [])

    useEffect(() => {
        dispatch(getPortfolio())
    }, [dispatch])

    useEffect(() => {
        if (uploadStatus === 'succeeded') {
            setForm((prevForm) => ({
                ...prevForm,
                image,
            }));
        }
    }, [image, uploadStatus]);

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

                    <div className='flex flex-col gap-1'>
                        <label className='font-normal text-xs text-[#9EA0A5] pl-[5px]'>Tipe</label>
                        <div className='flex items-center gap-4'>
                            <label className={form.application === 'Aplikasi Mobile' ? "flex items-center border border-[#E2E5ED] rounded-lg p-[15px] font-semibold text-sm text-[#46505C] accent-[#5E50A1]" : "flex items-center p-[15px] font-normal text-sm text-[#9EA0A5]"}>
                                <input
                                    type='radio'
                                    name='application'
                                    value='Aplikasi Mobile'
                                    checked={form.application === 'Aplikasi Mobile'}
                                    onChange={handleChange}
                                    className='mr-2 size-4'
                                />
                                Aplikasi Mobile
                            </label>
                            <label className={form.application === 'Aplikasi Web' ? "flex items-center border border-[#E2E5ED] rounded-lg p-[15px] font-semibold text-sm text-[#46505C] accent-[#5E50A1]" : "flex items-center p-[15px] font-normal text-sm text-[#9EA0A5]"}>
                                <input
                                    type='radio'
                                    name='application'
                                    value='Aplikasi Web'
                                    checked={form.application === 'Aplikasi Web'}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                Aplikasi Web
                            </label>
                        </div>
                    </div>

                    <label htmlFor="upload-file" className=" flex flex-col gap-1 w-full">
                        <p className='font-normal text-xs text-[#9EA0A5] pl-[5px]'>Upload gambar</p>
                        <input type="file" id="upload-file" className='hidden' onChange={handleFile} />
                        <div style={{ backgroundImage: `url(${form.image})` }} className={form.image ? "rounded-lg w-full cursor-pointer h-80 bg-cover" : "p-12 flex flex-col items-center gap-5 border border-[#E2E5ED] rounded-lg w-full cursor-pointer"}>
                            <div className={form.image ? 'hidden' : 'flex flex-col gap-10'}>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={GreyUpload} className='size-[114px]' />
                                    <p className="font-normal text-sm text-[#1F2A36]">Drag & Drop untuk Upload Gambar Aplikasi</p>
                                    <p className="font-normal text-xs text-[#1F2A36]">Atau cari untuk mengupload file dari direktorimu.</p>
                                </div>
                                <div className='flex gap-10'>
                                    <div className="flex items-center gap-3">
                                        <img src={GreyImage} className='size-8' />
                                        <div className='flex flex-col gap-1 font-normal text-xs text-[#1F2A36]'>
                                            <p>High-Res Image</p>
                                            <p>PNG, JPG or GIF</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={GreySize} className='size-8' />
                                        <div className='flex flex-col gap-1 font-normal text-xs text-[#1F2A36]'>
                                            <p>Size</p>
                                            <p>1080x1920 or 600x800</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>

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