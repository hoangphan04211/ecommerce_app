import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function StartScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/")}
                >
                    <Feather name="arrow-left" size={20} color="#1A1410" />
                </TouchableOpacity>

                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoIcon}>⌚</Text>
                    </View>
                    <Text style={styles.logo}>LUXE TIMEPIECE</Text>
                    <Text style={styles.logoSubtitle}>Những Chiếc Đồng Hồ Cao Cấp Nhất</Text>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <View style={styles.featureBox}>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Feather name="check-circle" size={24} color="#D4AF37" />
                            </View>
                            <Text style={styles.featureText}>100% Chính Hãng</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Feather name="truck" size={24} color="#D4AF37" />
                            </View>
                            <Text style={styles.featureText}>Giao Hàng Miễn Phí</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Feather name="shield" size={24} color="#D4AF37" />
                            </View>
                            <Text style={styles.featureText}>Bảo Hành 2-5 Năm</Text>
                        </View>
                    </View>

                    <Text style={styles.tagline}>
                        Khám phá bộ sưu tập đồng hồ cao cấp từ những thương hiệu hàng đầu thế giới
                    </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push("/auth/RegisterScreen")}
                    >
                        <Text style={styles.primaryButtonText}>Bắt Đầu Ngay</Text>
                        <Feather name="arrow-right" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push("/auth/LoginScreen")}
                    >
                        <Text style={styles.secondaryButtonText}>Đã Có Tài Khoản?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.guestButton}
                        onPress={() => router.push("/")}
                    >
                        <Feather name="eye" size={16} color="#D4AF37" />
                        <Text style={styles.guestButtonText}>Xem Trước</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Bằng việc tiếp tục, bạn đồng ý với
                    </Text>
                    <View style={styles.footerLinks}>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Điều Khoản</Text>
                        </TouchableOpacity>
                        <Text style={styles.footerSeparator}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Bảo Mật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FAFAF5",
    },
    backButton: {
        alignSelf: "flex-start",
        padding: 8,
        marginBottom: 12,
    },
    logoSection: {
        alignItems: "center",
        marginBottom: 24,
    },
    logoBox: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    logoIcon: {
        fontSize: 48,
    },
    logo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 2,
        marginBottom: 6,
    },
    logoSubtitle: {
        fontSize: 12,
        color: "#8B7355",
        letterSpacing: 1,
        fontStyle: "italic",
    },
    contentSection: {
        width: "100%",
        alignItems: "center",
        marginBottom: 24,
    },
    featureBox: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    featureIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFF9F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    featureText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
        flex: 1,
    },
    tagline: {
        fontSize: 15,
        color: "#8B7355",
        textAlign: "center",
        lineHeight: 22,
        fontStyle: "italic",
    },
    buttonSection: {
        width: "100%",
        marginBottom: 24,
    },
    primaryButton: {
        flexDirection: "row",
        backgroundColor: "#D4AF37",
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        elevation: 2,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    secondaryButton: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#D4AF37",
        marginBottom: 10,
    },
    secondaryButtonText: {
        color: "#D4AF37",
        fontSize: 16,
        fontWeight: "700",
    },
    guestButton: {
        flexDirection: "row",
        backgroundColor: "#FFF9F0",
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    guestButtonText: {
        color: "#D4AF37",
        fontSize: 14,
        fontWeight: "600",
    },
    footer: {
        alignItems: "center",
        width: "100%",
    },
    footerText: {
        fontSize: 11,
        color: "#8B7355",
        marginBottom: 6,
    },
    footerLinks: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    footerLink: {
        fontSize: 11,
        color: "#D4AF37",
        fontWeight: "600",
        textDecorationLine: "underline",
    },
    footerSeparator: {
        color: "#E8D4B8",
    },
});