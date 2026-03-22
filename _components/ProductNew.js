import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { IMAGE_URL } from "../services/config";
import productService from "../services/productService";

export default function ProductNew() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productService.getNew(5);
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi tải sản phẩm mới:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Sản Phẩm Mới</Text>
                    <Text style={styles.subtitle}>Những chiếc đồng hồ mới nhất</Text>
                </View>
                <TouchableOpacity
                    style={styles.seeAllBtn}
                    onPress={() => router.push("/product")}
                >
                    <Text style={styles.seeAll}>Xem tất cả</Text>
                    <Feather name="arrow-right" size={16} color="#D4AF37" />
                </TouchableOpacity>
            </View>

            {/* Product cards */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#D4AF37" />
                </View>
            ) : products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Feather name="inbox" size={40} color="#ccc" />
                    <Text style={styles.emptyText}>Chưa có sản phẩm mới</Text>
                </View>
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.row}>
                        {products.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => router.push(`/product/${item.id}`)}
                            >
                                {/* Image Container */}
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: `${IMAGE_URL}/products/${item.image_url}` }}
                                        style={styles.image}
                                    />
                                    {/* New Badge */}
                                    <View style={styles.newBadge}>
                                        <Text style={styles.newBadgeText}>NEW</Text>
                                    </View>
                                    {/* Wishlist Button */}
                                    <TouchableOpacity style={styles.wishBtn}>
                                        <Feather name="heart" size={16} color="#FF3B30" />
                                    </TouchableOpacity>
                                </View>

                                {/* Info */}
                                <View style={styles.info}>
                                    <Text style={styles.name} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.description} numberOfLines={1}>
                                        {item.content}
                                    </Text>

                                    {/* Rating */}
                                    <View style={styles.ratingBox}>
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                        <Text style={styles.ratingText}>4.9</Text>
                                    </View>

                                    {/* Price */}
                                    <View style={styles.priceBox}>
                                        <Text style={styles.price}>
                                            {item.price.toLocaleString()}₫
                                        </Text>
                                        {item.price_discount && item.price_discount > item.price && (
                                            <Text style={styles.originalPrice}>
                                                {item.price_discount.toLocaleString()}₫
                                            </Text>
                                        )}
                                    </View>
                                </View>

                                {/* Add Button */}
                                {/* <TouchableOpacity style={styles.addBtn}>
                                    <Feather name="plus" size={18} color="#fff" />
                                </TouchableOpacity> */}
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    titleSection: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        color: "#8B7355",
        letterSpacing: 0.5,
    },
    seeAllBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        gap: 4,
    },
    seeAll: {
        fontSize: 13,
        fontWeight: "600",
        color: "#D4AF37",
    },
    scrollContent: {
        paddingRight: 12,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    card: {
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    imageContainer: {
        width: "100%",
        height: 140,
        backgroundColor: "#F9F6F1",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    newBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "#D4AF37",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    newBadgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
    },
    wishBtn: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        backgroundColor: "#fff",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1A1410",
        marginBottom: 4,
        height: 32,
    },
    description: {
        fontSize: 11,
        color: "#8B7355",
        marginBottom: 6,
        lineHeight: 14,
    },
    ratingBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 8,
    },
    ratingText: {
        fontSize: 11,
        color: "#8B7355",
        fontWeight: "500",
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    price: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D4AF37",
    },
    originalPrice: {
        fontSize: 11,
        color: "#999",
        textDecorationLine: "line-through",
    },
    addBtn: {
        width: "100%",
        backgroundColor: "#D4AF37",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        paddingVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    emptyText: {
        fontSize: 13,
        color: "#999",
        marginTop: 8,
    },
});