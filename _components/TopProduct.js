import React from "react";
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
        name: "Rolex",
        img: require("../assets/images/products/product-large-1.jpg"),
    },
    {
        id: 2,
        name: "Omega",
        img: require("../assets/images/products/product-large-2-1.jpg"),
    },
    {
        id: 3,
        name: "TAG Heuer",
        img: require("../assets/images/products/product-large-2-2.jpg"),
    },
    {
        id: 4,
        name: "Breitling",
        img: require("../assets/images/products/product-large-2-3.jpg"),
    },
    {
        id: 5,
        name: "Patek Philippe",
        img: require("../assets/images/products/product-large-2.jpg"),
    },
];

export default function TopProducts() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Sản Phẩm Hàng Đầu</Text>
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
                    {products.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.item}
                            onPress={() => router.push(`/product/${item.id}`)}
                        >
                            <Image
                                source={item.img}
                                style={styles.image}
                            />
                            <Text style={styles.name}>{item.name}</Text>
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
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1410",
    },
    scrollContent: {
        paddingRight: 12,
    },
    row: {
        flexDirection: "row",
        gap: 14,
    },
    item: {
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: "cover",
        borderWidth: 2,
        borderColor: "#E8D4B8",
        marginBottom: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1A1410",
    },
});