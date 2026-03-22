import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, SafeAreaView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { IMAGE_URL } from "../../../services/config";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const { user, update, changeAvatar } = useAuth();
    const router = useRouter();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    const handleInputChange = (field, value) => {
        if (field === "name") setName(value);
        if (field === "email") setEmail(value);
        if (field === "phone") setPhone(value);
        if (field === "address") setAddress(value);
        setHasChanges(true);
    };

    const handleSave = async () => {
        if (!name.trim() || !email.trim() || !phone.trim()) {
            Toast.show({
                type: "error",
                text1: "Vui lòng điền đầy đủ thông tin",
                duration: 3000,
            });
            return;
        }

        setLoading(true);
        try {
            await update({ name, email, phone, address });
            Toast.show({
                type: "success",
                text1: "Cập nhật hồ sơ thành công",
                duration: 3000,
            });
            setHasChanges(false);
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Cập nhật hồ sơ thất bại",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        try {
            if (Platform.OS === "web") {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        await changeAvatar(file);
                        Toast.show({
                            type: "success",
                            text1: "Cập nhật ảnh đại diện thành công",
                            duration: 3000,
                        });
                    }
                };
                input.click();
            } else {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.8,
                });

                if (!result.canceled) {
                    const asset = result.assets[0];
                    const file = {
                        uri: asset.uri,
                        name: "avatar.jpg",
                        type: "image/jpeg",
                    };
                    await changeAvatar(file);
                    Toast.show({
                        type: "success",
                        text1: "Cập nhật ảnh đại diện thành công",
                        duration: 3000,
                    });
                }
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: "Lỗi cập nhật ảnh đại diện",
                duration: 3000,
            });
        }
    };

    const isFormValid = name.trim() && email.trim() && phone.trim();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={20} color="#1A1410" />
                        </TouchableOpacity>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerTitle}>Hồ Sơ Cá Nhân</Text>
                            <Text style={styles.headerSubtitle}>Cập nhật thông tin của bạn</Text>
                        </View>
                    </View>

                    {/* Avatar Section */}
                    <View style={styles.avatarBox}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={{
                                    uri: IMAGE_URL + "/users/" + (user?.avatar || "default.jpg"),
                                }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity
                                style={styles.editIcon}
                                onPress={pickImage}
                            >
                                <Feather name="camera" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.avatarHint}>Nhấn để thay đổi ảnh đại diện</Text>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formSection}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên Đầy Đủ</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedInput === "name" && styles.inputWrapperFocused,
                                    name && styles.inputWrapperFilled,
                                ]}
                            >
                                <Feather name="user" size={18} color="#D4AF37" />
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={(value) => handleInputChange("name", value)}
                                    placeholder="Nhập tên của bạn"
                                    placeholderTextColor="#999"
                                    onFocus={() => setFocusedInput("name")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedInput === "email" && styles.inputWrapperFocused,
                                    email && styles.inputWrapperFilled,
                                ]}
                            >
                                <Feather name="mail" size={18} color="#D4AF37" />
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(value) => handleInputChange("email", value)}
                                    placeholder="Nhập email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>

                        {/* Phone Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Số Điện Thoại</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedInput === "phone" && styles.inputWrapperFocused,
                                    phone && styles.inputWrapperFilled,
                                ]}
                            >
                                <Feather name="phone" size={18} color="#D4AF37" />
                                <TextInput
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={(value) => handleInputChange("phone", value)}
                                    placeholder="0123456789"
                                    placeholderTextColor="#999"
                                    keyboardType="phone-pad"
                                    onFocus={() => setFocusedInput("phone")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>

                        {/* Address Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Địa Chỉ</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedInput === "address" && styles.inputWrapperFocused,
                                    address && styles.inputWrapperFilled,
                                ]}
                            >
                                <Feather name="map-pin" size={18} color="#D4AF37" />
                                <TextInput
                                    style={[styles.input, { minHeight: 50 }]}
                                    value={address}
                                    onChangeText={(value) => handleInputChange("address", value)}
                                    placeholder="Nhập địa chỉ đầy đủ"
                                    placeholderTextColor="#999"
                                    multiline
                                    numberOfLines={2}
                                    onFocus={() => setFocusedInput("address")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Feather name="info" size={16} color="#D4AF37" />
                        <Text style={styles.infoText}>
                            Thông tin này sẽ được sử dụng để giao hàng và liên hệ với bạn
                        </Text>
                    </View>
                </ScrollView>

                {/* Save Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.saveBtn,
                            (!isFormValid || loading) && styles.saveBtnDisabled,
                        ]}
                        onPress={handleSave}
                        disabled={!isFormValid || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <>
                                <Feather name="check" size={18} color="#fff" />
                                <Text style={styles.saveText}>Lưu Thay Đổi</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    wrapper: {
        flex: 1,
        backgroundColor: "#FAFAF5",
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 120,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    backBtn: {
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
    avatarBox: {
        alignItems: "center",
        marginBottom: 28,
    },
    avatarWrapper: {
        position: "relative",
        width: 120,
        height: 120,
        marginBottom: 12,
    },
    avatar: {
        width: "100%",
        height: "100%",
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#D4AF37",
        backgroundColor: "#F9F6F1",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#D4AF37",
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#fff",
        elevation: 2,
    },
    avatarHint: {
        fontSize: 12,
        color: "#8B7355",
        fontWeight: "500",
    },
    formSection: {
        gap: 16,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 4,
    },
    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#1A1410",
        marginBottom: 8,
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
    inputWrapperFocused: {
        borderColor: "#D4AF37",
        backgroundColor: "#FFF9F0",
        borderWidth: 2,
    },
    inputWrapperFilled: {
        borderColor: "#D4AF37",
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: "#333",
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#FFF9F0",
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: "#D4AF37",
    },
    infoText: {
        fontSize: 12,
        color: "#8B7355",
        flex: 1,
        fontWeight: "500",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E8D4B8",
    },
    saveBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: "#D4AF37",
        gap: 8,
        elevation: 2,
    },
    saveBtnDisabled: {
        opacity: 0.5,
    },
    saveText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});