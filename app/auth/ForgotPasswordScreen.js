import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import userService from "../../services/userService";
import Toast from "react-native-toast-message";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const { forgotPassword } = useAuth();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOTP = async () => {
        setError("");
        if (!email.trim()) {
            setError("Vui lòng nhập email");
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập email",
                duration: 3000,
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Email không hợp lệ");
            Toast.show({
                type: "error",
                text1: "Email không hợp lệ",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            const res = await userService.checkEmail(email);
            if (!res.exists) {
                setError("Email không tồn tại");
                Toast.show({
                    type: "error",
                    text1: "Email không tồn tại",
                    duration: 3000,
                });
                setLoading(false);
                return;
            }

            const success = await forgotPassword(email);
            setLoading(false);

            if (success !== false) {
                setTimer(300);
                Toast.show({
                    type: "success",
                    text1: "OTP đã được gửi đến email của bạn",
                    duration: 3000,
                });
                router.push({
                    pathname: "/auth/ResetPasswordScreen",
                    params: { email },
                });
            } else {
                setError("Lỗi gửi OTP");
            }
        } catch (err) {
            setError("Lỗi server");
            Toast.show({
                type: "error",
                text1: "Lỗi server",
                duration: 3000,
            });
            setLoading(false);
        }
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
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
                        <Text style={styles.brandName}>Khôi Phục Mật Khẩu</Text>
                    </View>

                    {/* Help Message */}
                    <View style={styles.messageSection}>
                        <Text style={styles.messageTitle}>Lấy Lại Quyền Truy Cập</Text>
                        <Text style={styles.messageSubtitle}>
                            Chúng tôi sẽ gửi mã OTP đến email của bạn để xác minh danh tính
                        </Text>
                    </View>

                    {/* Email Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Email Đã Đăng Ký</Text>
                        <View style={[
                            styles.inputWrapper,
                            isFocused && styles.inputWrapperFocused,
                            email && styles.inputWrapperFilled,
                            error && styles.inputWrapperError,
                        ]}>
                            <Feather name="mail" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="email@example.com"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setError("");
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                editable={timer === 0 && !loading}
                            />
                            {email && (
                                <TouchableOpacity onPress={() => setEmail("")}>
                                    <Feather name="x-circle" size={18} color="#D4AF37" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {error && (
                            <View style={styles.errorBox}>
                                <Feather name="alert-circle" size={14} color="#FF3B30" />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                    </View>

                    {/* Security Info */}
                    <View style={styles.securityBox}>
                        <Feather name="shield" size={16} color="#D4AF37" />
                        <Text style={styles.securityText}>
                            Chúng tôi không bao giờ yêu cầu mật khẩu qua email
                        </Text>
                    </View>

                    {/* Timer or Send Button */}
                    {timer > 0 ? (
                        <View style={styles.timerSection}>
                            <View style={styles.timerBox}>
                                <Feather name="clock" size={24} color="#D4AF37" />
                                <Text style={styles.timerNumber}>{formatTime(timer)}</Text>
                                <Text style={styles.timerLabel}>Gửi lại sau</Text>
                            </View>
                            <Text style={styles.timerInfo}>
                                Kiểm tra email của bạn (bao gồm thư mục spam)
                            </Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                loading && styles.sendButtonDisabled,
                                !email.trim() && styles.sendButtonDisabled,
                            ]}
                            onPress={handleSendOTP}
                            disabled={loading || !email.trim()}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <>
                                    <Feather name="send" size={18} color="#fff" />
                                    <Text style={styles.sendButtonText}>Gửi Mã OTP</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}

                    {/* Help Section */}
                    <View style={styles.helpSection}>
                        <Text style={styles.helpTitle}>Cần Trợ Giúp?</Text>
                        <Text style={styles.helpText}>
                            Nếu không nhận được email trong vòng 2 phút, hãy kiểm tra thư mục spam hoặc liên hệ với chúng tôi
                        </Text>
                        <TouchableOpacity style={styles.contactButton}>
                            <Feather name="mail" size={16} color="#D4AF37" />
                            <Text style={styles.contactText}>Liên Hệ Hỗ Trợ</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Back to Login */}
                    <View style={styles.backToLoginSection}>
                        <Text style={styles.backToLoginText}>Bạn nhớ mật khẩu? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.backToLoginLink}>Quay lại đăng nhập</Text>
                        </TouchableOpacity>
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
        marginBottom: 6,
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
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
        paddingHorizontal: 10,
    },
    errorText: {
        fontSize: 12,
        color: "#FF3B30",
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
    timerSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    timerBox: {
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        marginBottom: 12,
    },
    timerNumber: {
        fontSize: 32,
        fontWeight: "700",
        color: "#D4AF37",
        marginVertical: 8,
        fontVariant: ["tabular-nums"],
    },
    timerLabel: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "600",
    },
    timerInfo: {
        fontSize: 12,
        color: "#8B7355",
        textAlign: "center",
        fontStyle: "italic",
    },
    sendButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
        marginBottom: 20,
        elevation: 2,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    helpSection: {
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        marginBottom: 16,
    },
    helpTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 6,
    },
    helpText: {
        fontSize: 12,
        color: "#8B7355",
        lineHeight: 16,
        marginBottom: 12,
    },
    contactButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#FFF9F0",
        gap: 6,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    contactText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#D4AF37",
    },
    backToLoginSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    backToLoginText: {
        fontSize: 13,
        color: "#8B7355",
    },
    backToLoginLink: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
        textDecorationLine: "underline",
    },
});