import { useFormik } from 'formik';
import * as Yup from 'yup';
import API from '../../services/services';

export const useDinasFormik = ({onError, onResponse}: {onError?: any, onResponse?: any}) => {
    const formik = useFormik<any>({
        initialValues: {
            dinas__name: '',
        },
        validationSchema: Yup.object({
            dinas_name: Yup.string()
            .required('Tidak boleh kosong!'),
        }),
        onSubmit: async (values: any, {resetForm}) => {
            try {
                
                const response = await API.addDinas(values)
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