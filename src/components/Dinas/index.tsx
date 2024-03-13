"use client"
import { getDinas, getVisual } from '@/redux/informationSlice';
import API from '@/services/services';
import React, { useEffect, useState } from 'react';
import { FaPenAlt, FaPlusCircle, FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import ModelDinas from '../Modal/modalDinas';
import SweetAlert from '../SweetAlert';
import { useUpdateDinasFormik } from '../Validation/useUpdateDinasFormik';

const Dinas: React.FC = () => {

  const dispatch = useDispatch()
  const Auth = useSelector((state: any) => state.Auth?.auth)

  const [loading, setLoading] = useState<boolean>(false)
  const [activeAdd, setActiveAdd] = useState<boolean>(false)
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [dataDinas, setDataDinas] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {

    (async () => {
      const response = await API.getAllDinas()
      setDataDinas(response?.data?.data)
      console.log(response?.data?.data)
    })()
    setStatus(false)

  }, [status])

  const handleRemoveFinally = async (id: string) => {
    const response = await API.removeDinas(id)
    console.log(response)
    console.log(id)
    if(response?.data?.status === 200) {
      setStatus(true)
      SweetAlert({
        title: 'Berhasil hapus dinas!',
        showCancelButton: false
      })
    }
  }

  const handleRemoveTableu = (id: string) => {
    SweetAlert({
      title: 'Yakin hapus dinas ?',
      icon: 'question',
      onClick: () => handleRemoveFinally(id)
    })
  }

  const handleStatus = () => {
    setStatus(true)
  }

  const handleGetData = (data?: any) => {
    dispatch(getDinas(data))
  }

  const handleResponseUpdate = () => {
      setError('')
      setActiveUpdate(false)
      setActiveAdd(false)
      setStatus(true)
      setLoading(false)
      SweetAlert({
          title: 'Berhasil perbarui data!',
          showCancelButton: false,
          icon: 'success'
      })
  }
  
  const handleErrorMessage = (error: string) => {
      setError(error)
  }

  const updateDinas = useUpdateDinasFormik({
    onError: handleErrorMessage,
    onResponse: handleResponseUpdate,
  })

  return (
    <>
      {
        activeUpdate ? (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 flex w-full items-center justify-between py-6 md:px-6 xl:px-7.5">
              <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {
                  error !== '' ? (
                    <ErrorMessage error={error} />
                  ):
                    null
                }
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Perbarui data dinas
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nama dinas
                    </label>
                    <input
                      type="text"
                      name='dinas_name'
                      id='dinas_name'
                      value={updateDinas?.values.dinas_name}
                      onChange={updateDinas?.handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  
                  <div className='w-max mt-6 flex items-center'>
                    <button onClick={loading ? () => null : () => {updateDinas.handleSubmit(), setLoading(true)}} type={`${loading ? 'button' : 'submit'}`} className={`w-max hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] ${loading ? 'bg-slate-300 text-slate-500' : 'bg-blue-500 text-white'}`}>
                        {
                          loading ? (
                            <div className='flex items-center'>
                              <FaSpinner className='animate-spin duration-200' />
                              <p className='ml-3'>
                                  Perbarui data dinas
                              </p>
                            </div>
                          ):
                            <p>
                                Perbarui data dinas
                            </p>
                        }
                    </button>
                    <button onClick={() => setActiveUpdate(false)} className='w-max ml-4 hover:brightness-[90%] active:scale-[0.99] duration-100 h-max flex items-center px-5 py-3 rounded-full text-[14px] bg-white border border-black text-black'>
                        <p>
                            Batalkan
                        </p>
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        ):
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 w-full items-center justify-between py-6 md:px-6 xl:px-7.5">
              <h4 className="text-xl font-semibold mb-6 mb:- text-black dark:text-white">
                Data dinas
              </h4>
              <div className='w-full flex items-center justify-between md:mt-0 mt-5'>
                {
                  activeAdd ? (
                    <ModelDinas handleStatus={() => handleStatus()} close={() => setActiveAdd(false)} />
                  ):
                    null
                }
                <form action="https://formbold.com/s/unique_form_id" method="POST">
                    <div className="relative">
                      <button className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                            fill=""
                          />
                        </svg>
                      </button>

                      <input
                        type="text"
                        name='search'
                        onChange={(e: any) => setSearch(e.target.value)}
                        placeholder="Cari nama dinas sekarang..."
                        className="w-[90%] bg-transparent pl-10 pr-6 font-medium p-2 outline-0 border-[1px] border-slate-300 rounded-full md:w-[120%]"
                      />
                    </div>
                </form>
                {
                  Auth?.role === 'super-admin' ? (
                    <div onClick={() => setActiveAdd(!activeAdd)} className='w-max flex items-center h-max px-4 py-4 md:py-2 text-center cursor-pointer hover:brightness-[90%] active:scale-[0.98] bg-blue-500 text-white rounded-full ml-[-20px] md:ml-3 shdow-md'>
                        <FaPlusCircle /> 
                        <p className='ml-3 md:inline hidden'>
                          Tambah dinas baru
                        </p>
                    </div>
                  ):
                    null
                }
              </div>
            </div>

            <div className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark grid-cols-8 md:px-6 2xl:px-7.5">
              <div className="col-span-2 flex items-center">
                <p className="font-medium">No</p>
              </div>
              <div className="col-span-4 hidden items-center sm:flex">
                <p className="font-medium">Nama dinas</p>
              </div>
              {
                Auth?.role === 'super-admin' ? (
                  <div className="col-span-2 md:col-span-1 flex items-center">
                    <p className="font-medium">Aksi</p>
                  </div>
                ):
                  null
              }
            </div>

            {dataDinas.length > 0 && 
              dataDinas
              .filter((sub: any) => {
                // Jika pencarian tidak kosong, filter data berdasarkan label yang cocok dengan pencarian
                if (search && search !== '') {
                  return sub.dinas_name.toLowerCase().includes(search.toLowerCase());
                }
                // Jika pencarian kosong, tampilkan semua data
                return true;
              })
              .map((data: any, key: number) => (
              <div
                className="grid border-t border-stroke px-4 py-4.5 dark:border-strokedark grid-cols-8 md:px-6 2xl:px-7.5"
                key={key}
              >
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-black dark:text-white">
                      {key + 1}
                    </p>
                  </div>
                </div>
                <div className="col-span-4 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-black dark:text-white">
                      {data?.dinas_name}
                    </p>
                  </div>
                </div>
                {
                  Auth?.role === 'super-admin' ? (
                    <div className="col-span-2 flex items-center">
                      <div className='flex items-center'>
                        <div onClick={() => handleRemoveTableu(data?.dinas_id)} className='w-[34px] h-[34px] rounded-[6px] mr-2 bg-[red] cursor-pointer hover:brightness-[90%] active:scale-[0.98] p-1 text-white flex items-center justify-center'>
                          <FaTrash />
                        </div>
                        <div onClick={() => {handleGetData(data), setActiveUpdate(true)}} className='w-[34px] h-[34px] bg-yellow-500 rounded-[6px] ml-2 cursor-pointer hover:brightness-[90%] active:scale-[0.98] p-1 text-white flex items-center justify-center'>
                          <FaPenAlt />
                        </div>
                      </div>
                    </div>
                  ):
                    null
                }
              </div>
            ))}
          </div>
      }
    </>
  );
};

export default Dinas;
