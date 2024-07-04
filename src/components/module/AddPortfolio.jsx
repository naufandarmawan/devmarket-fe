import React, { useEffect, useState } from 'react'
import Input from '../base/Input'
import Button from '../base/Button'
import PortfolioContent from '../base/PortfolioContent'
import GreyUpload from '../../assets/grey-upload.svg'
import GreyImage from '../../assets/grey-photo.svg'
import GreySize from '../../assets/grey-expand.svg'

import { useDispatch, useSelector } from 'react-redux';
import { addPortfolio, updatePortfolio, deletePortfolio, getMyPortfolio } from '../../configs/redux/portfolioSlice';
import { uploadFile } from '../../configs/redux/assetSlice'


const AddPortfolio = () => {

    const dispatch = useDispatch()

    const portfolio = useSelector((state) => state.portfolio.myPortfolio)
    const image = useSelector((state) => state.asset.file);

    const [form, setForm] = useState({
        id: null,
        image: '',
        name: '',
        type: 'Aplikasi Mobile',
        link: ''
    });

    const handleAdd = async (e) => {
        e.preventDefault()

        console.log(form);
        if (form.id) {
            await dispatch(updatePortfolio(form))
            await dispatch(getMyPortfolio())
        } else {
            await dispatch(addPortfolio(form))
            await dispatch(getMyPortfolio())
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
        // console.log(selectedPortfolio);
        setForm(selectedPortfolio);
    }

    const handleDelete = (id) => {
        dispatch(deletePortfolio(id));
    }

    const resetForm = () => {
        setForm({
            id: null,
            image: '',
            name: '',
            type: 'Aplikasi Mobile',
            link: ''
        })
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        dispatch(uploadFile(formData))
    }

    useEffect(() => {
        dispatch(getMyPortfolio())
    }, [])

    useEffect(() => {
        if (image) {
            setForm((prevForm) => ({ ...prevForm, image: image }));
        }
        console.log(form);
    }, [image]);

    return (
        <div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-8'>
                    <Input
                        type='text'
                        value={form.name}
                        onChange={handleChange}
                        name="name"
                        label="Application Name"
                        placeholder="Gojek"
                    />
                    <Input
                        type='text'
                        value={form.link}
                        onChange={handleChange}
                        name="link"
                        label="Repository Link"
                        placeholder="Github" />

                    <div className='flex flex-col gap-1'>
                        <label className='font-normal text-xs text-[#9EA0A5] pl-[5px]'>Type</label>
                        <div className='flex items-center gap-4'>
                            <label className={form.type === 'Aplikasi Mobile' ? "flex items-center border border-[#E2E5ED] rounded-lg p-[15px] font-semibold text-sm text-[#46505C] accent-[#5E50A1]" : "flex items-center p-[15px] font-normal text-sm text-[#9EA0A5]"}>
                                <input
                                    type='radio'
                                    name='type'
                                    value='Aplikasi Mobile'
                                    checked={form.type === 'Aplikasi Mobile'}
                                    onChange={handleChange}
                                    className='mr-2 size-4'
                                />
                                Aplikasi Mobile
                            </label>
                            <label className={form.type === 'Aplikasi Web' ? "flex items-center border border-[#E2E5ED] rounded-lg p-[15px] font-semibold text-sm text-[#46505C] accent-[#5E50A1]" : "flex items-center p-[15px] font-normal text-sm text-[#9EA0A5]"}>
                                <input
                                    type='radio'
                                    name='type'
                                    value='Aplikasi Web'
                                    checked={form.type === 'Aplikasi Web'}
                                    onChange={handleChange}
                                    className='mr-2'
                                />
                                Aplikasi Web
                            </label>
                        </div>
                    </div>

                    <label htmlFor="upload-file" className=" flex flex-col gap-1 w-full">
                        <p className='font-normal text-xs text-[#9EA0A5] pl-[5px]'>Upload Image</p>
                        <input type="file" id="upload-file" className='hidden' onChange={handleFile} />
                        <div style={{ backgroundImage: `url(${form.image})` }} className={form.image ? "rounded-lg w-full cursor-pointer h-80 bg-cover" : "p-12 flex flex-col items-center gap-5 border border-[#E2E5ED] rounded-lg w-full cursor-pointer"}>
                            <div className={form.image ? 'hidden' : 'flex flex-col gap-10'}>
                                <div className="flex flex-col items-center gap-3">
                                    <img src={GreyUpload} className='size-[114px]' />
                                    <p className="font-normal text-sm text-[#1F2A36]">Drag & Drop to Upload Application Image</p>
                                    <p className="font-normal text-xs text-[#1F2A36]">Or browse to upload a file from your directory.</p>
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
                        text={form.id ? 'Update Portfolio' : 'Add Portfolio'}
                        onClick={handleAdd}
                    />
                </div>
                <ul className={portfolio ? 'grid grid-cols-3 gap-x-[18px] gap-y-[30px] max-lg:grid-cols-1 border-t border-[#E2E5ED] pt-[30px]' : 'border-hidden'} >
                    {portfolio.map((item) => (
                        <div key={item.id} className='flex flex-col gap-2 items-center'>
                            <PortfolioContent
                                key={item.id}
                                app={item.name}
                                image={item.image}
                                link={item.link}
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

export default AddPortfolio