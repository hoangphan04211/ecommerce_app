import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const products = [
    {
        id: 1,
        label: "Mới",
        category: "Rolex",
        points: 2450,
        views: 12500,
        img: require("../assets/images/category/category-banner-1.jpg"),
    },
    {
        id: 2,
        label: "Giảm Giá",
        category: "Omega",
        points: 1950,
        views: 8700,
        img: require("../assets/images/category/category-banner-2.jpg"),
    },
    {
        id: 3,
        label: "Hot",
        category: "TAG Heuer",
        points: 3120,
        views: 15300,
        img: require("../assets/images/category/category-banner-3.jpg"),
    },
    {
        id: 4,
        label: "Xu Hướng",
        category: "Patek Philippe",
        points: 2780,
        views: 11200,
        img: require("../assets/images/category/category-banner-1.jpg"),
    },
];

export default function MostPopular() {
    const router = useRouter();

    const getLabelColor = (label) => {
        switch (label) {
            case "Giảm Giá": return "#FF3B30";
            case "Hot": return "#D4AF37";
            case "Mới": return "#007AFF";
            case "Xu Hướng": return "#8B7355";
            default: return "#D4AF37";
        }
    };

    const getLabelBgColor = (label) => {
        switch (label) {
            case "Giảm Giá": return "#FFE8E6";
            case "Hot": return "#FFF9F0";
            case "Mới": return "#E3F2FD";
            case "Xu Hướng": return "#F5F5F5";
            default: return "#FFF9F0";
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Phổ Biến Nhất</Text>
                    <Text style={styles.subtitle}>Được yêu thích bởi khách hàng</Text>
                </View>
                <TouchableOpacity
                    style={styles.seeAllBtn}
                    onPress={() => router.push("product")}
                >
                    <Text style={styles.seeAll}>Xem tất cả</Text>
                    <Feather name="arrow-right" size={14} color="#D4AF37" />
                </TouchableOpacity>
            </View>

            {/* Product cards */}
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
                            onPress={() => router.push("/(tabs)/products")}
                        >
                            {/* Image Container */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={item.img}
                                    style={styles.image}
                                />

                                {/* Label Badge */}
                                <View
                                    style={[
                                        styles.labelBadge,
                                        { backgroundColor: getLabelBgColor(item.label) }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.labelText,
                                            { color: getLabelColor(item.label) }
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </View>

                                {/* Views Badge */}
                                <View style={styles.viewsBadge}>
                                    <Feather name="eye" size={12} color="#D4AF37" />
                                    <Text style={styles.viewsText}>{(item.views / 1000).toFixed(1)}k</Text>
                                </View>
                            </View>

                            {/* Info */}
                            <View style={styles.info}>
                                <View style={styles.infoLeft}>
                                    <Text style={styles.category}>{item.category}</Text>
                                    <View style={styles.pointsBox}>
                                        <Feather name="heart" size={13} color="#FF3B30" fill="#FF3B30" />
                                        <Text style={styles.points}>{item.points.toLocaleString()}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Feather name="arrow-right" size={16} color="#D4AF37" />
                                </TouchableOpacity>
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
        width: 160,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
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
        resizeMode: "cover",
    },
    labelBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    labelText: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    viewsBadge: {
        position: "absolute",
        bottom: 8,
        right: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
    viewsText: {
        fontSize: 10,
        color: "#D4AF37",
        fontWeight: "600",
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    infoLeft: {
        flex: 1,
    },
    category: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1A1410",
        marginBottom: 4,
    },
    pointsBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    points: {
        fontSize: 13,
        fontWeight: "700",
        color: "#FF3B30",
    },
    actionBtn: {
        width: 32,
        height: 32,
        backgroundColor: "#FFF9F0",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8D4B8",
    },
});