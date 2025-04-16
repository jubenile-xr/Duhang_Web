import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GAS_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})