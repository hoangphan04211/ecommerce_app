import { View, Text, StyleSheet, Image } from "react-native";

export default function ProductCard({ item }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.priceBox}>
                <Text style={styles.priceDiscount}>
                    {item.price.toLocaleString()}₫
                </Text>
                <Text style={styles.priceOriginal}>
                    {item.price_discount.toLocaleString()}₫
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        color: "#333",
    },
    content: {
        fontSize: 14,
        color: "#666",
        marginVertical: 4,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    priceDiscount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007AFF",
        marginRight: 8,
    },
    priceOriginal: {
        fontSize: 14,
        color: "#999",
        textDecorationLine: "line-through",
    },
});
