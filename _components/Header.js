import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {/* Shop title */}
                <Text style={styles.title}>Shop</Text>

                <View style={styles.searchBar}>
                    <Feather name="search" size={16} color="#333" />
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                    <TouchableOpacity>
                        <Feather name="camera" size={18} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 36,
        flex: 1,
        marginLeft: 12,
    },
    input: {
        flex: 1,
        marginLeft: 6,
        fontSize: 14,
        color: "#333",
    },
});
