import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import productService from "../services/productService";
import { IMAGE_URL } from "../services/config";

export default function ProductRelated({ productId }) {
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productService.getRelated(productId);
                setRelated(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi tải sản phẩm liên quan:", error);
                setRelated([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#D4AF37" />
                </View>
            </View>
        );
    }

    if (related.length === 0) return null;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Sản Phẩm Liên Quan</Text>
                    <Text style={styles.subtitle}>Những lựa chọn khác tương tự</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/products")}
                >
                    <Feather name="arrow-right" size={20} color="#D4AF37" />
                </TouchableOpacity>
            </View>

            {/* Scrollable row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.row}>
                    {related.map((item) => (
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
                                {/* Quick View Button */}
                                <TouchableOpacity style={styles.quickViewBtn}>
                                    <Feather name="eye" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            {/* Info */}
                            <View style={styles.info}>
                                <Text style={styles.name} numberOfLines={2}>
                                    {item.name}
                                </Text>
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

                                {/* Add Button */}
                                {/* <TouchableOpacity style={styles.addBtn}>
                                    <Feather name="plus" size={14} color="#fff" />
                                </TouchableOpacity> */}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#E8D4B8",
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
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 11,
        color: "#8B7355",
        letterSpacing: 0.5,
    },
    loadingContainer: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        paddingRight: 4,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    card: {
        width: 160,
        backgroundColor: "#FFF9F0",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E8D4B8",
        elevation: 2,
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
    quickViewBtn: {
        position: "absolute",
        bottom: 8,
        right: 8,
        width: 32,
        height: 32,
        backgroundColor: "#D4AF37",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1A1410",
        marginBottom: 6,
        height: 28,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 8,
    },
    price: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
    },
    originalPrice: {
        fontSize: 10,
        color: "#999",
        textDecorationLine: "line-through",
    },
    addBtn: {
        width: "100%",
        paddingVertical: 8,
        backgroundColor: "#D4AF37",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});