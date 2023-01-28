import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{user: null,
userInfo:  null }


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        LOGIN :(state,action)=> {
            state.user=action.payload
        },
        LOGOUT : (state)=> {
            state.user=null
        },
        SETUSER:(state,action)=> {
            state.userInfo=action.payload
        },
        RESETUSER:(state)=>{
            state.userInfo=null
        }

    }
})

export default userSlice.reducer;
export const {LOGIN ,LOGOUT,SETUSER,RESETUSER} =userSlice.actions