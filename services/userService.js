// services/userService.js
import httpAxios from "./httpAxios";
import { Platform } from "react-native";

const userService = {

    /* ======================
     |  AUTH
     ====================== */
    login: async (username, password) => {
        const response = await httpAxios.post("user-login", {
            username,
            password,
        });
        return response.data; // { token, user }
    },

    register: async (userData) => {
        const isFormData = userData instanceof FormData;
        const response = await httpAxios.post("user-register", userData, {
            headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
        });
        return response.data;
    },


    logout: async () => {
        const response = await httpAxios.post("user-logout");
        return response.data;
    },

    /* ======================
     |  USER
     ====================== */
    me: async () => {
        const response = await httpAxios.get("user-me");
        return response.data;
    },

    update: async (data) => {
        const response = await httpAxios.post("user-update", data);
        return response.data;
    },

    changePassword: async (old_password, new_password, new_password_confirmation) => {
        const response = await httpAxios.post("user-change-password", {
            old_password,
            new_password,
            new_password_confirmation,
        });
        return response.data;
    },

    changeAvatar: async (avatarFile) => {
        const formData = new FormData();

        // Nếu là web (File object)
        if (Platform.OS === "web") {
            formData.append("avatar", avatarFile);
        } else {
            // Nếu là mobile (React Native / Expo)
            formData.append("avatar", {
                uri: avatarFile.uri,
                type: avatarFile.type,
                name: avatarFile.name,
            });
        }

        const response = await httpAxios.post("user-change-avatar", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    },


    /* ======================
     |  CHECK
     ====================== */
    checkEmail: async (email) => {
        const response = await httpAxios.post("user-check-email", { email });
        return response.data;
    },

    checkPhone: async (phone) => {
        const response = await httpAxios.post("user-check-phone", { phone });
        return response.data;
    },

    /* ====================== | FORGOT / RESET PASSWORD ====================== */
    forgotPassword: async (email) => {
        const response = await httpAxios.post("user-forgot-password", { email });
        return response.data;
    },
    resetPassword: async (email, otp, new_password, new_password_confirmation) => {
        const response = await httpAxios.post("user-reset-password", { email, otp, new_password, new_password_confirmation, });
        return response.data;
    },
};

export default userService;
