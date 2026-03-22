import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function NewPasswordScreen() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const router = useRouter();
    const { changePassword, user } = useAuth();

    const passwordMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const passwordStrong = newPassword.length >= 6 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword);

    const handleChangePassword = async () => {
        // Validation
        if (!newPassword.trim()) {
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập mật khẩu mới",
                duration: 3000,
            });
            return;
        }

        if (newPassword.length < 6) {
            Toast.show({
                type: "error",
                text1: "Mật khẩu phải có ít nhất 6 ký tự",
                duration: 3000,
            });
            return;
        }

        if (!confirmPassword.trim()) {
            Toast.show({
                type: "error",
                text1: "Vui lòng xác nhận mật khẩu",
                duration: 3000,
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Mật khẩu không trùng khớp",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            const success = await changePassword(user?.id, null, newPassword, confirmPassword);
            if (success) {
                Toast.show({
                    type: "success",
                    text1: "Thay đổi mật khẩu thành công",
                    duration: 3000,
                });
                router.replace("/(tabs)/profile");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi thay đổi mật khẩu",
                    duration: 3000,
                });
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi server",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={20} color="#1A1410" />
                        </TouchableOpacity>
                    </View>

                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoBox}>
                            <Feather name="lock" size={40} color="#D4AF37" />
                        </View>
                        <Text style={styles.brandName}>Đổi Mật Khẩu</Text>
                    </View>

                    {/* Message Section */}
                    <View style={styles.messageSection}>
                        <Text style={styles.messageTitle}>Tạo Mật Khẩu Mới</Text>
                        <Text style={styles.messageSubtitle}>
                            Sử dụng mật khẩu mạnh để bảo vệ tài khoản của bạn
                        </Text>
                    </View>

                    {/* New Password Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Mật Khẩu Mới</Text>
                        <View style={[
                            styles.inputWrapper,
                            focusedInput === "newPassword" && styles.inputWrapperFocused,
                            newPassword && styles.inputWrapperFilled,
                        ]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu mới"
                                placeholderTextColor="#999"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showNewPass}
                                onFocus={() => setFocusedInput("newPassword")}
                                onBlur={() => setFocusedInput(null)}
                                editable={!loading}
                            />
                            {newPassword && (
                                <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                                    <Feather
                                        name={showNewPass ? "eye" : "eye-off"}
                                        size={18}
                                        color="#D4AF37"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Xác Nhận Mật Khẩu</Text>
                        <View style={[
                            styles.inputWrapper,
                            focusedInput === "confirmPassword" && styles.inputWrapperFocused,
                            confirmPassword && styles.inputWrapperFilled,
                            passwordMatch && styles.inputWrapperSuccess,
                            confirmPassword && !passwordMatch && styles.inputWrapperError,
                        ]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Xác nhận mật khẩu mới"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPass}
                                onFocus={() => setFocusedInput("confirmPassword")}
                                onBlur={() => setFocusedInput(null)}
                                editable={!loading}
                            />
                            {confirmPassword && (
                                <Feather
                                    name={passwordMatch ? "check-circle" : "x-circle"}
                                    size={18}
                                    color={passwordMatch ? "#34C759" : "#FF3B30"}
                                />
                            )}
                            {!confirmPassword && newPassword && (
                                <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                                    <Feather
                                        name={showConfirmPass ? "eye" : "eye-off"}
                                        size={18}
                                        color="#D4AF37"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Password Strength Indicator */}
                    <View style={styles.strengthSection}>
                        <View style={styles.strengthLabel}>
                            <Text style={styles.strengthTitle}>Độ Mạnh Của Mật Khẩu</Text>
                            <Text style={[
                                styles.strengthText,
                                newPassword.length >= 6 && { color: "#34C759" },
                                newPassword.length < 6 && { color: "#FF3B30" },
                            ]}>
                                {newPassword.length === 0 ? "Chưa nhập" :
                                    newPassword.length < 6 ? "Yếu" :
                                        passwordStrong ? "Mạnh" : "Trung bình"}
                            </Text>
                        </View>
                        <View style={styles.strengthBar}>
                            <View style={[
                                styles.strengthFill,
                                {
                                    width: newPassword.length === 0 ? "0%" :
                                        newPassword.length < 6 ? "33%" :
                                            passwordStrong ? "100%" : "66%",
                                    backgroundColor: newPassword.length === 0 ? "#ccc" :
                                        newPassword.length < 6 ? "#FF3B30" :
                                            passwordStrong ? "#34C759" : "#FF9500",
                                }
                            ]} />
                        </View>
                    </View>

                    {/* Requirements */}
                    <View style={styles.requirementsBox}>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={newPassword.length >= 6 ? "check-circle" : "circle"}
                                size={14}
                                color={newPassword.length >= 6 ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                newPassword.length >= 6 && styles.requirementTextMet,
                            ]}>
                                Ít nhất 6 ký tự
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={/[A-Z]/.test(newPassword) ? "check-circle" : "circle"}
                                size={14}
                                color={/[A-Z]/.test(newPassword) ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                /[A-Z]/.test(newPassword) && styles.requirementTextMet,
                            ]}>
                                Chứa chữ cái viết hoa
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={passwordMatch ? "check-circle" : "circle"}
                                size={14}
                                color={passwordMatch ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                passwordMatch && styles.requirementTextMet,
                            ]}>
                                Mật khẩu trùng khớp
                            </Text>
                        </View>
                    </View>

                    {/* Security Info */}
                    <View style={styles.securityBox}>
                        <Feather name="shield" size={16} color="#D4AF37" />
                        <Text style={styles.securityText}>
                            Mật khẩu được bảo vệ bằng mã hóa SSL
                        </Text>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            loading && styles.saveButtonDisabled,
                            !(passwordMatch && passwordStrong) && styles.saveButtonDisabled,
                        ]}
                        onPress={handleChangePassword}
                        disabled={loading || !(passwordMatch && passwordStrong)}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Feather name="check" size={18} color="#fff" />
                                <Text style={styles.saveButtonText}>Lưu Mật Khẩu Mới</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Help Section */}
                    <View style={styles.helpBox}>
                        <Feather name="info" size={14} color="#D4AF37" />
                        <Text style={styles.helpText}>
                            Hãy sử dụng mật khẩu mạnh và không chia sẻ với ai khác
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 30,
        justifyContent: "center",
        minHeight: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    backButton: {
        padding: 8,
    },
    logoSection: {
        alignItems: "center",
        marginBottom: 28,
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    brandName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 1,
    },
    messageSection: {
        alignItems: "center",
        marginBottom: 28,
    },
    messageTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 8,
    },
    messageSubtitle: {
        fontSize: 13,
        color: "#8B7355",
        textAlign: "center",
        lineHeight: 18,
    },
    inputSection: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        backgroundColor: "#fff",
        gap: 10,
    },
    inputWrapperFocused: {
        borderColor: "#D4AF37",
        backgroundColor: "#FFF9F0",
    },
    inputWrapperFilled: {
        borderColor: "#D4AF37",
    },
    inputWrapperSuccess: {
        borderColor: "#34C759",
    },
    inputWrapperError: {
        borderColor: "#FF3B30",
        backgroundColor: "#FFF3F1",
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 14,
        color: "#333",
    },
    strengthSection: {
        marginBottom: 16,
    },
    strengthLabel: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    strengthTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#1A1410",
    },
    strengthText: {
        fontSize: 12,
        fontWeight: "700",
    },
    strengthBar: {
        height: 6,
        backgroundColor: "#E8D4B8",
        borderRadius: 3,
        overflow: "hidden",
    },
    strengthFill: {
        height: "100%",
        borderRadius: 3,
    },
    requirementsBox: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
    },
    requirementItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },
    requirementText: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "500",
    },
    requirementTextMet: {
        color: "#34C759",
        fontWeight: "600",
    },
    securityBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        gap: 8,
        marginBottom: 20,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
    },
    securityText: {
        fontSize: 12,
        color: "#8B7355",
        flex: 1,
        fontWeight: "500",
    },
    saveButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
        marginBottom: 16,
        elevation: 2,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    helpBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
    },
    helpText: {
        fontSize: 12,
        color: "#8B7355",
        flex: 1,
        fontWeight: "500",
    },
});