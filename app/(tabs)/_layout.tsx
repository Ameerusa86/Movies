import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // Hides the header across all tabs
        tabBarActiveTintColor: "#FF6B00",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopWidth: 0,
          paddingVertical: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          paddingBottom: 4,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "index":
              iconName = "home";
              break;
            case "movies":
              iconName = "film";
              break;
            case "tv-shows":
              iconName = "tv";
              break;
            case "profile":
              iconName = "person";
              break;
            default:
              iconName = "home";
          }
          return (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="movies" options={{ title: "Movies" }} />
      <Tabs.Screen name="tv-shows" options={{ title: "TV Shows" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
