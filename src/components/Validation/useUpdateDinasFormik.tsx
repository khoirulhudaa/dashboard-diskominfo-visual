import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/services';
import { useEffect } from 'react';
import store from '@/redux/store';

export const useUpdateDinasFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {
    
    const dinas = store.getState().Information?.dinas
    
    const formik = useFormik<any>({
        initialValues: {
            dinas_name: '',
        },
        validationSchema: Yup.object({
            dinas_name: Yup.string()
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                
                const body = {
                    dinas_id: dinas?.dinas_id,
                    dinas_name: values.dinas_name
                }

                const response = await API.updateDinas(body)
                console.log('response update visual:', response)

                if(response.data.status === 200) {  
                    onResponse(response.data.status)
                    resetForm()
                }else {
                    onError(response.data.message)
                    resetForm()
                }
            } catch (error: any) {
                onError(error.message)
                resetForm()
            }
        }
    })

    useEffect(() => {
        formik.setValues({
            dinas_name: dinas?.dinas_name ?? '',
        })
    }, [dinas])

    return formik
}