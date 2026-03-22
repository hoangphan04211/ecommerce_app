import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import orderService from "../services/orderService";
import userService from "../services/userService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    // Load giỏ hàng từ AsyncStorage khi app khởi động
    useEffect(() => {
        const loadCart = async () => {
            try {
                const data = await AsyncStorage.getItem("cart");
                if (data) {
                    setCartItems(JSON.parse(data));
                }
            } catch (error) {
                console.error("Lỗi load giỏ hàng:", error);
            }
        };
        loadCart();
    }, []);

    // Lưu giỏ hàng vào AsyncStorage mỗi khi thay đổi
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
            } catch (error) {
                console.error("Lỗi lưu giỏ hàng:", error);
            }
        };
        saveCart();
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            let updated;
            if (existing) {
                updated = prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updated = [...prev, { ...product, quantity }];
            }
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đã thêm sản phẩm vào giỏ hàng ",
                position: "top",
            });
            return updated;
        });
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (id) => {
        setCartItems((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            Toast.show({
                type: "info",
                text1: "Thông báo",
                text2: "Đã xóa sản phẩm khỏi giỏ hàng",
                position: "top",
            });
            return updated;
        });
    };

    // Cập nhật số lượng
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
        Toast.show({
            type: "info",
            text1: "Thông báo",
            text2: "Đã cập nhật số lượng sản phẩm",
            position: "top",
        });
    };

    // Xóa toàn bộ giỏ
    const clearCart = () => {
        setCartItems([]);
        Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Đặt hàng thành công",
            position: "top",
        });
    };

    // ✅ Tính tổng tiền giỏ hàng
    const getTotalPrice = () => {
        return cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    // ✅ Checkout (có kiểm tra user)
    const checkout = async (userInfo) => {
        try {
            // Kiểm tra user đã đăng nhập chưa
            const user = await userService.me().catch(() => null);
            if (!user) {
                Toast.show({
                    type: "error",
                    text1: "Bạn cần đăng nhập",
                    text2: "Vui lòng đăng nhập để thanh toán",
                    position: "top",
                });
                router.replace("/auth/StartScreen"); // chuyển sang màn StartScreen
                return null;
            }

            const orderData = {
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                address: userInfo.address,
                payment: userInfo.payment,
                items: cartItems.map((item) => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            };

            const res = await orderService.createOrder(orderData);

            Toast.show({
                type: "success",
                text1: "Thanh toán thành công",
                text2: `Mã đơn hàng: ${res.order.id}`,
                position: "top",
            });

            clearCart();
            return res;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Thanh toán thất bại",
                text2: err.response?.data?.message || "Lỗi server",
                position: "top",
            });
            return null;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalPrice,
                checkout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
