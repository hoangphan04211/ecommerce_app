import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#333",
          tabBarInactiveTintColor: "#007AFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            borderTopWidth: 1,
            borderTopColor: "#eee",
            backgroundColor: "#fff",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="docs"
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="file-text" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="product"
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="package" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="shopping-cart" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
