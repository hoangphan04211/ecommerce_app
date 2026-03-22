import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { IMAGE_URL } from "../../services/config";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function CheckoutScreen() {
    const { cartItems, getTotalPrice, checkout } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    const handleOrder = async () => {
        if (!user) {
            router.push("/auth/StartScreen");
            return;
        }

        if (!user.address) {
            router.push("/");
            return;
        }

        const userInfo = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            payment: paymentMethod,
        };

        setLoading(true);
        try {
            await checkout(userInfo);
            router.replace("/userMe/orders/history");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.wrapper}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={20} color="#1A1410" />
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>Thanh Toán</Text>
                    <Text style={styles.subtitle}>({cartItems.length} sản phẩm)</Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Shipping Address Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="map-pin" size={18} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Địa Chỉ Giao Hàng</Text>
                    </View>
                    <View style={styles.addressBox}>
                        {user ? (
                            <Text style={styles.addressText}>
                                {user.address || "Chưa có địa chỉ, vui lòng cập nhật"}
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={() => router.push("/auth/StartScreen")}>
                                <Text style={styles.loginText}>
                                    Bạn cần đăng nhập để thanh toán
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Cart Items Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="shopping-bag" size={18} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Chi Tiết Sản Phẩm</Text>
                    </View>
                    <View style={styles.itemsBox}>
                        {cartItems.map((item, index) => (
                            <View key={item.id}>
                                <View style={styles.itemRow}>
                                    <Image
                                        source={{ uri: IMAGE_URL + "/products/" + item.image_url }}
                                        style={styles.itemImage}
                                    />
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemName} numberOfLines={2}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.itemQuantity}>
                                            Số lượng: <Text style={styles.qtyBold}>{item.quantity}</Text>
                                        </Text>
                                        <Text style={styles.itemPrice}>
                                            {(item.price * item.quantity).toLocaleString()}₫
                                        </Text>
                                    </View>
                                </View>
                                {index < cartItems.length - 1 && <View style={styles.itemDivider} />}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Feather name="credit-card" size={18} color="#D4AF37" />
                        <Text style={styles.sectionTitle}>Phương Thức Thanh Toán</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <TouchableOpacity
                            style={[
                                styles.paymentOption,
                                paymentMethod === "COD" && styles.paymentOptionActive,
                            ]}
                            onPress={() => setPaymentMethod("COD")}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[
                                    styles.radio,
                                    paymentMethod === "COD" && styles.radioActive
                                ]}>
                                    {paymentMethod === "COD" && (
                                        <View style={styles.radioDot} />
                                    )}
                                </View>
                                <View style={styles.paymentContent}>
                                    <Text style={[
                                        styles.paymentText,
                                        paymentMethod === "COD" && styles.paymentTextActive,
                                    ]}>
                                        Thanh Toán Khi Nhận Hàng
                                    </Text>
                                    <Text style={styles.paymentDesc}>
                                        COD - Thanh toán trực tiếp khi nhận
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.paymentOption,
                                paymentMethod === "Bank" && styles.paymentOptionActive,
                            ]}
                            onPress={() => setPaymentMethod("Bank")}
                        >
                            <View style={styles.radioContainer}>
                                <View style={[
                                    styles.radio,
                                    paymentMethod === "Bank" && styles.radioActive
                                ]}>
                                    {paymentMethod === "Bank" && (
                                        <View style={styles.radioDot} />
                                    )}
                                </View>
                                <View style={styles.paymentContent}>
                                    <Text style={[
                                        styles.paymentText,
                                        paymentMethod === "Bank" && styles.paymentTextActive,
                                    ]}>
                                        Chuyển Khoản Ngân Hàng
                                    </Text>
                                    <Text style={styles.paymentDesc}>
                                        Chuyển khoản qua tài khoản ngân hàng
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.summarySection}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tổng tiền hàng</Text>
                        <Text style={styles.summaryValue}>
                            {(getTotalPrice() * 0.9).toLocaleString()}₫
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
                        <Text style={styles.summaryValue}>Miễn phí</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Tổng Cộng</Text>
                        <Text style={styles.totalAmount}>
                            {getTotalPrice().toLocaleString()}₫
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.orderButton, loading && styles.orderButtonDisabled]}
                    onPress={handleOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Feather name="check-circle" size={18} color="#fff" />
                            <Text style={styles.orderText}>Xác Nhận Đặt Hàng</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FAFAF5"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    backButton: {
        marginRight: 12,
        padding: 6,
    },
    headerTitle: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1410",
    },
    subtitle: {
        fontSize: 12,
        color: "#8B7355",
        marginTop: 2,
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    contentContainer: {
        paddingBottom: 150,
    },
    section: {
        marginHorizontal: 16,
        marginVertical: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
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
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1410",
        letterSpacing: 0.5,
    },
    addressBox: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
    },
    addressText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
        lineHeight: 20,
    },
    loginText: {
        fontSize: 14,
        color: "#FF3B30",
        fontWeight: "600",
    },
    itemsBox: {
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        gap: 10,
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        resizeMode: "cover",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 13,
        color: "#1A1410",
        fontWeight: "600",
        marginBottom: 4,
    },
    itemQuantity: {
        fontSize: 12,
        color: "#8B7355",
        marginBottom: 4,
    },
    qtyBold: {
        fontWeight: "700",
        color: "#333",
    },
    itemPrice: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
    },
    itemDivider: {
        height: 1,
        backgroundColor: "#E8D4B8",
        marginHorizontal: 10,
    },
    paymentRow: {
        flexDirection: "column",
        gap: 10,
    },
    paymentOption: {
        padding: 12,
        borderWidth: 2,
        borderColor: "#E8D4B8",
        borderRadius: 10,
        backgroundColor: "#FFF9F0",
    },
    paymentOptionActive: {
        borderColor: "#D4AF37",
        backgroundColor: "#FFFBF5",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#D4AF37",
        justifyContent: "center",
        alignItems: "center",
    },
    radioActive: {
        borderColor: "#D4AF37",
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#D4AF37",
    },
    paymentContent: {
        flex: 1,
    },
    paymentText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    paymentTextActive: {
        color: "#D4AF37",
        fontWeight: "700",
    },
    paymentDesc: {
        fontSize: 11,
        color: "#8B7355",
        marginTop: 2,
    },
    summarySection: {
        marginHorizontal: 16,
        marginVertical: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 13,
        color: "#8B7355",
        fontWeight: "500",
    },
    summaryValue: {
        fontSize: 13,
        color: "#333",
        fontWeight: "600",
    },
    summaryDivider: {
        height: 1,
        backgroundColor: "#E8D4B8",
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1410",
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D4AF37",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E8D4B8",
    },
    orderButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
    },
    orderButtonDisabled: {
        opacity: 0.6,
    },
    orderText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});