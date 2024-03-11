import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/services';
import { useEffect } from 'react';
import store from '@/redux/store';

export const useUpdateAuthFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {
   
   const detailUser = store.getState().Information?.detailUser

    const formik = useFormik<any>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
            .min(4, 'Minimal 4 karakter')
            .required('Tidak boleh kosong!'),
            email: Yup.string()
            .email('Format email tidak sesuai!')
            .required('Tidak boleh kosong!'),
            password: Yup.string()
            .min(5, 'Minimal 5 karakter!')
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                console.log('data:', values)

                const body = {
                    user_id: detailUser?.user_id,
                    username: values.username,
                    email: values.email,
                    ...(values.password !== '' && values.password ? { password: values.password } : {})
                }

                console.log(body)
                
                const response = await API.updateAccount(body)
                console.log('response update user:', response)

                if(response.data.status === 200) {  
                    onResponse(response.data.status)
                    resetForm()
                }else {
                    onError(response.data.message)
                }
            } catch (error: any) {
                onError(error.message)
            }
        }
    })

    useEffect(() => {
        formik.setValues({
            username: detailUser?.username ?? '',
            email: detailUser?.email ?? '',
        })
    }, [detailUser])

    return formik
}