import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import orderService from "../../../services/orderService";
import { Feather } from "@expo/vector-icons";
import { IMAGE_URL } from "../../../services/config";

export default function OrderDetailScreen() {
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await orderService.getOrderById(id);
                setOrder(res);
            } catch (error) {
                console.error("Lỗi tải đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#D4AF37" />
                    <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!order) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color="#1A1410" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Chi Tiết Đơn Hàng</Text>
                </View>
                <View style={styles.errorContainer}>
                    <Feather name="alert-circle" size={48} color="#ccc" />
                    <Text style={styles.errorText}>Không tìm thấy đơn hàng</Text>
                </View>
            </SafeAreaView>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#FF9500';
            case 'processing': return '#D4AF37';
            case 'shipped': return '#007AFF';
            case 'delivered': return '#34C759';
            default: return '#8B7355';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xác nhận';
            case 'processing': return 'Đang xử lý';
            case 'shipped': return 'Đang giao hàng';
            case 'delivered': return 'Đã giao hàng';
            default: return status;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Feather name="arrow-left" size={20} color="#1A1410" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Chi Tiết Đơn Hàng</Text>
                    <Text style={styles.headerSubtitle}>Đơn hàng #{order.id}</Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Order Status Badge */}
                <View style={styles.statusContainer}>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(order.status) + '20' }
                    ]}>
                        <Feather name="check-circle" size={20} color={getStatusColor(order.status)} />
                        <Text style={[
                            styles.statusText,
                            { color: getStatusColor(order.status) }
                        ]}>
                            {getStatusText(order.status)}
                        </Text>
                    </View>
                </View>

                {/* Order Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <Feather name="info" size={18} color="#D4AF37" />
                        <Text style={styles.cardTitle}>Thông Tin Đơn Hàng</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoLeft}>
                            <Feather name="calendar" size={16} color="#D4AF37" />
                            <Text style={styles.infoLabel}>Ngày Đặt</Text>
                        </View>
                        <Text style={styles.infoValue}>
                            {new Date(order.created_at).toLocaleString('vi-VN')}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.infoLeft}>
                            <Feather name="credit-card" size={16} color="#D4AF37" />
                            <Text style={styles.infoLabel}>Thanh Toán</Text>
                        </View>
                        <Text style={styles.paymentValue}>{order.payment}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.infoLeft}>
                            <Feather name="map-pin" size={16} color="#D4AF37" />
                            <Text style={styles.infoLabel}>Địa Chỉ</Text>
                        </View>
                        <Text style={styles.addressValue}>{order.address}</Text>
                    </View>
                </View>

                {/* Products Card */}
                <View style={styles.productsCard}>
                    <View style={styles.cardHeader}>
                        <Feather name="shopping-bag" size={18} color="#D4AF37" />
                        <Text style={styles.cardTitle}>Sản Phẩm</Text>
                        <Text style={styles.itemCount}>({order.items.length})</Text>
                    </View>

                    {order.items.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.productItem}>
                                <Image
                                    source={{ uri: IMAGE_URL + "/products/" + item.product.image_url }}
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName} numberOfLines={2}>
                                        {item.product.name}
                                    </Text>
                                    <View style={styles.productMeta}>
                                        <Text style={styles.quantity}>
                                            Số lượng: <Text style={styles.quantityBold}>{item.quantity}</Text>
                                        </Text>
                                        <Text style={styles.productPrice}>
                                            {item.price.toLocaleString()}₫
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.itemTotalBox}>
                                    <Text style={styles.itemTotal}>
                                        {(item.price * item.quantity).toLocaleString()}₫
                                    </Text>
                                </View>
                            </View>
                            {index < order.items.length - 1 && <View style={styles.itemDivider} />}
                        </View>
                    ))}
                </View>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tổng Tiền Hàng</Text>
                        <Text style={styles.summaryValue}>
                            {(order.total * 0.9).toLocaleString()}₫
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Phí Vận Chuyển</Text>
                        <Text style={styles.summaryValue}>Miễn Phí</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tổng Cộng</Text>
                        <Text style={styles.totalAmount}>
                            {order.total.toLocaleString()}₫
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.continueBtn}>
                        <Feather name="shopping-bag" size={16} color="#fff" />
                        <Text style={styles.continueBtnText}>Tiếp Tục Mua Sắm</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1A1410",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#8B7355",
        marginTop: 2,
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    contentContainer: {
        paddingBottom: 30,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAFAF5",
        gap: 16,
    },
    loadingText: {
        fontSize: 14,
        color: "#8B7355",
    },
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    errorText: {
        fontSize: 16,
        color: "#999",
    },
    statusContainer: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    infoCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1410",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 10,
    },
    infoLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    infoLabel: {
        fontSize: 13,
        color: "#8B7355",
        fontWeight: "500",
    },
    infoValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
        textAlign: "right",
        flex: 1,
    },
    paymentValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#D4AF37",
    },
    addressValue: {
        fontSize: 13,
        fontWeight: "500",
        color: "#333",
        textAlign: "right",
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: "#E8D4B8",
        marginVertical: 8,
    },
    productsCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    itemCount: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "600",
        marginLeft: 4,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 12,
        gap: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#F9F6F1",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1A1410",
        marginBottom: 6,
    },
    productMeta: {
        gap: 4,
    },
    quantity: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "500",
    },
    quantityBold: {
        fontWeight: "700",
        color: "#333",
    },
    productPrice: {
        fontSize: 12,
        color: "#333",
        fontWeight: "600",
    },
    itemTotalBox: {
        alignItems: "flex-end",
        minWidth: 70,
    },
    itemTotal: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D4AF37",
    },
    itemDivider: {
        height: 1,
        backgroundColor: "#E8D4B8",
        marginVertical: 8,
    },
    summaryCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 12,
        paddingVertical: 16,
        paddingHorizontal: 14,
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
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
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
    actionButtons: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    continueBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
    },
    continueBtnText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    bottomSpace: {
        height: 20,
    },
});