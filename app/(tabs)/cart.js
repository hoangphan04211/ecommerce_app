import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { IMAGE_URL } from "../../services/config";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter, Link } from "expo-router";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Giỏ Hàng</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{cartItems.length}</Text>
            </View>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.addressBox}>
          <View style={styles.addressHeader}>
            <Feather name="map-pin" size={16} color="#D4AF37" />
            <Text style={styles.addressLabel}>Địa Chỉ Giao Hàng</Text>
          </View>
          <View style={styles.addressRow}>
            <Text style={styles.addressText}>
              {user?.address || "Chưa có địa chỉ, vui lòng cập nhật trong Profile"}
            </Text>
            <Link href="/(tabsetting)/settings/address" asChild>
              <TouchableOpacity style={styles.editIcon}>
                <Feather name="edit-2" size={16} color="#D4AF37" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyBox}>
            <Feather name="shopping-bag" size={80} color="#E8D4B8" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn trống</Text>
            <TouchableOpacity
              style={styles.continueShopping}
              onPress={() => router.push("/product")}
            >
              <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsSection}>
            <Text style={styles.sectionTitle}>Sản Phẩm ({cartItems.length})</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemBox}>
                {/* Image */}
                <Image
                  source={{ uri: IMAGE_URL + "/products/" + item.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Info */}
                <View style={styles.itemInfo}>
                  <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  {item.color && item.size && (
                    <Text style={styles.detail}>
                      {item.color}, Size {item.size}
                    </Text>
                  )}
                  <Text style={styles.price}>
                    {item.price.toLocaleString()}₫
                  </Text>

                  {/* Quantity Controls */}
                  <View style={styles.actionRow}>
                    <View style={styles.quantityBox}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        style={styles.quantityBtn}
                      >
                        <Feather name="minus" size={14} color="#D4AF37" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        style={styles.quantityBtn}
                      >
                        <Feather name="plus" size={14} color="#D4AF37" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      style={styles.deleteBtn}
                    >
                      <Feather name="trash-2" size={16} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Subtotal */}
                <View style={styles.subtotalBox}>
                  <Text style={styles.subtotal}>
                    {(item.price * item.quantity).toLocaleString()}₫
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          {/* Divider */}
          <View style={styles.footerDivider} />

          {/* Summary */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tổng tiền hàng</Text>
              <Text style={styles.summaryValue}>
                {(total * 0.9).toLocaleString()}₫
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
              <Text style={styles.summaryValue}>Miễn phí</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalPrice}>{total.toLocaleString()}₫</Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/userMe/checkout")}
          >
            <Feather name="shopping-bag" size={18} color="#fff" />
            <Text style={styles.checkoutText}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FAFAF5"
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  contentContainer: {
    paddingBottom: 200,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E8D4B8",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1410",
  },
  countBadge: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  addressBox: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#FFF9F0",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#D4AF37",
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  addressLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8B7355",
    letterSpacing: 0.5,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressText: {
    fontSize: 13,
    color: "#333",
    flex: 1,
    fontWeight: "500",
  },
  editIcon: {
    marginLeft: 8,
    padding: 6,
  },
  itemsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  itemBox: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: "cover",
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1410",
    marginBottom: 4,
  },
  detail: {
    fontSize: 11,
    color: "#8B7355",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: 6,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  quantityBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 4,
  },
  deleteBtn: {
    padding: 6,
  },
  subtotalBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F9F6F1",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  subtotal: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D4AF37",
  },
  emptyBox: {
    alignItems: "center",
    marginVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
    fontWeight: "500",
  },
  continueShopping: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#D4AF37",
    borderRadius: 10,
  },
  continueShoppingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  footerDivider: {
    height: 1,
    backgroundColor: "#E8D4B8",
    marginBottom: 12,
  },
  summaryBox: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#8B7355",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E8D4B8",
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1410",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D4AF37",
  },
  checkoutButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});