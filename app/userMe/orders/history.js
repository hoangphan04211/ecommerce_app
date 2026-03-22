import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import orderService from "../../../services/orderService";
import { useRouter } from "expo-router";
import { IMAGE_URL } from "../../../services/config";
import { Feather } from '@expo/vector-icons';

export default function OrderHistoryScreen() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await orderService.getOrders();
                setOrders(Array.isArray(res) ? res : []);
            } catch (error) {
                console.error("Lỗi tải lịch sử đơn hàng:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

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
            case 'shipped': return 'Đang giao';
            case 'delivered': return 'Đã giao hàng';
            default: return status;
        }
    };

    const renderEmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIcon}>
                <Feather name="inbox" size={64} color="#E8D4B8" />
            </View>
            <Text style={styles.emptyTitle}>Chưa có đơn hàng</Text>
            <Text style={styles.emptySubtitle}>Bắt đầu mua sắm ngay hôm nay</Text>
            <TouchableOpacity
                style={styles.shopButton}
                onPress={() => router.push("/(tabs)/products")}
            >
                <Feather name="shopping-bag" size={16} color="#fff" />
                <Text style={styles.shopButtonText}>Mua Sắm Ngay</Text>
            </TouchableOpacity>
        </View>
    );

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
                    <Text style={styles.headerTitle}>Lịch Sử Đơn Hàng</Text>
                    <Text style={styles.headerSubtitle}>Theo dõi đơn hàng của bạn</Text>
                </View>
                <View style={styles.headerIcon}>
                    <Text style={styles.orderCount}>{orders.length}</Text>
                </View>
            </View>

            <View style={styles.container}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#D4AF37" />
                        <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
                    </View>
                ) : orders.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.orderCard}
                                onPress={() => router.push(`/userMe/orders/${item.id}`)}
                                activeOpacity={0.8}
                            >
                                {/* Product Image */}
                                <View style={styles.imageWrapper}>
                                    {item.items.length > 0 && (
                                        <Image
                                            source={{ uri: IMAGE_URL + "/products/" + item.items[0].product.image_url }}
                                            style={styles.productImage}
                                            resizeMode="cover"
                                        />
                                    )}
                                    {item.items.length > 1 && (
                                        <View style={styles.multipleItemsBadge}>
                                            <Text style={styles.multipleItemsText}>
                                                +{item.items.length - 1}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* Order Info */}
                                <View style={styles.orderInfo}>
                                    {/* Header */}
                                    <View style={styles.orderHeaderRow}>
                                        <View>
                                            <Text style={styles.orderIdText}>Đơn Hàng #{item.id}</Text>
                                            <Text style={styles.orderDate}>
                                                {new Date(item.created_at).toLocaleDateString('vi-VN')}
                                            </Text>
                                        </View>
                                        <Feather name="chevron-right" size={20} color="#D4AF37" />
                                    </View>

                                    {/* Status Badge */}
                                    {/* <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusColor(item.status) + '20' }
                                    ]}>
                                        <Text style={[
                                            styles.statusBadgeText,
                                            { color: getStatusColor(item.status) }
                                        ]}>
                                            {getStatusText(item.status)}
                                        </Text>
                                    </View> */}

                                    {/* Details */}
                                    <View style={styles.detailsRow}>
                                        <View style={styles.detailItem}>
                                            <Text style={styles.detailLabel}>Tổng Tiền</Text>
                                            <Text style={styles.detailValue}>
                                                {item.total.toLocaleString()}₫
                                            </Text>
                                        </View>
                                        <View style={styles.detailDivider} />
                                        <View style={styles.detailItem}>
                                            <Text style={styles.detailLabel}>Thanh Toán</Text>
                                            <Text style={styles.paymentMethod}>
                                                {item.payment}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
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
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E8D4B8",
    },
    backButton: {
        padding: 8,
        marginRight: 8,
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
        fontSize: 11,
        color: "#8B7355",
        marginTop: 2,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFF9F0",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    orderCount: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D4AF37",
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    loadingText: {
        fontSize: 14,
        color: "#8B7355",
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    orderCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    imageWrapper: {
        position: "relative",
        marginRight: 0,
    },
    productImage: {
        width: 100,
        height: 120,
        resizeMode: "cover",
        backgroundColor: "#F9F6F1",
    },
    multipleItemsBadge: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#D4AF37",
        justifyContent: "center",
        alignItems: "center",
    },
    multipleItemsText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    orderInfo: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
    },
    orderHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    orderIdText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A1410",
    },
    orderDate: {
        fontSize: 12,
        color: "#8B7355",
        marginTop: 2,
        fontWeight: "500",
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    statusBadgeText: {
        fontSize: 11,
        fontWeight: "700",
    },
    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#E8D4B8",
    },
    detailItem: {
        flex: 1,
        paddingVertical: 4,
    },
    detailLabel: {
        fontSize: 11,
        color: "#8B7355",
        fontWeight: "500",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D4AF37",
    },
    detailDivider: {
        width: 1,
        height: 24,
        backgroundColor: "#E8D4B8",
    },
    paymentMethod: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
    },
    emptyStateContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FFF9F0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "#E8D4B8",
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 13,
        color: "#8B7355",
        marginBottom: 24,
        textAlign: "center",
    },
    shopButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: "#D4AF37",
        borderRadius: 10,
        gap: 8,
    },
    shopButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
});