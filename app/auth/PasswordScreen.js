import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function PasswordScreen() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const { username } = useLocalSearchParams();

    const handleLogin = async () => {
        if (!password.trim()) {
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập mật khẩu",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            const success = await login(username, password);
            if (success) {
                router.replace("/(tabs)/profile");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Mật khẩu không chính xác",
                    duration: 3000,
                });
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi đăng nhập",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === "Enter") {
            handleLogin();
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
                            <Text style={styles.logoIcon}>⌚</Text>
                        </View>
                        <Text style={styles.brandName}>HOANGPHAN LUXE</Text>
                    </View>

                    {/* Welcome Message */}
                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>Nhập Mật Khẩu</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Tài khoản: {username}
                        </Text>
                    </View>

                    {/* Progress Indicator */}
                    <View style={styles.progressBar}>
                        <View style={styles.progressStep}>
                            <View style={styles.progressCircle}>
                                <Feather name="check" size={14} color="#fff" />
                            </View>
                            <Text style={styles.progressLabel}>Xác Nhận</Text>
                        </View>
                        <View style={styles.progressLine} />
                        <View style={styles.progressStep}>
                            <View style={[styles.progressCircle, styles.progressCircleActive]}>
                                <Text style={styles.progressText}>2</Text>
                            </View>
                            <Text style={styles.progressLabel}>Mật Khẩu</Text>
                        </View>
                    </View>

                    {/* Password Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Mật Khẩu</Text>
                        <View style={[
                            styles.inputWrapper,
                            isFocused && styles.inputWrapperFocused,
                            password && styles.inputWrapperFilled,
                        ]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập mật khẩu của bạn"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onSubmitEditing={handleLogin}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                disabled={!password}
                            >
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={18}
                                    color={password ? "#D4AF37" : "#ccc"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Password Requirements */}
                    <View style={styles.requirementsBox}>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={password.length >= 6 ? "check-circle" : "circle"}
                                size={14}
                                color={password.length >= 6 ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                password.length >= 6 && styles.requirementTextMet,
                            ]}>
                                Ít nhất 6 ký tự
                            </Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Feather
                                name={/[A-Z]/.test(password) ? "check-circle" : "circle"}
                                size={14}
                                color={/[A-Z]/.test(password) ? "#34C759" : "#ccc"}
                            />
                            <Text style={[
                                styles.requirementText,
                                /[A-Z]/.test(password) && styles.requirementTextMet,
                            ]}>
                                Chứa chữ cái viết hoa
                            </Text>
                        </View>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Feather name="shield" size={16} color="#D4AF37" />
                        <Text style={styles.infoText}>
                            Mật khẩu được bảo vệ bằng mã hóa SSL
                        </Text>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            loading && styles.loginButtonDisabled,
                            !password.trim() && styles.loginButtonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={loading || !password.trim()}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Feather name="log-in" size={18} color="#fff" />
                                <Text style={styles.loginButtonText}>Đăng Nhập</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Forgot Password Link */}
                    <TouchableOpacity
                        style={styles.forgotSection}
                        onPress={() => router.push("/auth/ForgotPasswordScreen")}
                    >
                        <Feather name="help-circle" size={16} color="#D4AF37" />
                        <Text style={styles.forgotLink}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Back to Email Section */}
                    <View style={styles.backToEmailSection}>
                        <Text style={styles.backToEmailText}>Muốn dùng tài khoản khác?</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.backToEmailLink}>Quay lại</Text>
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
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    logoIcon: {
        fontSize: 36,
    },
    brandName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 1.5,
    },
    welcomeSection: {
        alignItems: "center",
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 6,
    },
    welcomeSubtitle: {
        fontSize: 12,
        color: "#8B7355",
        textAlign: "center",
        fontWeight: "500",
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    progressStep: {
        alignItems: "center",
        flex: 1,
    },
    progressCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#34C759",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
    },
    progressCircleActive: {
        backgroundColor: "#D4AF37",
    },
    progressText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
    progressLabel: {
        fontSize: 11,
        color: "#8B7355",
        fontWeight: "600",
    },
    progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: "#D4AF37",
        marginHorizontal: 8,
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
    infoBox: {
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
    infoText: {
        fontSize: 12,
        color: "#8B7355",
        flex: 1,
        fontWeight: "500",
    },
    loginButton: {
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
    loginButtonDisabled: {
        opacity: 0.5,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    forgotSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        gap: 6,
        marginBottom: 16,
    },
    forgotLink: {
        fontSize: 13,
        color: "#D4AF37",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    divider: {
        height: 1,
        backgroundColor: "#E8D4B8",
        marginVertical: 16,
    },
    backToEmailSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    backToEmailText: {
        fontSize: 13,
        color: "#8B7355",
    },
    backToEmailLink: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
        textDecorationLine: "underline",
    },
});