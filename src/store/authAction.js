import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const baseUrl = 'localhost:5000'

export const registerUser = createAsyncThunk(
    'user/',
    async ({email,firstName,lastName,phone,password}, { rejectWithValue })=>{
        try{
            const config={
                headers: {
                    'Content-Type': 'application/json',
            },
        }
        await axios.post(
            `${baseUrl}/user`,
            { firstName, lastName, email, phone, password },
            config
        )
    }catch(error){
        if(error.response && error.response.data.message) {
           return rejectWithValue(error.response.data.message) 
        }else {
        return rejectWithValue(error.message)
      }
    }
    }
)