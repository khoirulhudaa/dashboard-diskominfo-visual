import api from './axios';

const API = {

    // Account user
    checkAccount: (body: any) => {
        return api.post('/account/signin', body)
    },
    createAccount: (body: any) => {
        return api.post('/account/signup', body)
    },
    updateAccount: (body: any) => {
        return api.post('/account/update', body)
    },
    getAllUsers: () => {
        return api.get('/account/')
    },
    removeUser: (user_id: string) => {
        return api.post(`/account/delete/${user_id}`)
    },
    
    // Visual
    addVisual: (body: any) => {
        return api.post('/visual', body)
    },
    getAllVisual: () => {
        return api.get('/visual')
    },
    removeVisual: (visual_id: string) => {
        return api.post(`/visual/delete/${visual_id}`)
    },
    updateVisual: (body: any) => {
        return api.post('/visual/update', body)
    },
}

export default API;