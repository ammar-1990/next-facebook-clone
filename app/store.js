import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/features/user/userSlice";
import dataSlice from "@/features/data/dataSlice";


const store =configureStore({
    reducer:{
user:userSlice,
data:dataSlice
    },

    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store