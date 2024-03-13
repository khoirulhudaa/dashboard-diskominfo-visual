import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisualState {
    visual: any,
    user: any,
    detailUser: any,
    dinas: any,
}

const initialState: VisualState = {
    visual: null,
    user: null,
    detailUser: null,
    dinas: null,
}

const informatSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getVisual: (state, action: PayloadAction<any>) => {
            state.visual = {
                ...state.visual,
                ...action.payload
            }   
        },
        clearVisual: (state) => {
            state.visual = null
        },
        getDinas: (state, action: PayloadAction<any>) => {
            state.dinas = {
                ...state.dinas,
                ...action.payload
            }   
        },
        clearDinas: (state) => {
            state.dinas = null
        },
        getUser: (state, action: PayloadAction<any>) => {
            state.user = {
                ...state.user,
                ...action.payload
            }   
        },
        getDetailUser: (state, action: PayloadAction<any>) => {
            state.detailUser = {
                ...state.detailUser,
                ...action.payload
            }   
        },
        clearUser: (state) => {
            state.user = null,
            state.detailUser = null
        }
    }
})

export const { getVisual, clearVisual, getDinas, clearDinas, getUser, getDetailUser, clearUser } = informatSlice.actions;
export default informatSlice.reducer;

