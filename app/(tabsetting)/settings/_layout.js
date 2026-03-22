import { Tabs } from "expo-router";

export default function SettingsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,              // ẩn header mặc định
                tabBarStyle: { display: "none" } // ẩn tab bar
            }}
        />
    );
}
