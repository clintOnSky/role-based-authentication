import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constant from "expo-constants";
import { Role, useAuth } from "@/context/authContext";

const HEIGHT = Constant.statusBarHeight;

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayoutNav />
    </GestureHandlerRootView>
  );
}

function DrawerLayoutNav() {
  const { authState } = useAuth();

  return (
    <Drawer initialRouteName="(tabs)">
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: "Tabs Area",
          drawerLabel: "Tabs",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="tablet-portrait-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="admin"
        redirect={authState?.role !== Role.ADMIN}
        options={{
          headerTitle: "Admin Area",
          drawerLabel: "Admin",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cog-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="news"
        redirect={authState?.role !== Role.USER}
        options={{
          headerTitle: "News Area",
          drawerLabel: "News",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
