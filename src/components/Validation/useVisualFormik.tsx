import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/services';

export const useVisualFormik = ({onError, onResponse, stopLoading}: {onError?: any, onResponse?: any, stopLoading?: any}) => {
    const formik = useFormik<any>({
        initialValues: {
            title: '',
            uploader: '',
            description: '',
            link: '',
            image: null,
            type_dinas: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .min(6, 'Minimal 6 karakter')
            .required('Tidak boleh kosong!'),
            description: Yup.string()
            .required('Tidak boleh kosong!'),
            link: Yup.string()
            .required('Tidak boleh kosong!'),
            type_dinas: Yup.string()
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {

                console.log(values.type_dinas)

                if(!values.link.includes('https')) {
                    formik.setFieldError('link', 'Wajib berupa link "https"')
                    stopLoading()
                }

                const formData = new FormData()
                formData.append('title', values.title)
                formData.append('uploader', 'Diskominfo Kabupaten Cirebon')
                formData.append('description', values.description)
                formData.append('link', values.link)
                formData.append('type_dinas', values.type_dinas)
                formData.append('image', values.image)
                
                const response = await API.addVisual(formData)
                console.log(response)

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

    return formik
}