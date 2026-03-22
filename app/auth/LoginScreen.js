import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import userService from "../../services/userService";
import { Feather } from "@expo/vector-icons";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleNext = async () => {
        if (!username.trim()) {
            Toast.show({
                type: "error",
                text1: "Vui lòng nhập email hoặc số điện thoại",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            let res;
            if (username.includes("@")) {
                res = await userService.checkEmail(username);
            } else {
                res = await userService.checkPhone(username);
            }

            if (res.exists) {
                router.push({
                    pathname: "/auth/PasswordScreen",
                    params: { username }
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Người dùng không tồn tại",
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

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === "Enter") {
            handleNext();
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
                        <Text style={styles.welcomeTitle}>Chào mừng trở lại!</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Nhập email hoặc số điện thoại để tiếp tục
                        </Text>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>Email hoặc Số Điện Thoại</Text>
                        <View style={[
                            styles.inputWrapper,
                            isFocused && styles.inputWrapperFocused,
                            username && styles.inputWrapperFilled,
                        ]}>
                            <Feather
                                name={username.includes("@") ? "mail" : "phone"}
                                size={18}
                                color="#D4AF37"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="email@example.com hoặc 0123456789"
                                placeholderTextColor="#999"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                keyboardType="default"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onSubmitEditing={handleNext}
                                editable={!loading}
                            />
                            {username && (
                                <TouchableOpacity onPress={() => setUsername("")}>
                                    <Feather name="x-circle" size={18} color="#D4AF37" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Feather name="info" size={16} color="#D4AF37" />
                        <Text style={styles.infoText}>
                            Nhập email hoặc số điện thoại đã đăng ký để tiếp tục
                        </Text>
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            loading && styles.nextButtonDisabled,
                            !username.trim() && styles.nextButtonDisabled,
                        ]}
                        onPress={handleNext}
                        disabled={loading || !username.trim()}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Text style={styles.nextButtonText}>Tiếp Tục</Text>
                                <Feather name="arrow-right" size={18} color="#fff" />
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Hoặc</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login */}
                    <TouchableOpacity style={styles.socialButton}>
                        <Feather name="facebook" size={18} color="#1877F2" />
                        <Text style={styles.socialButtonText}>Tiếp Tục Với Facebook</Text>
                    </TouchableOpacity>

                    {/* Register Section */}
                    <View style={styles.registerSection}>
                        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => router.push("/auth/RegisterScreen")}>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Help Section */}
                    <View style={styles.helpSection}>
                        <TouchableOpacity style={styles.helpButton}>
                            <Feather name="help-circle" size={16} color="#D4AF37" />
                            <Text style={styles.helpText}>Cần trợ giúp?</Text>
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
        marginBottom: 32,
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
    logoIcon: {
        fontSize: 40,
    },
    brandName: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 1.5,
    },
    welcomeSection: {
        alignItems: "center",
        marginBottom: 28,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 6,
    },
    welcomeSubtitle: {
        fontSize: 13,
        color: "#8B7355",
        textAlign: "center",
        lineHeight: 18,
    },
    inputSection: {
        marginBottom: 20,
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
        transition: "all 0.3s ease",
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
    nextButton: {
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
    nextButtonDisabled: {
        opacity: 0.5,
        backgroundColor: "#D4AF37",
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E8D4B8",
    },
    dividerText: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "600",
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        gap: 8,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    registerSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    registerText: {
        fontSize: 14,
        color: "#8B7355",
    },
    registerLink: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D4AF37",
        textDecorationLine: "underline",
    },
    helpSection: {
        alignItems: "center",
    },
    helpButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    helpText: {
        fontSize: 13,
        color: "#D4AF37",
        fontWeight: "600",
    },
});