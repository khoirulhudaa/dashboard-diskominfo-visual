import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VisualState {
    visual: any,
    user: any,
    detailUser: any
}

const initialState: VisualState = {
    visual: null,
    user: null,
    detailUser: null
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

export const { getVisual, clearVisual, getUser, getDetailUser, clearUser } = informatSlice.actions;
export default informatSlice.reducer;

