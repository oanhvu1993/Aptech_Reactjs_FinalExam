import axios from "axios";
import { createContext } from "react";

const params = {
    headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY
    }
}

export const fetchData = async (url) => {
    try {
        const { data } = await axios.get(import.meta.env.VITE_API_URL + url, params)
        return data;
    }
    catch (e) {
        console.log(e)
        return e
    }
}
export const putData = async (url, data) => {
    try {
        await axios.put(import.meta.env.VITE_API_URL + url, data, params);
    }
    catch (e) {
        console.log(e)
        return e
    }
}
export const postData = async (url, data) => {
    try {
        await axios.post(import.meta.env.VITE_API_URL + url, data, params);
    }
    catch (e) {
        console.log(e)
        return e
    }
}
export const DataContext = createContext();

export const VND = new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'VND'
});

export const convertVie = (str) => {
    const newStr = str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");

    return newStr
}