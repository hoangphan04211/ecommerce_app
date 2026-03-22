import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import categoryService from "../services/categoryService";
import { IMAGE_URL } from "../services/config";

export default function CategoryGrid() {
    const [categories, setCategories] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi tải danh mục:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const visibleCategories = showAll ? categories : categories.slice(0, 4);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Danh Mục</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#D4AF37" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Danh Mục</Text>
                    <Text style={styles.subtitle}>Khám phá các bộ sưu tập</Text>
                </View>
                {categories.length > 4 && (
                    <TouchableOpacity
                        style={styles.seeAllBtn}
                        onPress={() => setShowAll(!showAll)}
                    >
                        <Text style={styles.seeAll}>
                            {showAll ? "Thu gọn" : "Xem tất cả"}
                        </Text>
                        <Feather
                            name={showAll ? "chevron-up" : "chevron-down"}
                            size={16}
                            color="#D4AF37"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Grid */}
            <View style={styles.grid}>
                {visibleCategories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={styles.item}
                        onPress={() => router.push(`/product?cat=${cat.id}`)}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: `${IMAGE_URL}/categorys/${cat.image_url}` }}
                                style={styles.image}
                            />
                            {/* Overlay */}
                            <View style={styles.overlay} />

                            {/* Count Badge */}
                            <View style={styles.countBadge}>
                                <Text style={styles.countText}>
                                    {cat.products_count} sản phẩm
                                </Text>
                            </View>


                            {/* Arrow Icon */}
                            <View style={styles.iconBox}>
                                <Feather name="arrow-right" size={18} color="#D4AF37" />
                            </View>
                        </View>

                        {/* Label */}
                        <View style={styles.labelContainer}>
                            <View style={styles.labelContent}>
                                <Text style={styles.name} numberOfLines={1}>
                                    {cat.name}
                                </Text>
                            </View>
                            <Feather name="chevron-right" size={16} color="#D4AF37" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Show All Animation */}
            {showAll && categories.length > 4 && (
                <View style={styles.expandInfo}>
                    <Text style={styles.expandText}>
                        {categories.length} danh mục
                    </Text>
                </View>
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
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },
    item: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    imageContainer: {
        width: "100%",
        height: 130,
        backgroundColor: "#F9F6F1",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(26, 20, 16, 0.15)",
    },
    countBadge: {
        position: "absolute",
        bottom: 8,
        left: 8,
        backgroundColor: "#D4AF37",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    countText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#fff",
    },
    iconBox: {
        position: "absolute",
        top: "50%",
        right: 12,
        transform: [{ translateY: -9 }],
        width: 36,
        height: 36,
        backgroundColor: "#fff",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        minHeight: 44,
    },
    labelContent: {
        flex: 1,
        marginRight: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A1410",
    },
    loadingContainer: {
        paddingVertical: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    expandInfo: {
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 8,
    },
    expandText: {
        fontSize: 12,
        color: "#8B7355",
        fontStyle: "italic",
    },
});