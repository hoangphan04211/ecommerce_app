import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const products = [
    {
        id: 1,
        name: "Rolex Submariner",
        price: "85,000,000₫",
        originalPrice: "95,000,000₫",
        discount: 10,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 2,
        name: "Omega Seamaster",
        price: "65,000,000₫",
        originalPrice: "72,000,000₫",
        discount: 10,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 3,
        name: "TAG Heuer Carrera",
        price: "45,000,000₫",
        originalPrice: "50,000,000₫",
        discount: 10,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 4,
        name: "Breitling Navitimer",
        price: "55,000,000₫",
        originalPrice: "62,000,000₫",
        discount: 11,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 5,
        name: "Patek Philippe",
        price: "120,000,000₫",
        originalPrice: "135,000,000₫",
        discount: 11,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 6,
        name: "Audemars Piguet",
        price: "110,000,000₫",
        originalPrice: "125,000,000₫",
        discount: 12,
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
];

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState(36 * 60 + 58);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const h = Math.floor(m / 60);
        const mm = m % 60;
        return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Giảm Giá Flash</Text>
                    <Text style={styles.subtitle}>Ưu đãi sốc giới hạn thời gian</Text>
                </View>
                <TouchableOpacity
                    style={styles.timerBox}
                    onPress={() => router.push("/(tabs)/products")}
                >
                    <Feather name="clock" size={16} color="#fff" />
                    <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
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
                            onPress={() => router.push(`/product/${item.id}`)}
                        >
                            {/* Image Container */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={item.img}
                                    style={styles.image}
                                />

                                {/* Discount Badge */}
                                <View style={styles.discountTag}>
                                    <Text style={styles.discountText}>-{item.discount}%</Text>
                                </View>

                                {/* Flash Sale Badge */}
                                <View style={styles.flashBadge}>
                                    <Feather name="zap" size={12} color="#fff" />
                                    <Text style={styles.flashText}>FLASH</Text>
                                </View>
                            </View>

                            {/* Info */}
                            <View style={styles.info}>
                                <Text style={styles.name} numberOfLines={2}>
                                    {item.name}
                                </Text>
                                <View style={styles.priceBox}>
                                    <Text style={styles.price}>{item.price}</Text>
                                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                                </View>

                                {/* Add Button */}
                                <TouchableOpacity style={styles.addBtn}>
                                    <Feather name="shopping-bag" size={14} color="#fff" />
                                    <Text style={styles.addBtnText}>Mua ngay</Text>
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
    timerBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF3B30",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
        elevation: 3,
    },
    timerText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 0.5,
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
        resizeMode: "cover",
    },
    discountTag: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#FF3B30",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    discountText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    flashBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "#FF3B30",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    flashText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    info: {
        padding: 10,
    },
    name: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1A1410",
        marginBottom: 6,
        height: 32,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },
    price: {
        fontSize: 13,
        fontWeight: "700",
        color: "#D4AF37",
    },
    originalPrice: {
        fontSize: 11,
        color: "#999",
        textDecorationLine: "line-through",
    },
    addBtn: {
        flexDirection: "row",
        backgroundColor: "#FF3B30",
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        gap: 4,
    },
    addBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});