import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, ActivityIndicator, Alert, ScrollView, SafeAreaView } from "react-native";
import { useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import userService from "../../services/userService";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const { register } = useAuth();
    const fileInputRef = useRef(null);

    const pickImageMobile = async () => {
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus !== "granted") {
            Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập thư viện ảnh");
            return;
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== "granted") {
            Alert.alert("Thông báo", "Bạn cần cấp quyền camera");
            return;
        }

        Alert.alert(
            "Chọn Ảnh Đại Diện",
            "Bạn muốn lấy ảnh từ đâu?",
            [
                {
                    text: "Thư Viện",
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 0.8,
                        });
                        if (!result.canceled) {
                            setAvatar(result.assets[0].uri);
                        }
                    },
                },
                {
                    text: "Chụp Ảnh",
                    onPress: async () => {
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 0.8,
                        });
                        if (!result.canceled) {
                            setAvatar(result.assets[0].uri);
                        }
                    },
                },
                { text: "Hủy", style: "cancel" },
            ]
        );
    };

    const pickImageWeb = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const validateForm = async () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Vui lòng nhập tên";
        } else if (!/^[A-Za-zÀ-ỹ\s'-]{2,50}$/.test(name)) {
            newErrors.name = "Tên chỉ được chứa chữ cái (2-50 ký tự)";
        }

        if (!phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        } else {
            const res = await userService.checkPhone(phone);
            if (res.exists) newErrors.phone = "Số điện thoại đã tồn tại";
        }

        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email không hợp lệ";
        } else {
            const res = await userService.checkEmail(email);
            if (res.exists) newErrors.email = "Email đã tồn tại";
        }

        if (!password.trim()) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (password.length < 6 || password.length > 51) {
            newErrors.password = "Mật khẩu: 6-51 ký tự";
        }

        if (!address.trim()) {
            newErrors.address = "Vui lòng nhập địa chỉ";
        } else if (address.length < 5 || address.length > 100) {
            newErrors.address = "Địa chỉ: 5-100 ký tự";
        } else if (!/^[A-Za-zÀ-ỹ0-9\s,.\-\/]+$/.test(address)) {
            newErrors.address = "Địa chỉ chứa ký tự không hợp lệ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        const valid = await validateForm();
        if (!valid) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("address", address);

        if (avatar) {
            if (Platform.OS === "web") {
                formData.append("avatar", avatar);
            } else {
                formData.append("avatar", {
                    uri: avatar,
                    name: "avatar.jpg",
                    type: "image/jpeg",
                });
            }
        } else {
            formData.append("avatar_url", `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=D4AF37&size=128`);
        }

        const success = await register(formData);
        setLoading(false);

        if (success) {
            router.replace("/(tabs)/profile");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color="#1A1410" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Tạo Tài Khoản</Text>
                        <Text style={styles.headerSubtitle}>Khám phá bộ sưu tập đồng hồ cao cấp</Text>
                    </View>
                </View>

                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity
                        style={styles.avatarWrapper}
                        onPress={() => {
                            if (Platform.OS === "web") {
                                fileInputRef.current?.click();
                            } else {
                                pickImageMobile();
                            }
                        }}
                    >
                        {Platform.OS === "web" ? (
                            avatar ? (
                                <Image
                                    source={{ uri: URL.createObjectURL(avatar) }}
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Feather name="user" size={48} color="#D4AF37" />
                                </View>
                            )
                        ) : (
                            avatar ? (
                                <Image
                                    source={{ uri: avatar }}
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Feather name="user" size={48} color="#D4AF37" />
                                </View>
                            )
                        )}
                        <View style={styles.cameraIcon}>
                            <Feather name="camera" size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.avatarHint}>Chọn ảnh đại diện</Text>
                    {Platform.OS === "web" && (
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={pickImageWeb}
                            style={{ display: "none" }}
                        />
                    )}
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    {/* Name Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tên Của Bạn</Text>
                        <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                            <Feather name="user" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên đầy đủ"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    {/* Phone Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số Điện Thoại</Text>
                        <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                            <Feather name="phone" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="0123456789"
                                placeholderTextColor="#999"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                            <Feather name="mail" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="email@example.com"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật Khẩu</Text>
                        <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                            <Feather name="lock" size={18} color="#D4AF37" />
                            <TextInput
                                style={styles.input}
                                placeholder="Ít nhất 6 ký tự"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={18}
                                    color="#D4AF37"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    {/* Address Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa Chỉ</Text>
                        <View style={[styles.inputWrapper, errors.address && styles.inputError]}>
                            <Feather name="map-pin" size={18} color="#D4AF37" />
                            <TextInput
                                style={[styles.input, { minHeight: 50 }]}
                                placeholder="Nhập địa chỉ đầy đủ"
                                placeholderTextColor="#999"
                                value={address}
                                onChangeText={setAddress}
                                multiline
                                numberOfLines={2}
                            />
                        </View>
                        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                    </View>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                    style={[styles.registerBtn, loading && styles.registerBtnDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Feather name="user-plus" size={18} color="#fff" />
                            <Text style={styles.registerBtnText}>Tạo Tài Khoản</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.loginSection}>
                    <Text style={styles.loginText}>Đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => router.push("/auth/LoginScreen")}>
                        <Text style={styles.loginLink}>Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    container: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        marginBottom: 12,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1410",
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#8B7355",
        marginTop: 2,
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 24,
    },
    avatarWrapper: {
        position: "relative",
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#D4AF37",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        elevation: 2,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
    avatarPlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF9F0",
        justifyContent: "center",
        alignItems: "center",
    },
    cameraIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#D4AF37",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    avatarHint: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "500",
    },
    formSection: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E8D4B8",
        backgroundColor: "#fff",
        gap: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: "#333",
    },
    inputError: {
        borderColor: "#FF3B30",
        backgroundColor: "#FFF3F1",
    },
    errorText: {
        fontSize: 12,
        color: "#FF3B30",
        marginTop: 4,
        fontWeight: "600",
    },
    registerBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
        marginBottom: 16,
        elevation: 2,
    },
    registerBtnDisabled: {
        opacity: 0.6,
    },
    registerBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    loginSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        fontSize: 14,
        color: "#8B7355",
    },
    loginLink: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D4AF37",
        textDecorationLine: "underline",
    },
});