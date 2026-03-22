import { Stack } from "expo-router";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext"; 
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <AuthProvider>
            <CartProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                    {/* Stack sẽ quản lý tất cả các route con */}
                    <Stack screenOptions={{ headerShown: false }} />
                    <Toast />
                </SafeAreaView>
            </CartProvider>
        </AuthProvider>
    );
}
