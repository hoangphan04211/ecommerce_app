import { Stack, Head } from "expo-router";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <AuthProvider>
            <CartProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                    {/* Head cho web - nằm trong <head> của HTML */}
                    {/* <Head>
                        <title>Ecommerce - HP</title>
                        <meta name="description" content="Ecommerce App" />
                    </Head> */}
                    {/* Stack quản lý navigation */}
                    <Stack screenOptions={{ headerShown: false }} />
                    <Toast />
                </SafeAreaView>
            </CartProvider>
        </AuthProvider>
    );
}