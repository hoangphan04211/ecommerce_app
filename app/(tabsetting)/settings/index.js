import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";

export default function SettingsIndex() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/(tabs)/profile");
    };

    const MenuItem = ({ icon, label, href, onPress }) => {
        if (onPress) {
            return (
                <TouchableOpacity style={styles.item} onPress={onPress}>
                    <View style={styles.itemIcon}>
                        <Feather name={icon} size={18} color="#D4AF37" />
                    </View>
                    <Text style={styles.label}>{label}</Text>
                    <Feather name="chevron-right" size={18} color="#E8D4B8" />
                </TouchableOpacity>
            );
        }

        return (
            <Link href={href} asChild>
                <TouchableOpacity style={styles.item}>
                    <View style={styles.itemIcon}>
                        <Feather name={icon} size={18} color="#D4AF37" />
                    </View>
                    <Text style={styles.label}>{label}</Text>
                    <Feather name="chevron-right" size={18} color="#E8D4B8" />
                </TouchableOpacity>
            </Link>
        );
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Link href="/(tabs)/profile" asChild>
                        <TouchableOpacity style={styles.backBtn}>
                            <Feather name="arrow-left" size={20} color="#1A1410" />
                        </TouchableOpacity>
                    </Link>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Cài Đặt</Text>
                        <Text style={styles.headerSubtitle}>Quản lý tài khoản của bạn</Text>
                    </View>
                </View>

                {/* Personal Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="user" size={16} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Cá Nhân</Text>
                    </View>
                    <View style={styles.menuList}>
                        <MenuItem
                            icon="user"
                            label="Hồ Sơ"
                            href="/settings/profile"
                        />
                        <MenuItem
                            icon="map-pin"
                            label="Địa Chỉ Giao Hàng"
                            href="/settings/address"
                        />
                        <MenuItem
                            icon="lock"
                            label="Bảo Mật"
                            href="/settings/changepass"
                        />
                        <MenuItem
                            icon="credit-card"
                            label="Phương Thức Thanh Toán"
                            href="/settings/payment"
                        />
                    </View>
                </View>

                {/* Shop Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="shopping-bag" size={16} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Cửa Hàng</Text>
                    </View>
                    <View style={styles.menuList}>
                        <MenuItem
                            icon="flag"
                            label="Quốc Gia"
                            href="/settings/country"
                        />
                        <MenuItem
                            icon="dollar-sign"
                            label="Tiền Tệ"
                            href="/settings/currency"
                        />
                        <MenuItem
                            icon="tag"
                            label="Kích Cỡ"
                            href="/settings/sizes"
                        />
                        <MenuItem
                            icon="file-text"
                            label="Điều Khoản Và Điều Kiện"
                            href="/settings/terms"
                        />
                    </View>
                </View>

                {/* Account Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="settings" size={16} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Tài Khoản</Text>
                    </View>
                    <View style={styles.menuList}>
                        <MenuItem
                            icon="globe"
                            label="Ngôn Ngữ"
                            href="/settings/language"
                        />
                        <MenuItem
                            icon="info"
                            label="Về LUXE TIMEPIECE"
                            href="/settings/about"
                        />
                        <MenuItem
                            icon="mail"
                            label="Liên Hệ Hỗ Trợ"
                            href="/settings/support"
                        />
                    </View>
                </View>

                {/* Logout Section */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={handleLogout}
                    >
                        <Feather name="log-out" size={18} color="#fff" />
                        <Text style={styles.logoutText}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>

                {/* Version */}
                <Text style={styles.version}>LUXE TIMEPIECE v1.0.0</Text>
                <Text style={styles.versionDesc}>© 2024 - Tất cả quyền lợi được bảo lưu</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    contentContainer: {
        paddingBottom: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    backBtn: {
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1410",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#8B7355",
        marginTop: 2,
    },
    section: {
        marginHorizontal: 16,
        marginVertical: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 0.5,
    },
    menuList: {
        gap: 0,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    itemIcon: {
        width: 40,
        height: 40,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    label: {
        fontSize: 14,
        color: "#333",
        flex: 1,
        fontWeight: "500",
    },
    logoutSection: {
        marginHorizontal: 16,
        marginVertical: 20,
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF3B30",
        paddingVertical: 14,
        borderRadius: 10,
        gap: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    version: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
        textAlign: "center",
        marginBottom: 4,
    },
    versionDesc: {
        fontSize: 11,
        color: "#8B7355",
        textAlign: "center",
        marginBottom: 20,
    },
});