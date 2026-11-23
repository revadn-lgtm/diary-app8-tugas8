
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          height: 68,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          borderRadius: 20,
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? "#2563EB" : "#9CA3AF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Tambah",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={focused ? "#2563EB" : "#9CA3AF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={focused ? "#2563EB" : "#9CA3AF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
