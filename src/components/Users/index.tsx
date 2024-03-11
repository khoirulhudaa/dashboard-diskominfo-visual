"use client"

import API from '@/services/services';
import React, { useEffect, useState } from 'react';
import { FaPenAlt, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from '../SweetAlert';
import ModelUser from '../Modal/modalUser';
import { getDetailUser } from '@/redux/informationSlice';
import ModelUpdateUser from '../Modal/modelUpdateUser';

const Users: React.FC = () => {

  const dispatch = useDispatch()
  const Auth = useSelector((state: any) => state.Auth?.auth)

  const [activeAdd, setActiveAdd] = useState<boolean>(false)
  const [activeUpdate, setActiveUpdate] = useState<boolean>(false)
  const [status, setStatus] = useState<boolean>(false)
  const [dataUsers, setDataUsers] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {

    (async () => {
      const response = await API.getAllUsers()
      setDataUsers(response?.data?.data)
      console.log(response?.data?.data)
    })()
    setStatus(false)

  }, [status])

  const handleRemoveFinally = async (id: string) => {
    const response = await API.removeUser(id)
    console.log(response)
    console.log(id)
    if(response?.data?.status === 200) {
      setStatus(true)
      SweetAlert({
        title: 'Berhasil hapus anggota!',
        showCancelButton: false
      })
    }
  }

  const handleRemoveUser = (id: string) => {
    SweetAlert({
      title: 'Yakin hapus anggota ?',
      icon: 'question',
      onClick: () => handleRemoveFinally(id)
    })
  }

  const handleStatus = () => {
    setStatus(true)
  }

  const handleUpdateUser = (data?: any) => {
    dispatch(getDetailUser(data))
    setActiveUpdate(true)
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 flex w-full items-center justify-between py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data anggota
        </h4>
        {
          activeAdd ? (
            <ModelUser handleStatus={() => handleStatus()} close={() => setActiveAdd(false)} />
          ): activeUpdate ? (
            <ModelUpdateUser handleStatus={() => handleStatus()} close={() => setActiveUpdate(false)} />
          ):
            null
        }
        <div className='w-max flex items-centr'>
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
                  placeholder="Cari anggota sekarang..."
                  className="w-full bg-transparent pl-10 pr-6 font-medium p-2 outline-0 border-[1px] border-slate-300 rounded-full xl:w-[100%]"
                />
              </div>
          </form>
          {
            Auth?.role === 'super-admin' ? (
              <div onClick={() => setActiveAdd(true)} className='w-max flex items-center h-max px-4 py-2 text-center cursor-pointer hover:brightness-[90%] active:scale-[0.98] bg-blue-500 text-white rounded-full ml-3 shdow-md'>
                  <FaPlusCircle /> 
                  <p className='ml-3'>
                    Tambah anggota baru
                  </p>
              </div>
            ):
              null
           }
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Username</p>
        </div>
        <div className="col-span-3 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Posisi</p>
        </div>
        {
            Auth?.role === 'super-admin' ? (
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Aksi</p>
              </div>
            ):
              null
        }
      </div>

      {dataUsers?.length > 0 && dataUsers
      .filter((sub: any) => {
        if (search && search !== '') {
          return sub.username.toLowerCase().includes(search.toLowerCase());
        }
        return true;
      })
      .map((data: any, key: number) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {data?.username}
              </p>
            </div>
          </div>
          <div className="col-span-3 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {data?.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {data?.role}
            </p>
          </div>
          {
            Auth?.role === 'super-admin' ? (
              <div className="col-span-1 flex items-center">
                <div className='flex items-center'>
                  <div onClick={() => handleRemoveUser(data?.user_id)} className='w-[34px] h-[34px] rounded-[6px] mr-2 bg-[red] cursor-pointer hover:brightness-[90%] active:scale-[0.98] p-1 text-white flex items-center justify-center'>
                    <FaTrash />
                  </div>
                  <div onClick={() => handleUpdateUser(data)} className='w-[34px] h-[34px] bg-yellow-500 rounded-[6px] ml-2 cursor-pointer hover:brightness-[90%] active:scale-[0.98] p-1 text-white flex items-center justify-center'>
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
  );
};

export default Users;
