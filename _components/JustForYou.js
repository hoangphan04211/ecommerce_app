import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

const products = [
    {
        id: 1,
        name: "Rolex Submariner",
        description: "Đồng hồ lặn cao cấp, chống nước 300m",
        price: "85,000,000₫",
        originalPrice: "95,000,000₫",
        discount: 10,
        rating: 4.9,
        reviews: 256,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
    {
        id: 2,
        name: "Omega Seamaster",
        description: "Thương hiệu Thụy Sĩ, thiết kế sang trọng",
        price: "65,000,000₫",
        originalPrice: "72,000,000₫",
        discount: 10,
        rating: 4.8,
        reviews: 189,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
    {
        id: 3,
        name: "TAG Heuer Carrera",
        description: "Chronograph thể thao chuyên nghiệp",
        price: "45,000,000₫",
        originalPrice: "50,000,000₫",
        discount: 10,
        rating: 4.7,
        reviews: 142,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
    {
        id: 4,
        name: "Patek Philippe",
        description: "Đồng hồ cao cấp nhất thế giới",
        price: "120,000,000₫",
        originalPrice: "135,000,000₫",
        discount: 11,
        rating: 5.0,
        reviews: 98,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
    {
        id: 5,
        name: "Breitling Navitimer",
        description: "Đồng hồ phi công huyền thoại",
        price: "55,000,000₫",
        originalPrice: "62,000,000₫",
        discount: 11,
        rating: 4.8,
        reviews: 167,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
    {
        id: 6,
        name: "Audemars Piguet",
        description: "Royal Oak - biểu tượng xa xỉ",
        price: "110,000,000₫",
        originalPrice: "125,000,000₫",
        discount: 12,
        rating: 4.9,
        reviews: 203,
        img: require("../assets/images/banners/banner-large-image2.jpg"),
    },
];

export default function JustForYou() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>Dành Cho Bạn</Text>
                    <Text style={styles.subtitle}>Những sản phẩm được đề xuất riêng</Text>
                </View>
                <View style={styles.headerBadge}>
                    <Text style={styles.badgeText}>⭐</Text>
                </View>
            </View>

            {/* Product grid */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {products.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card}>
                            {/* Image Container */}
                            <View style={styles.imageContainer}>
                                <Image source={item.img} style={styles.image} />

                                {/* Discount Badge */}
                                <View style={styles.discountBadge}>
                                    <Text style={styles.discountText}>-{item.discount}%</Text>
                                </View>

                                {/* Wishlist Button */}
                                <TouchableOpacity style={styles.wishBtn}>
                                    <Feather name="heart" size={18} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>

                            {/* Info */}
                            <View style={styles.info}>
                                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                                <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

                                {/* Rating */}
                                <View style={styles.ratingBox}>
                                    <View style={styles.stars}>
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                        <Feather name="star" size={12} color="#D4AF37" fill="#D4AF37" />
                                    </View>
                                    <Text style={styles.ratingText}>({item.reviews})</Text>
                                </View>

                                {/* Price */}
                                <View style={styles.priceBox}>
                                    <Text style={styles.price}>{item.price}</Text>
                                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                                </View>
                            </View>

                            {/* Add to Cart Button */}
                            <TouchableOpacity style={styles.addBtn}>
                                <Feather name="shopping-bag" size={16} color="#fff" />
                                <Text style={styles.addBtnText}>Thêm vào giỏ</Text>
                            </TouchableOpacity>
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
        flex: 1,
        paddingHorizontal: 12,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
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
    headerBadge: {
        width: 50,
        height: 50,
        backgroundColor: "#FFF9F0",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E8D4B8",
    },
    badgeText: {
        fontSize: 24,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        elevation: 2,
    },
    imageContainer: {
        width: "100%",
        height: 160,
        backgroundColor: "#F9F6F1",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    discountBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        backgroundColor: "#FF3B30",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    discountText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    wishBtn: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 34,
        height: 34,
        backgroundColor: "#fff",
        borderRadius: 17,
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
        marginBottom: 8,
        gap: 4,
    },
    stars: {
        flexDirection: "row",
        gap: 2,
    },
    ratingText: {
        fontSize: 10,
        color: "#999",
        marginLeft: 2,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
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
        flexDirection: "row",
        backgroundColor: "#D4AF37",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    addBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});