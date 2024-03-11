import React from 'react'
import FormGroup from '../FormGroup'

const ModelUpdateUser: React.FC<any> = ({
    handleAlert,
    close,
    titleID,
    handleDone,
    dataSubdistrict,
    handleStatus
}) => {

  return (
    <div className='w-screen min-h-screen p-6 box-border fixed left-0 top-0 flex justify-center overflow-y-auto items-center z-[99999999999] bg-slate-700 bg-opacity-[0.7]'>
        <FormGroup handleStatus={handleStatus} dataSubdistrict={dataSubdistrict} handleDone={handleDone} titleID={titleID} type='update-account' handleAlert={handleAlert} close={close} />
    </div>
  )
}

export default ModelUpdateUser
