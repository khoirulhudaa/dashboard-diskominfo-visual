import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/services';
import { useEffect } from 'react';
import store from '@/redux/store';

export const useUpdateVisualFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {
    
    const visual = store.getState().Information?.visual
    
    const formik = useFormik<any>({
        initialValues: {
            title: '',
            uploader: '',
            description: '',
            link: '',
            image: null,
            old_image: null
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .min(6, 'Minimal 6 karakter')
            .required('Tidak boleh kosong!'),
            uploader: Yup.string()
            .min(6, 'Minimal 3 karakter')
            .required('Tidak boleh kosong!'),
            description: Yup.string()
            .required('Tidak boleh kosong!'),
            link: Yup.string()
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {

                const formData = new FormData()
                formData.append('visual_id', visual?.visual_id)
                formData.append('title', values.title)
                formData.append('uploader', values.uploader)
                formData.append('description', values.description)
                formData.append('link', values.link)
                if(values.image && values.image !== null) {
                    formData.append('image', values.image)
                }
                
                const response = await API.updateVisual(formData)
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
            title: visual?.title ?? '',
            uploader: visual?.uploader ?? '',
            description: visual?.description ?? '',
            link: visual?.link ?? '',
            old_image: visual?.image ?? '',
        })
    }, [visual])

    return formik
}