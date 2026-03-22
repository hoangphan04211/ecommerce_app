import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function ResetPasswordScreen() {
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [loadingReset, setLoadingReset] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const [timer, setTimer] = useState(300);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const { resetPassword, forgotPassword } = useAuth();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleReset = async () => {
        setError("");

        if (!otp.trim()) {
            setError("Vui lòng nhập mã OTP");
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập mã OTP",
                duration: 3000,
            });
            return;
        }

        if (!newPass.trim()) {
            setError("Vui lòng nhập mật khẩu mới");
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập mật khẩu mới",
                duration: 3000,
            });
            return;
        }

        if (newPass.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            Toast.show({
                type: "error",
                text1: "Mật khẩu phải có ít nhất 6 ký tự",
                duration: 3000,
            });
            return;
        }

        if (!confirmPass.trim()) {
            setError("Vui lòng xác nhận mật khẩu");
            Toast.show({
                type: "error",
                text1: "Vui lòng xác nhận mật khẩu",
                duration: 3000,
            });
            return;
        }

        if (newPass !== confirmPass) {
            setError("Mật khẩu mới và xác nhận mật khẩu không trùng khớp");
            Toast.show({
                type: "error",
                text1: "Mật khẩu không trùng khớp",
                duration: 3000,
            });
            return;
        }

        setLoadingReset(true);
        try {
            const success = await resetPassword(email, otp, newPass, confirmPass);
            setLoadingReset(false);
            if (success) {
                Toast.show({
                    type: "success",
                    text1: "Đặt lại mật khẩu thành công",
                    duration: 3000,
                });
                router.replace("/auth/LoginScreen");
            } else {
                setError("Lỗi đặt lại mật khẩu");
            }
        } catch (err) {
            setError("Lỗi server");
            setLoadingReset(false);
        }
    };

    const handleResend = async () => {
        setLoadingResend(true);
        try {
            await forgotPassword(email);
            setTimer(300);
            Toast.show({
                type: "success",
                text1: "Mã OTP mới đã được gửi",
                duration: 3000,
            });
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Lỗi gửi lại mã",
                duration: 3000,
            });
        } finally {
            setLoadingResend(false);
        }
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const passwordMatch = newPass && confirmPass && newPass === confirmPass;
    const passwordEmpty = !newPass || !confirmPass;

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
                            <Feather name="refresh-cw" size={40} color="#D4AF37" />
                        </View>
                        <Text style={styles.brandName}>Đặt Lại Mật Khẩu</Text>
                    </View>

                    {/* Info Message */}
                    <View style={styles.messageSection}>
                        <Text style={styles.messageTitle}>Nhập Mã OTP Và Mật Khẩu Mới</Text>
                        <Text style={styles.messageSubtitle}>
                            Mã OTP có hiệu lực trong {formatTime(timer)}. Không dùng lại mã cũ.
                        </Text>
                    </View>

                    {/* OTP Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Mã OTP</Text>
                        <View style={[
                            styles.inputWrapper,
                            focusedInput === "otp" && styles.inputWrapperFocused,
                            otp && styles.inputWrapperFilled,
                        ]}>
                            <Feather name="hash" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mã OTP từ email"
                                placeholderTextColor="#999"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                                onFocus={() => setFocusedInput("otp")}
                                onBlur={() => setFocusedInput(null)}
                                editable={!loadingReset}
                                maxLength={6}
                            />
                        </View>
                    </View>

                    {/* New Password Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Mật Khẩu Mới</Text>
                        <View style={[
                            styles.inputWrapper,
                            focusedInput === "newPass" && styles.inputWrapperFocused,
                            newPass && styles.inputWrapperFilled,
                        ]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                                placeholderTextColor="#999"
                                value={newPass}
                                onChangeText={setNewPass}
                                secureTextEntry={!showNewPass}
                                onFocus={() => setFocusedInput("newPass")}
                                onBlur={() => setFocusedInput(null)}
                                editable={!loadingReset}
                            />
                            {newPass && (
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
                            focusedInput === "confirmPass" && styles.inputWrapperFocused,
                            confirmPass && styles.inputWrapperFilled,
                            passwordMatch && styles.inputWrapperSuccess,
                            !passwordEmpty && !passwordMatch && styles.inputWrapperError,
                        ]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Xác nhận mật khẩu mới"
                                placeholderTextColor="#999"
                                value={confirmPass}
                                onChangeText={setConfirmPass}
                                secureTextEntry={!showConfirmPass}
                                onFocus={() => setFocusedInput("confirmPass")}
                                onBlur={() => setFocusedInput(null)}
                                editable={!loadingReset}
                            />
                            {confirmPass && (
                                <Feather
                                    name={passwordMatch ? "check-circle" : "x-circle"}
                                    size={18}
                                    color={passwordMatch ? "#34C759" : "#FF3B30"}
                                />
                            )}
                            {!confirmPass && showConfirmPass && (
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

                    {/* Password Requirements */}
                    <View style={styles.requirementsBox}>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={newPass.length >= 6 ? "check-circle" : "circle"}
                                size={14}
                                color={newPass.length >= 6 ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                newPass.length >= 6 && styles.requirementTextMet,
                            ]}>
                                Ít nhất 6 ký tự
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

                    {/* Error Message */}
                    {error && (
                        <View style={styles.errorBox}>
                            <Feather name="alert-circle" size={16} color="#FF3B30" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Reset Button */}
                    <TouchableOpacity
                        style={[
                            styles.resetButton,
                            loadingReset && styles.resetButtonDisabled,
                            !(otp.trim() && newPass.trim() && confirmPass.trim() && passwordMatch) && styles.resetButtonDisabled,
                        ]}
                        onPress={handleReset}
                        disabled={loadingReset || !(otp.trim() && newPass.trim() && confirmPass.trim() && passwordMatch)}
                    >
                        {loadingReset ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Feather name="check" size={18} color="#fff" />
                                <Text style={styles.resetButtonText}>Đặt Lại Mật Khẩu</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Resend Section */}
                    {timer > 0 ? (
                        <View style={styles.timerSection}>
                            <Text style={styles.timerLabel}>Gửi lại mã sau</Text>
                            <Text style={styles.timerValue}>{formatTime(timer)}</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.resendButton,
                                loadingResend && styles.resendButtonDisabled,
                            ]}
                            onPress={handleResend}
                            disabled={loadingResend}
                        >
                            {loadingResend ? (
                                <ActivityIndicator color="#D4AF37" size="small" />
                            ) : (
                                <>
                                    <Feather name="send" size={16} color="#D4AF37" />
                                    <Text style={styles.resendButtonText}>Gửi Lại Mã OTP</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}

                    {/* Help Info */}
                    <View style={styles.helpBox}>
                        <Feather name="info" size={14} color="#D4AF37" />
                        <Text style={styles.helpText}>
                            Nếu không nhận được mã, hãy kiểm tra thư mục spam hoặc liên hệ hỗ trợ
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
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FFF3F1",
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 3,
        borderLeftColor: "#FF3B30",
    },
    errorText: {
        fontSize: 12,
        color: "#FF3B30",
        fontWeight: "600",
        flex: 1,
    },
    resetButton: {
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
    resetButtonDisabled: {
        opacity: 0.5,
    },
    resetButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    timerSection: {
        alignItems: "center",
        paddingVertical: 16,
        marginBottom: 16,
    },
    timerLabel: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "600",
        marginBottom: 6,
    },
    timerValue: {
        fontSize: 28,
        fontWeight: "700",
        color: "#D4AF37",
        fontVariant: ["tabular-nums"],
    },
    resendButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#D4AF37",
        backgroundColor: "#fff",
        gap: 8,
        marginBottom: 16,
    },
    resendButtonDisabled: {
        opacity: 0.5,
    },
    resendButtonText: {
        color: "#D4AF37",
        fontSize: 14,
        fontWeight: "700",
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