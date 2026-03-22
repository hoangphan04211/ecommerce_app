import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useAuth } from "../../../contexts/AuthContext";


export default function UpdateAddressScreen() {
    const { user, update } = useAuth();
    const router = useRouter();

    const [address, setAddress] = useState(user?.address || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!address.trim()) {
            Toast.show({ type: "error", text1: "Vui lòng nhập địa chỉ" });
            return;
        }

        setLoading(true);
        try {
            await update({ address }); // chỉ cập nhật địa chỉ
            Toast.show({ type: "success", text1: "Đã cập nhật địa chỉ thành công" });
            router.replace("/(tabs)/cart"); // Quay lại trang giỏ hàng
        } catch (err) {
            Toast.show({ type: "error", text1: "Cập nhật thất bại" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cập nhật địa chỉ</Text>

            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ giao hàng"
                value={address}
                onChangeText={setAddress}
            />

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleSave}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Lưu địa chỉ</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#000000ff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
