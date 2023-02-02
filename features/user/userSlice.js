import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{user: null,
userInfo: null}


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        LOGIN :(state,action)=> {
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        LOGOUT : (state)=> {
            state.user=null
            localStorage.setItem('user',JSON.stringify(null))
        },
        SETUSER:(state,action)=> {
            state.userInfo=action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        RESETUSER:(state)=>{
            state.userInfo=null
            localStorage.setItem('userInfo',JSON.stringify(null))
        }

    }
})

export default userSlice.reducer;
export const {LOGIN ,LOGOUT,SETUSER,RESETUSER} =userSlice.actions