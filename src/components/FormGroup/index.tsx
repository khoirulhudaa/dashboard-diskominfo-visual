"use client"

import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import ErrorMessage from '../ErrorMessage'
import InputField from '../InputField'
import SweetAlert from '../SweetAlert'
import { useAuthSignUpFormik } from '../Validation/useAuthSignUpFormik'
import { useDinasFormik } from '../Validation/useDinasFormik'
import { useUpdateAuthFormik } from '../Validation/useUpdateAuthFormik'
import { useVisualFormik } from '../Validation/useVisualFormik'
import API from '@/services/services'

const FormGroup: React.FC<any> = ({
    type,
    close,
    handleStatus
}) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [dinas, setDinas] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const response = await API.getAllDinas()
            const transformData = (dataArray: any) => {
                // Transform the data array into an array of new objects
                const transformedArray = dataArray.map((item: any) => ({ label: item.dinas_name, value: item.dinas_name }));
               
                // Add an object with label and value at the beginning of the array
                transformedArray.unshift({ label: "Pilih jenis dinas", value: "", disabled: true  });
               
                return transformedArray;
               };
               
            // Use the function to transform the data
            const newObjects = transformData(response?.data?.data);
            setDinas(newObjects)
        })()
    }, [])

    const handleResponse = () => {
        setError('')
        close()
        handleStatus()
        setLoading(false)
        SweetAlert({
            title: 'Berhasil tambah data!',
            showCancelButton: false,
            icon: 'success'
        })
    }
   
    const handleResponseUser = () => {
        setError('')
        close()
        handleStatus()
        setLoading(false)
        SweetAlert({
            title: 'Berhasil tambah anggota!',
            showCancelButton: false,
            icon: 'success'
        })
    }

    const handleResponseUpdateUser = () => {
        setError('')
        close()
        handleStatus()
        setLoading(false)
        SweetAlert({
            title: 'Berhasil perbarui akun!',
            showCancelButton: false,
            icon: 'success'
        })
    }

    const stopLoading = () => {
        setLoading(false)
    }
    
    const handleErrorMessage = (error: string) => {
        setError(error)
        setLoading(false)
    }

    const visualFormik = useVisualFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse,
        stopLoading
    })

    const accountFormik = useAuthSignUpFormik({
        onError: handleErrorMessage,
        onResponse: handleResponseUser
    })

    const updateAccountFormik = useUpdateAuthFormik({
        onError: handleErrorMessage,
        onResponse: handleResponseUpdateUser
    })

    const dinasFormik = useDinasFormik({
        onError: handleErrorMessage,
        onResponse: handleResponse
    })

    switch(type) {
        case "signup" :
            return (
                <form onSubmit={accountFormik.handleSubmit} 
                className={`w-screen md:w-[60vw] h-screen md:h-max overflow-y-auto md:rounded-[20px] bg-white p-5 md:p-7 border border-slate-300`}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className='w-full flex h-max'>
                    <div className='w-full p-2 h-full'>
                        <div className='w-full mb-5 items-center justify-between'>
                            <div className='w-full md:pr-6'>
                                <InputField 
                                    label='Username'
                                    name='username'
                                    id='username'
                                    value={accountFormik.values.username}
                                    placeholder='Masukan nama anggota'
                                    onChange={accountFormik.handleChange}
                                    onBlur={accountFormik.handleBlur}
                                    onError={accountFormik.errors.username}
                                    onTouched={accountFormik.touched.username}
                                />
                            </div>
                            <div className='w-full mt-5'>
                                <InputField 
                                    label='Email'
                                    name='email'
                                    id='email'
                                    placeholder="example@gmail.com"
                                    value={accountFormik.values.email}
                                    onChange={accountFormik.handleChange}
                                    onBlur={accountFormik.handleBlur}
                                    onError={accountFormik.errors.email}
                                    onTouched={accountFormik.touched.email}
                                />
                            </div>
                        </div>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-full'>
                                <InputField 
                                    label='Password'
                                    name='password'
                                    id='password'
                                    placeholder='2356**xxjids'
                                    value={accountFormik.values.password}
                                    onChange={accountFormik.handleChange}
                                    onBlur={accountFormik.handleBlur}
                                    onError={accountFormik.errors.password}
                                    onTouched={accountFormik.touched.password}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-max flex items-center mb-3'>
                    <button type={`${loading ? 'button' : 'submit'}`} onClick={loading ? () => null : () => {accountFormik.handleSubmit(), setLoading(true)}} className={`w-max hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] ${loading ? 'bg-slate-300 text-slate-500' : 'bg-blue-500 text-white'}`}>
                        {
                          loading ? (
                            <div className='flex items-center'>
                                <FaSpinner className='animate-spin duration-200' />
                                <p className='ml-3'>
                                    Tambah anggota
                                </p>
                            </div>
                          ):
                            <p>
                                Tambah anggota
                            </p>
                        }
                    </button>
                    <button onClick={close} className='w-max ml-4 hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] bg-white border border-black text-black'>
                        <p>
                            Batalkan
                        </p>
                    </button>
                </div>
                </form>
            )
        case "update-account" :
            return (
                <form onSubmit={updateAccountFormik.handleSubmit} 
                className={`w-[60vw] h-max rounded-[20px] bg-white p-7 border border-slate-300 `}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className='w-full flex h-max'>
                    <div className='w-full p-2 h-full'>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-1/2 pr-6'>
                                <InputField 
                                    label='Username'
                                    name='username'
                                    id='username'
                                    value={updateAccountFormik.values.username}
                                    placeholder='Masukan nama anggota'
                                    onChange={updateAccountFormik.handleChange}
                                    onBlur={updateAccountFormik.handleBlur}
                                    onError={updateAccountFormik.errors.username}
                                    onTouched={updateAccountFormik.touched.username}
                                />
                            </div>
                            <div className='w-1/2'>
                                <InputField 
                                    label='Email'
                                    name='email'
                                    id='email'
                                    placeholder="example@gmail.com"
                                    value={updateAccountFormik.values.email}
                                    onChange={updateAccountFormik.handleChange}
                                    onBlur={updateAccountFormik.handleBlur}
                                    onError={updateAccountFormik.errors.email}
                                    onTouched={updateAccountFormik.touched.email}
                                />
                            </div>
                        </div>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-full'>
                                <InputField 
                                    label='Password (Isi jika ingin ubah password)'
                                    name='password'
                                    id='password'
                                    placeholder='2356**xxjids'
                                    value={updateAccountFormik.values.password}
                                    onChange={updateAccountFormik.handleChange}
                                    onBlur={updateAccountFormik.handleBlur}
                                    onError={updateAccountFormik.errors.password}
                                    onTouched={updateAccountFormik.touched.password}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-max flex items-center'>
                    <button type={`${loading ? 'button' : 'submit'}`} onClick={loading ? () => null : () => {updateAccountFormik.handleSubmit(), setLoading(true)}} className={`w-max hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] ${loading ? 'bg-slate-300 text-slate-500' : 'bg-blue-500 text-white'}`}>
                        {
                          loading ? (
                            <div className='flex items-center'>
                                <FaSpinner className='animate-spin duration-200' />
                                <p className='ml-3'>
                                    Perbarui data
                                </p>
                            </div>
                          ):
                            <p>
                                Perbarui data
                            </p>
                        }
                    </button>
                    <button onClick={close} className='w-max ml-4 hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] bg-white border border-black text-black'>
                        <p>
                            Batalkan
                        </p>
                    </button>
                </div>
                </form>
            )
        case "visual":
            return (
                <form onSubmit={visualFormik.handleSubmit} 
                className={`w-screen md:w-[60vw] h-screen md:h-[94vh] overflow-y-auto md:rounded-[20px] bg-white p-5 md:p-7 border border-slate-300`}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className='w-full flex h-max'>
                    <div className='w-full p-2 h-full'>
                        <div className='w-full mb-5 md:flex items-center justify-between'>
                            <div className='w-full md:w-1/2 pr-6'>
                                <InputField 
                                    label='Judul data'
                                    name='title'
                                    id='title'
                                    value={visualFormik.values.title}
                                    placeholder='Masukan judul data'
                                    onChange={visualFormik.handleChange}
                                    onBlur={visualFormik.handleBlur}
                                    onError={visualFormik.errors.title}
                                    onTouched={visualFormik.touched.title}
                                />
                            </div>
                            <div className='w-full md:w-1/2 mt-5 md:mt-0'>
                                <InputField 
                                    label='Nama (Uploader)'
                                    name='uploader'
                                    id='uploader'
                                    value={'Diskominfo Kabupaten Cirebon'}
                                />
                            </div>
                        </div>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-full'>
                                <InputField 
                                    label='Deskripsi'
                                    name='description'
                                    id='description'
                                    type="textarea-input"
                                    placeholder='Berikan deskripsi untuk data visualisasi tersebut...'
                                    value={visualFormik.values.description}
                                    onChange={visualFormik.handleChange}
                                    onBlur={visualFormik.handleBlur}
                                    onError={visualFormik.errors.description}
                                    onTouched={visualFormik.touched.description}
                                />
                            </div>
                        </div>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-full'>
                                <InputField 
                                    label='Thumbnail'
                                    name='image'
                                    id='image'
                                    type="file-input"
                                    placeholder='Berikan deskripsi untuk data visualisasi tersebut...'
                                    onChange={(value: any) => {
                                        console.log(value.target.files[0])
                                        visualFormik.setFieldValue('image', value.target.files[0])
                                    }}
                                    onBlur={visualFormik.handleBlur}
                                    onError={visualFormik.errors.image}
                                    onTouched={visualFormik.touched.image}
                                />
                            </div>
                        </div>
                        <div className='w-full mb-5 flex items-center justify-between'>
                            <div className='w-full md:w-1/2 pr-6'>
                                <InputField 
                                    label='Link tableu'
                                    name='link'
                                    id='link'
                                    placeholder='https://......'
                                    value={visualFormik.values.link}
                                    onChange={visualFormik.handleChange}
                                    onBlur={visualFormik.handleBlur}
                                    onError={visualFormik.errors.link}
                                    onTouched={visualFormik.touched.link}
                                />
                            </div>
                            <div className='w-full md:w-1/2 pr-6'>
                                <InputField 
                                    label='Jenis dinas'
                                    name='type_dinas'
                                    id='type_dinas'
                                    type="select-input"
                                    options={dinas}
                                    placeholder='https://......'
                                    value={visualFormik.values.type_dinas}
                                    onChange={visualFormik.handleChange}
                                    onBlur={visualFormik.handleBlur}
                                    onError={visualFormik.errors.type_dinas}
                                    onTouched={visualFormik.touched.type_dinas}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-max flex items-center'>
                    <button onClick={loading && visualFormik.values.title === '' || visualFormik.values.description === '' || visualFormik.values.image === null || visualFormik.values.link === '' || visualFormik.values.type_dinas === '' ? () => null : () => setLoading(true)} className={`w-max hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] ${loading ? 'bg-slate-300 text-slate-500' : 'bg-blue-500 text-white'}`}>
                        {
                          loading ? (
                            <div className='flex items-center'>
                                <FaSpinner className='animate-spin duration-200' />
                                <p className='ml-3'>
                                    Tambah data visual
                                </p>
                            </div>
                          ):
                            <p>
                                Tambah data visual
                            </p>
                        }
                    </button>
                    <button onClick={close} className='w-max ml-4 hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] bg-white border border-black text-black'>
                        <p>
                            Batalkan
                        </p>
                    </button>
                </div>
                </form>
            )
        case "dinas":
            return (
                <form onSubmit={dinasFormik.handleSubmit} 
                className={`w-screen md:w-[60vw] h-screen md:h-[40vh] overflow-y-auto md:rounded-[20px] bg-white p-5 md:p-7 border border-slate-300`}>
                {
                    error !== '' ? (
                        <ErrorMessage error={error} />
                    ):
                        null
                }
                <div className='w-full flex h-max'>
                    <div className='w-full p-2 h-full'>
                        <div className='w-full mb-5 md:flex items-center justify-between'>
                            <InputField 
                                label='Nama dinas'
                                name='dinas_name'
                                id='dinas_name'
                                value={dinasFormik.values.dinas_name}
                                placeholder='Masukan judul data'
                                onChange={dinasFormik.handleChange}
                                onBlur={dinasFormik.handleBlur}
                                onError={dinasFormik.errors.dinas_name}
                                onTouched={dinasFormik.touched.dinas_name}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-max flex items-center'>
                    <button onClick={loading ? () => null : () => setLoading(true)} className={`w-max hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] ${loading ? 'bg-slate-300 text-slate-500' : 'bg-blue-500 text-white'}`}>
                        {
                          loading ? (
                            <div className='flex items-center'>
                                <FaSpinner className='animate-spin duration-200' />
                                <p className='ml-3'>
                                    Tambah data dinas
                                </p>
                            </div>
                          ):
                            <p>
                                Tambah data dinas
                            </p>
                        }
                    </button>
                    <button onClick={close} className='w-max ml-4 hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] bg-white border border-black text-black'>
                        <p>
                            Batalkan
                        </p>
                    </button>
                </div>
                </form>
            )
        default:
            return (
                <form onSubmit={() => null} className='w-full'>
                    {
                        error !== '' ? (
                            <ErrorMessage error={error} />
                        ):
                            null
                    }
                    <div className='w-full mb-5'>
                        <InputField 
                            large={true}
                            name='email'
                            label='Email'
                            id='email'
                            placeholder='xxx@gmail.com'
                            // value={}
                            // onChange={}
                            // onBlur={}
                            // onError={}
                            // onTouched={}
                        />
                    </div>
                    <div className='w-full mb-5'>
                        <InputField 
                            large={true}
                            name='password'
                            id='password'
                            label='Password'
                            placeholder='xxx12xx'
                            // value={}
                            // onChange={}
                            // onBlur={}
                            // onError={}
                            // onTouched={}
                        />
                    </div>
                    <button type='submit' className='w-full mt-12 text-center bg-slate-700 mr-6 border border-black hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center justify-center px-5 py-3 rounded-full text-[16px] text-white'>
                        <p>
                            Masuk sekarang
                        </p>
                    </button>
                </form>
            )
    }
}

export default FormGroup
