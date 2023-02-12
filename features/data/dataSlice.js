import { createSlice } from "@reduxjs/toolkit";
const initialState={
    posts:[],
    notes:[]
    
}

const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        GETPOSTS:(state,action)=> {
            state.posts=action.payload
        },

        GETNOTES:(state,action)=>{
state.notes=action.payload
        }
    }
})

export default dataSlice.reducer
export const {GETPOSTS,GETNOTES}=dataSlice.actions