import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import productService from "../../../services/productService";
import { IMAGE_URL } from "../../../services/config";
import { useCart } from "../../../contexts/CartContext";
import FlashSale from "../../../_components/FlashSale";
import JustForYou from "../../../_components/JustForYou";
import ProductRelated from "../../../_components/ProductRelated";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getById(id);
        setProduct(res?.product || null);
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
    setShowModal(false);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push("/cart");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Feather name="alert-circle" size={48} color="#ccc" />
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Container */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: IMAGE_URL + "/products/" + product.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Discount Badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-10%</Text>
          </View>

          {/* Wishlist Button */}
          <TouchableOpacity style={styles.wishBtn}>
            <Feather name="heart" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Product Name */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingBox}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Feather key={i} name="star" size={14} color="#D4AF37" fill="#D4AF37" />
              ))}
            </View>
            <Text style={styles.ratingText}>(256 đánh giá)</Text>
          </View>

          {/* Price Box */}
          <View style={styles.priceBoxContainer}>
            <View>
              <Text style={styles.priceSale}>
                {product.price.toLocaleString()}₫
              </Text>
              <Text style={styles.priceOriginal}>
                {product.price_discount.toLocaleString()}₫
              </Text>
            </View>
            <View style={styles.saveBadge}>
              <Text style={styles.saveText}>Tiết kiệm</Text>
              <Text style={styles.saveAmount}>
                {((product.price_discount - product.price) / 1000000).toFixed(1)}M
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>Chi Tiết Sản Phẩm</Text>
            <Text style={styles.desc}>{product.content}</Text>
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Feather name="shield" size={20} color="#D4AF37" />
              <View>
                <Text style={styles.infoTitle}>Bảo Hành Chính Hãng</Text>
                <Text style={styles.infoText}>2-5 năm</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Feather name="truck" size={20} color="#D4AF37" />
              <View>
                <Text style={styles.infoTitle}>Giao Hàng Miễn Phí</Text>
                <Text style={styles.infoText}>2-3 ngày làm việc</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Feather name="award" size={20} color="#D4AF37" />
              <View>
                <Text style={styles.infoTitle}>100% Chính Hãng</Text>
                <Text style={styles.infoText}>Đảm bảo chất lượng</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={handleAddToCart}
            >
              <Feather name="shopping-bag" size={18} color="#fff" />
              <Text style={styles.actionText}>Thêm Vào Giỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyNowBtn}
              onPress={handleBuyNow}
            >
              <Feather name="zap" size={18} color="#fff" />
              <Text style={styles.actionText}>Mua Ngay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Related Products */}
        <View style={styles.relatedSection}>
          <ProductRelated productId={product.id} />
        </View>

        {/* More Sections */}
        {/* <View style={styles.moreSection}>
          <FlashSale />
          <JustForYou />
        </View> */}
      </ScrollView>

      {/* Quantity Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn Số Lượng</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Product Info */}
            <View style={styles.modalProduct}>
              <Image
                source={{ uri: IMAGE_URL + "/products/" + product.image_url }}
                style={styles.modalImage}
              />
              <View style={styles.modalInfo}>
                <Text style={styles.modalName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.modalPrice}>
                  {product.price.toLocaleString()}₫
                </Text>
              </View>
            </View>

            {/* Quantity Section */}
            <View style={styles.quantitySection}>
              <Text style={styles.qtyLabel}>Số Lượng</Text>
              <View style={styles.qtyBox}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Feather name="minus" size={16} color="#D4AF37" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity((q) => q + 1)}
                >
                  <Feather name="plus" size={16} color="#D4AF37" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Total */}
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Tổng Cộng</Text>
              <Text style={styles.totalPrice}>
                {(product.price * quantity).toLocaleString()}₫
              </Text>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={confirmAddToCart}
            >
              <Feather name="shopping-bag" size={18} color="#fff" />
              <Text style={styles.confirmText}>Xác Nhận Thêm Vào Giỏ</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF5",
  },
  errorText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 280,
    backgroundColor: "#F9F6F1",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(26, 20, 16, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  wishBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  content: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 12,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#8B7355",
    fontWeight: "500",
  },
  priceBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFF9F0",
    borderRadius: 10,
  },
  priceSale: {
    fontSize: 20,
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: 4,
  },
  priceOriginal: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  saveBadge: {
    alignItems: "flex-end",
  },
  saveText: {
    fontSize: 11,
    color: "#8B7355",
    fontWeight: "600",
  },
  saveAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF3B30",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8D4B8",
    marginVertical: 16,
  },
  descSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  infoCards: {
    gap: 10,
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#FFF9F0",
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#D4AF37",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1410",
  },
  infoText: {
    fontSize: 12,
    color: "#8B7355",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  cartBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#D4AF37",
    gap: 8,
  },
  buyNowBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#FF3B30",
    gap: 8,
  },
  actionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  relatedSection: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  moreSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8D4B8",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1410",
  },
  modalProduct: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "#FFF9F0",
    borderRadius: 10,
    marginBottom: 16,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  modalInfo: {
    flex: 1,
    justifyContent: "center",
  },
  modalName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1410",
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4AF37",
  },
  quantitySection: {
    marginBottom: 16,
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 8,
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    minWidth: 40,
    textAlign: "center",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF9F0",
    borderRadius: 10,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8B7355",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D4AF37",
  },
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#D4AF37",
    gap: 8,
  },
  confirmText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});