import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import userService from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* =========================
     |  LOAD AUTH
     ========================= */
    useEffect(() => {
        const loadAuth = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("user");
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (err) {
                console.log("Load auth error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadAuth();
    }, []);

    /* =========================
     |  SAVE AUTH
     ========================= */
    useEffect(() => {
        const saveAuth = async () => {
            try {
                if (user) {
                    await AsyncStorage.setItem("user", JSON.stringify(user));
                } else {
                    await AsyncStorage.removeItem("user");
                }
            } catch (err) {
                console.log("Save auth error:", err);
            }
        };
        saveAuth();
    }, [user]);

    /* =========================
     |  LOGIN
     ========================= */
    const login = async (username, password) => {
        try {
            const res = await userService.login(username, password);
            setUser(res.user);

            // lưu token để dùng cho các request cần auth
            await AsyncStorage.setItem("token", res.token);

            Toast.show({
                type: "success",
                text1: "Đăng nhập thành công",
            });
            return true;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Đăng nhập thất bại",
                text2: err.response?.data?.message || "Lỗi server",
            });
            return false;
        }
    };

    /* =========================
     |  REGISTER
     ========================= */
    const register = async (userData) => {
        try {
            const res = await userService.register(userData);
            setUser(res.user);

            if (res.token) {
                await AsyncStorage.setItem("token", res.token);
            }

            Toast.show({
                type: "success",
                text1: "Đăng ký thành công",
            });
            return true;
        } catch (err) {
            console.log("Register error:", err.response?.data);

            let errorMessage = "Lỗi server";
            if (err.response?.status === 422 && err.response?.data) {
                errorMessage = Object.values(err.response.data).flat().join("\n");
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }

            Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: errorMessage,
            });
            return false;
        }
    };

    /* =========================
     |  LOGOUT
     ========================= */
    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        Toast.show({
            type: "info",
            text1: "Đã đăng xuất",
        });
    };

    /* =========================
     |  FORGOT PASSWORD
     ========================= */
    const forgotPassword = async (email) => {
        try {
            const res = await userService.forgotPassword(email);
            Toast.show({
                type: "info",
                text1: res.message,
            });
        } catch {
            Toast.show({
                type: "error",
                text1: "Không gửi được email",
            });
        }
    };

    /* =========================
     |  CHANGE PASSWORD
     ========================= */
    const changePassword = async (oldPass, newPass, confirmPass) => {
        try {
            const res = await userService.changePassword(
                oldPass,
                newPass,
                confirmPass
            );
            Toast.show({
                type: "success",
                text1: res.message,
            });
            return true;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: err.response?.data?.message || "Đổi mật khẩu thất bại",
            });
            return false;
        }
    };

    /* =========================
     |  CHANGE AVATAR
     ========================= */
    const changeAvatar = async (avatarFile) => {
        try {
            const res = await userService.changeAvatar(avatarFile);
            setUser((prev) => ({
                ...prev,
                avatar: res.avatar,
            }));
            Toast.show({
                type: "success",
                text1: "Đổi ảnh đại diện thành công",
            });
        } catch {
            Toast.show({
                type: "error",
                text1: "Đổi ảnh thất bại",
            });
        }
    };

    /* =========================
 |  UPDATE PROFILE
 ========================= */
    const update = async (data) => {
        try {
            const res = await userService.update(data);
            setUser(res.user); // cập nhật lại state user với dữ liệu mới từ server
            Toast.show({
                type: "success",
                text1: res.message || "Cập nhật thành công",
            });
            return true;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Cập nhật thất bại",
                text2: err.response?.data?.message || "Lỗi server",
            });
            return false;
        }
    };

    const resetPassword = async (email, otp, newPass, confirmPass) => {
        try {
            const res = await userService.resetPassword(email, otp, newPass, confirmPass);
            Toast.show({
                type: "success",
                text1: res.message,
            });
            return true;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: err.response?.data?.message || "Đặt lại mật khẩu thất bại",
            });
            return false;
        }
    };





    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                forgotPassword,
                resetPassword,
                changePassword,
                changeAvatar,
                update,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
