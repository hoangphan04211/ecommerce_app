import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function Docs() {
  const [expandedSection, setExpandedSection] = useState("about");

  const sections = [
    {
      id: "about",
      title: "Về Chúng Tôi",
      icon: "info",
      content: [
        {
          subtitle: "Lịch Sử",
          text: "Với hơn 20 năm kinh nghiệm, chúng tôi là nhà cung cấp đồng hồ hàng đầu trong khu vực. Cam kết mang đến những chiếc đồng hồ chính hãng, sang trọng và bền vững.",
        },
        {
          subtitle: "Sứ Mệnh",
          text: "Cung cấp những chiếc đồng hồ cao cấp với giá tốt nhất, mang đến sự tinh tế và phong cách cho mỗi khách hàng.",
        },
      ],
    },
    {
      id: "brands",
      title: "Các Thương Hiệu",
      icon: "award",
      content: [
        {
          subtitle: "Rolex",
          text: "Biểu tượng của sự sang trọng và độ tin cậy. Các mẫu Submariner, Daytona, và Datejust là những lựa chọn hàng đầu.",
        },
        {
          subtitle: "Omega",
          text: "Thương hiệu Thụy Sĩ với lịch sử lâu đời. Nổi tiếng với dòng Seamaster và Speedmaster.",
        },
        {
          subtitle: "Patek Philippe",
          text: "Những chiếc đồng hồ cao cấp nhất với công nghệ và thiết kế vô song.",
        },
      ],
    },
    {
      id: "guide",
      title: "Hướng Dẫn Chọn",
      icon: "compass",
      content: [
        {
          subtitle: "Chọn Theo Phong Cách",
          text: "• Classic: Rolex, Omega\n• Sport: TAG Heuer, Breitling\n• Luxury: Patek Philippe, Audemars Piguet",
        },
        {
          subtitle: "Chọn Theo Giá",
          text: "• Entry Level: 5-10 triệu\n• Mid Range: 10-50 triệu\n• Premium: 50+ triệu",
        },
        {
          subtitle: "Chọn Theo Công Năng",
          text: "• Lặn: Submariner, Seamaster\n• Thể thao: Daytona, Speedmaster\n• Hàng ngày: Datejust, Constellation",
        },
      ],
    },
    {
      id: "warranty",
      title: "Bảo Hành & Bảo Dưỡng",
      icon: "shield",
      content: [
        {
          subtitle: "Bảo Hành",
          text: "Tất cả sản phẩm được bảo hành chính hãng từ 2-5 năm tùy theo thương hiệu. Đảm bảo 100% hàng chính hãng.",
        },
        {
          subtitle: "Dịch Vụ Bảo Dưỡng",
          text: "Cung cấp dịch vụ bảo dưỡng chuyên nghiệp tại showroom. Sử dụng linh kiện chính hãng, đảm bảo chất lượng.",
        },
      ],
    },
    {
      id: "faq",
      title: "Câu Hỏi Thường Gặp",
      icon: "help-circle",
      content: [
        {
          subtitle: "Làm sao để xác minh hàng chính hãng?",
          text: "Tất cả sản phẩm đều đi kèm giấy chứng chỉ quốc tế, hộp đầu đủ. Khách hàng có thể kiểm tra tại showroom trước khi mua.",
        },
        {
          subtitle: "Có hỗ trợ trả góp không?",
          text: "Có, chúng tôi hỗ trợ trả góp 0% lãi suất với các ngân hàng đối tác. Thời gian trả góp từ 3-24 tháng.",
        },
        {
          subtitle: "Đổi trả như thế nào?",
          text: "Khách hàng có 30 ngày để đổi trả nếu không hài lòng. Sản phẩm phải còn nguyên vẹn, chưa sử dụng.",
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <View style={styles.wrapper}>
      {/* Header Sang Trọng */}
      <View style={styles.headerContainer}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>⌚</Text>
          <Text style={styles.brandName}>HOANGPHAN LUXE</Text>
        </View>
        <Text style={styles.pageSubtitle}>Những Chiếc Đồng Hồ Cao Cấp Nhất Thế Giới</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Highlight Info */}
        <View style={styles.highlightSection}>
          <View style={styles.highlightCard}>
            <Feather name="check-circle" size={24} color="#D4AF37" />
            <Text style={styles.highlightText}>100% Chính Hãng</Text>
          </View>
          <View style={styles.highlightCard}>
            <Feather name="shield" size={24} color="#D4AF37" />
            <Text style={styles.highlightText}>Bảo Hành 2-5 Năm</Text>
          </View>
          <View style={styles.highlightCard}>
            <Feather name="truck" size={24} color="#D4AF37" />
            <Text style={styles.highlightText}>Giao Hàng Miễn Phí</Text>
          </View>
        </View>

        {/* Table of Contents */}
        <View style={styles.tocSection}>
          <Text style={styles.sectionLabel}>DANH MỤC</Text>
          <View style={styles.tocList}>
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.tocItem,
                  expandedSection === section.id && styles.tocItemActive,
                ]}
                onPress={() => toggleSection(section.id)}
              >
                <View style={styles.tocContent}>
                  <Feather
                    name={section.icon}
                    size={20}
                    color={expandedSection === section.id ? "#D4AF37" : "#8B7355"}
                  />
                  <Text
                    style={[
                      styles.tocText,
                      expandedSection === section.id && styles.tocTextActive,
                    ]}
                  >
                    {section.title}
                  </Text>
                </View>
                <Feather
                  name={expandedSection === section.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={expandedSection === section.id ? "#D4AF37" : "#999"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content Sections */}
        {sections.map((section) => (
          <View key={section.id}>
            {expandedSection === section.id && (
              <View style={styles.contentSection}>
                <View style={styles.contentHeader}>
                  <Feather name={section.icon} size={28} color="#D4AF37" />
                  <Text style={styles.contentTitle}>{section.title}</Text>
                </View>

                {section.content.map((item, idx) => (
                  <View key={idx} style={styles.contentItem}>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                    <View style={styles.textBox}>
                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>LIÊN HỆ VỚI CHÚNG TÔI</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Feather name="phone" size={20} color="#D4AF37" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Điện Thoại</Text>
                <Text style={styles.contactValue}>+84 (0) 123 456 789</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.contactItem}>
              <Feather name="map-pin" size={20} color="#D4AF37" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Địa Chỉ</Text>
                <Text style={styles.contactValue}>123 Nguyễn Huệ, HCM</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.contactItem}>
              <Feather name="mail" size={20} color="#D4AF37" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>hello@luxetimepiece.com</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 HOANGPHAN LUXE. All rights reserved.</Text>
          <Text style={styles.footerSubtext}>Bảo Hành Chính Hãng • Giao Hàng An Toàn • Tư Vấn Miễn Phí</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#FAFAF5" },
  headerContainer: {
    backgroundColor: "#1A1410",
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "center",
  },
  logoSection: { alignItems: "center", marginBottom: 12 },
  logoText: { fontSize: 48, marginBottom: 8 },
  brandName: { fontSize: 24, fontWeight: "bold", color: "#D4AF37", letterSpacing: 2 },
  pageSubtitle: { fontSize: 13, color: "#B8860B", letterSpacing: 1, fontStyle: "italic" },
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 20 },
  highlightSection: { flexDirection: "row", marginBottom: 28, gap: 10 },
  highlightCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8D4B8",
    elevation: 2,
  },
  highlightText: { fontSize: 11, color: "#333", marginTop: 8, fontWeight: "600", textAlign: "center" },
  tocSection: { marginBottom: 24 },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: "#8B7355", marginBottom: 12, letterSpacing: 1.5 },
  tocList: { gap: 10 },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#E8D4B8",
    elevation: 1,
  },
  tocItemActive: { backgroundColor: "#FFF9F0", borderLeftColor: "#D4AF37" },
  tocContent: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  tocText: { fontSize: 15, color: "#333", fontWeight: "500" },
  tocTextActive: { color: "#D4AF37", fontWeight: "700" },
  contentSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E8D4B8",
    elevation: 2,
  },
  contentHeader: { flexDirection: "row", alignItems: "center", marginBottom: 18, gap: 12 },
  contentTitle: { fontSize: 18, fontWeight: "700", color: "#1A1410", flex: 1 },
  contentItem: { marginBottom: 16 },
  subtitle: { fontSize: 14, fontWeight: "600", color: "#D4AF37", marginBottom: 8 },
  textBox: { backgroundColor: "#F9F6F1", borderRadius: 8, padding: 12, borderLeftWidth: 3, borderLeftColor: "#D4AF37" },
  text: { fontSize: 13, color: "#555", lineHeight: 20 },
  contactSection: { marginBottom: 28 },
  contactTitle: { fontSize: 13, fontWeight: "700", color: "#8B7355", marginBottom: 12, letterSpacing: 1.5 },
  contactCard: { backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#E8D4B8", overflow: "hidden", elevation: 2 },
  contactItem: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 14 },
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 12, color: "#8B7355", fontWeight: "600" },
  contactValue: { fontSize: 14, color: "#1A1410", fontWeight: "600", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#E8D4B8" },
  footer: { alignItems: "center", paddingVertical: 20, borderTopWidth: 1, borderTopColor: "#E8D4B8" },
  footerText: { fontSize: 12, color: "#8B7355", fontWeight: "600" },
  footerSubtext: { fontSize: 11, color: "#B8860B", marginTop: 6, letterSpacing: 0.5 },
});