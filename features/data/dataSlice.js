import { createSlice } from "@reduxjs/toolkit";
const initialState={
    posts:[],
    comments:[]
}

const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        GETPOSTS:(state,action)=> {
            state.posts=action.payload
        }
    }
})

export default dataSlice.reducer
export const {GETPOSTS}=dataSlice.actions