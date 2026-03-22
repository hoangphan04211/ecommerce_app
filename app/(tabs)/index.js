import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../_components/Header";
import BannerSlider from "../../_components/BannerSlider";
import CategoryList from "../../_components/CategoryList";
import TopProducts from "../../_components/TopProduct";
import ProductNew from "../../_components/ProductNew";
import FlashSale from "../../_components/FlashSale";
import MostPopular from "../../_components/MostPopular";
import JustForYou from "../../_components/JustForYou";

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Header />
        </View>

        {/* Banner Slider - Full width */}
        <View style={styles.bannerSection}>
          <BannerSlider />
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          {/* Category Grid */}
          <View style={styles.section}>
            <CategoryList />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Top Products */}
          <View style={styles.section}>
            <TopProducts />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Product New */}
          <View style={styles.section}>
            <ProductNew />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Flash Sale */}
          <View style={styles.section}>
            <FlashSale />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Most Popular */}
          <View style={styles.section}>
            <MostPopular />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Just For You */}
          <View style={styles.section}>
            <JustForYou />
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
    paddingBottom: 50,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  bannerSection: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    marginBottom: 4,
  },
  contentSection: {
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  section: {
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8D4B8",
    marginVertical: 8,
  },
});