import React, { useRef, useState, useEffect } from "react";
import { Animated, Image, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import bannerService from "../services/bannerService";
import { IMAGE_URL } from "../services/config";

const { width } = Dimensions.get("window");

export default function BannerSlider() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await bannerService.getAll();
                setBanners(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Lỗi tải banner:", error);
                setBanners([]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (banners.length > 0) {
                index = (index + 1) % banners.length;
                setCurrentIndex(index);
                scrollRef.current?.scrollTo({ x: index * width, animated: true });
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [banners]);

    const handlePrevious = () => {
        const newIndex = (currentIndex - 1 + banners.length) % banners.length;
        setCurrentIndex(newIndex);
        scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
    };

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % banners.length;
        setCurrentIndex(newIndex);
        scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
    };

    if (banners.length === 0) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.placeholderImage} />
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {/* Banner Container */}
            <View style={styles.sliderContainer}>
                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={width}
                    snapToAlignment="center"
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(index);
                    }}
                >
                    {banners.map((banner, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image
                                source={{ uri: `${IMAGE_URL}/banners/${banner.image_url}` }}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </Animated.ScrollView>

                {/* Navigation Buttons */}
                {banners.length > 1 && (
                    <>
                        <TouchableOpacity
                            style={[styles.navBtn, styles.navBtnLeft]}
                            onPress={handlePrevious}
                        >
                            <Feather name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.navBtn, styles.navBtnRight]}
                            onPress={handleNext}
                        >
                            <Feather name="chevron-right" size={20} color="#fff" />
                        </TouchableOpacity>
                    </>
                )}

                {/* Counter */}
                <View style={styles.counter}>
                    <Text style={styles.counterText}>
                        {currentIndex + 1} / {banners.length}
                    </Text>
                </View>
            </View>

            {/* Dots Indicator */}
            <View style={styles.dotsContainer}>
                {banners.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 24, 8],
                        extrapolate: "clamp",
                    });
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ["#D4AF37", "#D4AF37", "#D4AF37"],
                        extrapolate: "clamp",
                    });
                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: "clamp",
                    });
                    return (
                        <Animated.View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    width: dotWidth,
                                    backgroundColor: dotColor,
                                    opacity: dotOpacity,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const { Text } = require("react-native");

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
    },
    sliderContainer: {
        position: "relative",
    },
    imageWrapper: {
        width: width,
        height: 200,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    placeholderImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#F9F6F1",
        borderRadius: 12,
    },
    navBtn: {
        position: "absolute",
        top: "50%",
        transform: [{ translateY: -20 }],
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(26, 20, 16, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    navBtnLeft: {
        left: 12,
    },
    navBtnRight: {
        right: 12,
    },
    counter: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "rgba(26, 20, 16, 0.7)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    counterText: {
        color: "#D4AF37",
        fontSize: 12,
        fontWeight: "700",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
});