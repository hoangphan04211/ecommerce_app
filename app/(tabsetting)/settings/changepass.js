import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";


export default function ChangePasswordScreen() {
    const { changePassword } = useAuth();
    const router = useRouter();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        setLoading(true);
        await changePassword(oldPass, newPass, confirmPass);
        setLoading(false);
    };

    // Điều kiện để nút được bật
    const isFormValid = oldPass.trim() && newPass.trim() && confirmPass.trim();

    return (
        <View style={styles.container}>
            {/* Nút back góc trên trái */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Feather name="arrow-left" size={22} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Đổi mật khẩu</Text>

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu cũ"
                secureTextEntry
                value={oldPass}
                onChangeText={setOldPass}
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
            />

            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu mới"
                secureTextEntry
                value={confirmPass}
                onChangeText={setConfirmPass}
            />

            <TouchableOpacity
                style={[styles.button, (!isFormValid || loading) && { opacity: 0.5 }]}
                onPress={handleChangePassword}
                disabled={!isFormValid || loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Đổi mật khẩu</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    backButton: { position: "absolute", top: 40, left: 20 },
    backIcon: { fontSize: 18, color: "#000", }, // icon dạng "<"
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
    button: { backgroundColor: "#000", padding: 15, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
