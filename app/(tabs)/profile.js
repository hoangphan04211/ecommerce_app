import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { IMAGE_URL } from "../../services/config";

export default function Account() {
  const { user } = useAuth();
  const router = useRouter();

  // Nếu chưa đăng nhập
  if (!user) {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.emptyIcon}>
          <Feather name="user" size={64} color="#D4AF37" />
        </View>
        <Text style={styles.emptyTitle}>Bạn chưa đăng nhập</Text>
        <Text style={styles.emptySubtitle}>Vui lòng đăng nhập để tiếp tục</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/auth/LoginScreen")}
        >
          <Feather name="log-in" size={18} color="#fff" />
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/auth/RegisterScreen")}
        >
          <Feather name="user-plus" size={18} color="#D4AF37" />
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Nếu đã đăng nhập
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: IMAGE_URL + "/users/" + (user?.avatar || "default.jpg"),
            }}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>

          <View style={styles.headerIcons}>
            <Link href="/(tabsetting)/settings" asChild>
              <TouchableOpacity style={styles.settingIcon}>
                <Feather name="settings" size={20} color="#D4AF37" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Announcement */}
        <View style={styles.announcement}>
          <View style={styles.announcementContent}>
            <Feather name="gift" size={20} color="#D4AF37" />
            <View style={styles.announcementText}>
              <Text style={styles.announcementTitle}>Ưu Đãi Đặc Biệt</Text>
              <Text style={styles.announcementDesc}>
                Khám phá những bộ sưu tập mới nhất
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.announcementArrow}
            onPress={() => router.push("/")}
          >
            <Feather name="arrow-right" size={18} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        {/* My Orders Section */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersHeader}>
            <View style={styles.ordersTitle}>
              <Text style={styles.sectionTitle}>Đơn Hàng Của Tôi</Text>
              <Text style={styles.ordersSubtitle}>Theo dõi tình trạng</Text>
            </View>
            <TouchableOpacity
              style={styles.historyBtn}
              onPress={() => router.push("/userMe/orders/history")}
            >
              <Feather name="clock" size={16} color="#D4AF37" />
              <Text style={styles.historyText}>Lịch sử</Text>
            </TouchableOpacity>
          </View>

          {/* Order Status Cards */}
          <View style={styles.orderRow}>
            <TouchableOpacity style={styles.orderBtn}>
              <View style={styles.orderIconBox}>
                <Feather name="file-text" size={20} color="#D4AF37" />
              </View>
              <Text style={styles.orderText}>Chờ Xác Nhận</Text>
              <Text style={styles.orderCount}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderBtn}>
              <View style={styles.orderIconBox}>
                <Feather name="truck" size={20} color="#D4AF37" />
              </View>
              <Text style={styles.orderText}>Đang Giao</Text>
              <Text style={styles.orderCount}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.orderBtn}>
              <View style={styles.orderIconBox}>
                <Feather name="check-circle" size={20} color="#D4AF37" />
              </View>
              <Text style={styles.orderText}>Hoàn Thành</Text>
              <Text style={styles.orderCount}>0</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Đơn Hàng</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>2.4M</Text>
              <Text style={styles.statLabel}>Tổng Chi Tiêu</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Yêu Thích</Text>
            </View>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAF5",
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF9F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#E8D4B8",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8B7355",
    marginBottom: 24,
    textAlign: "center",
  },
  loginButton: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#D4AF37",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  registerButton: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  registerButtonText: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1410",
  },
  userEmail: {
    fontSize: 12,
    color: "#8B7355",
    marginTop: 4,
  },
  headerIcons: {
    padding: 8,
  },
  settingIcon: {
    padding: 8,
    backgroundColor: "#FFF9F0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  announcement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#FFF9F0",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#D4AF37",
  },
  announcementContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  announcementText: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1410",
  },
  announcementDesc: {
    fontSize: 11,
    color: "#8B7355",
    marginTop: 2,
  },
  announcementArrow: {
    padding: 8,
  },
  ordersSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  ordersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  ordersTitle: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1410",
  },
  ordersSubtitle: {
    fontSize: 11,
    color: "#8B7355",
    marginTop: 2,
  },
  historyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFF9F0",
    borderRadius: 8,
  },
  historyText: {
    fontSize: 12,
    color: "#D4AF37",
    fontWeight: "600",
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  orderBtn: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  orderIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  orderText: {
    fontSize: 12,
    color: "#1A1410",
    fontWeight: "600",
    marginBottom: 4,
  },
  orderCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4AF37",
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#D4AF37",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#8B7355",
    fontWeight: "500",
  },
  linksSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  linksContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8D4B8",
    overflow: "hidden",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8D4B8",
  },
  linkIcon: {
    width: 36,
    height: 36,
    backgroundColor: "#FFF9F0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8D4B8",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF3B30",
    gap: 8,
    backgroundColor: "#FFF3F1",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF3B30",
  },
});