import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import { IMAGE_URL } from "../../services/config";
import { useLocalSearchParams } from "expo-router";

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const { cat } = useLocalSearchParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(cat ? Number(cat) : null);
  const [limit, setLimit] = useState(8);
  const [hasMore, setHasMore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const fetchProducts = async (cat = selectedCat, lim = limit) => {
    try {
      const productData = await productService.getAll({
        limit: searchTerm.trim() !== "" ? null : lim,
        category_id: cat,
      });

      const list = Array.isArray(productData) ? productData : [];
      setProducts(list);

      if (searchTerm.trim() === "") {
        if (list.length >= 8 && list.length === lim) {
          setHasMore(true);
          setIsEnd(false);
        } else {
          setHasMore(false);
          if (list.length < 8 || list.length < lim) {
            setIsEnd(true);
          }
        }
      } else {
        setHasMore(false);
        setIsEnd(false);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
      setProducts([]);
      setHasMore(false);
      setIsEnd(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await categoryService.getAll();
        setCategories(Array.isArray(categoryData) ? categoryData : []);

        await fetchProducts(selectedCat, limit);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [selectedCat, limit]);



  const handleSelectCat = (catId) => {
    setSelectedCat(catId);
    setLimit(8);
  };

  const handleLoadMore = () => {
    const newLimit = limit + 4;
    setLimit(newLimit);
  };

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCat ? p.category_id === selectedCat : true;
    const name = removeVietnameseTones(p.name.toLowerCase());
    const search = removeVietnameseTones(searchTerm.toLowerCase());
    const matchSearch = name.includes(search);
    return matchCat && matchSearch;
  });

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      if (filteredProducts.length > 8) {
        setHasMore(true);
        setIsEnd(false);
      } else {
        setHasMore(false);
        setIsEnd(false);
      }
    }
  }, [searchTerm, filteredProducts]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Bộ Sưu Tập</Text>
          <Text style={styles.subtitle}>Những chiếc đồng hồ sang trọng</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={18} color="#D4AF37" />
        <TextInput
          style={styles.searchBox}
          placeholder="Tìm kiếm đồng hồ..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {searchTerm !== "" && (
          <TouchableOpacity onPress={() => setSearchTerm("")}>
            <Feather name="x" size={18} color="#D4AF37" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Bar */}
      <View style={styles.bar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.catBtn, selectedCat === null && styles.catBtnActive]}
            onPress={() => handleSelectCat(null)}
          >
            <View style={[styles.catImageAll, selectedCat === null && styles.catImageAllActive]}>
              <Feather name="grid" size={22} color="#fff" />
            </View>
            <Text
              style={[
                styles.catText,
                selectedCat === null && styles.catTextActive
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>

          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catBtn, selectedCat === cat.id && styles.catBtnActive]}
              onPress={() => handleSelectCat(cat.id)}
            >
              <Image
                source={{ uri: IMAGE_URL + "/categorys/" + cat.image_url }}
                style={[styles.catImage, selectedCat === cat.id && styles.catImageActive]}
              />
              <Text
                style={[
                  styles.catText,
                  selectedCat === cat.id && styles.catTextActive
                ]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <View style={styles.list}>
        {loading ? (
          <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.card}>
                    <Link href={`/product/${item.id}`}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: IMAGE_URL + "/products/" + item.image_url }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                        {item.price_discount > item.price && (
                          <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                              -{Math.round(((item.price_discount - item.price) / item.price_discount) * 100)}%
                            </Text>
                          </View>
                        )}
                        <TouchableOpacity style={styles.wishBtn}>
                          <Feather name="heart" size={18} color="#FF3B30" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                        <View style={styles.priceBox}>
                          <Text style={styles.priceSale}>
                            {item.price.toLocaleString()}₫
                          </Text>
                          {item.price_discount > item.price && (
                            <Text style={styles.priceOriginal}>
                              {item.price_discount.toLocaleString()}₫
                            </Text>
                          )}
                        </View>
                        <View style={styles.ratingBox}>
                          <Feather name="star" size={14} color="#D4AF37" fill="#D4AF37" />
                          <Text style={styles.ratingText}>4.8 (120)</Text>
                        </View>
                      </View>
                    </Link>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyBox}>
                  <Feather name="search" size={48} color="#ccc" />
                  <Text style={styles.notFoundText}>
                    {searchTerm.trim() !== ""
                      ? `Không tìm thấy "${searchTerm}"`
                      : "Không có sản phẩm"}
                  </Text>
                </View>
              )}
            </View>

            {hasMore && (
              <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore}>
                <Feather name="plus" size={20} color="#fff" />
                <Text style={styles.loadMoreText}>Xem thêm</Text>
              </TouchableOpacity>
            )}
            {isEnd && searchTerm === "" && (
              <Text style={styles.endText}>Đã hiển thị tất cả sản phẩm</Text>
            )}

            <View style={{ height: 20 }} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF5",
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  // Header
  header: {
    marginBottom: 16,
  },
  titleSection: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1410",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#8B7355",
    letterSpacing: 0.5,
  },

  // Search Bar
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  searchBox: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    color: "#333",
  },

  // Filter Bar
  bar: {
    marginBottom: 16,
  },
  catBtn: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 12,
    paddingVertical: 4,
    width: 70,
    height: 88,
  },
  catBtnActive: {
    opacity: 1,
  },
  catImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#E8D4B8",
  },
  catImageActive: {
    borderColor: "#D4AF37",
    borderWidth: 3,
  },
  catImageAll: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#8B7355",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E8D4B8",
  },
  catImageAllActive: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  catText: {
    fontSize: 11,
    color: "#8B7355",
    textAlign: "center",
    marginTop: 6,
    fontWeight: "500",
  },
  catTextActive: {
    fontWeight: "700",
    color: "#D4AF37",
  },

  // Product List
  list: {
    flex: 1,
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
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E8D4B8",
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 150,
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
    fontSize: 12,
    fontWeight: "700",
  },
  wishBtn: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8D4B8",
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    color: "#1A1410",
    marginBottom: 6,
    fontWeight: "600",
    height: 32,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  priceSale: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4AF37",
  },
  priceOriginal: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: "#8B7355",
    fontWeight: "500",
  },

  loadMoreBtn: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#D4AF37",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  endText: {
    textAlign: "center",
    color: "#999",
    marginBottom: 20,
    fontSize: 13,
    fontStyle: "italic",
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
  },
  notFoundText: {
    textAlign: "center",
    color: "#999",
    marginTop: 12,
    fontSize: 14,
    fontStyle: "italic",
  },
});