// services/httpAxios.js
import axios from "axios";
import { API_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpAxios = axios.create({
    baseURL: API_URL,
    // timeout: 15000,
});

/* =========================
 |  REQUEST INTERCEPTOR
 ========================= */
httpAxios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token"); // lấy token từ AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* =========================
 |  RESPONSE INTERCEPTOR
 ========================= */
httpAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem("token"); // xoá token khi hết hạn
            // optional: điều hướng về màn hình login
            // navigation.navigate("Login");
        }
        return Promise.reject(error);
    }
);

export default httpAxios;
