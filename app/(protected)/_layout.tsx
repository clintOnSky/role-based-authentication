import { Role, useAuth } from "@/tutorial/context/auth";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  const { auth } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName="(tabs)">
        <Drawer.Screen name="(tabs)" />
        <Drawer.Screen name="newfeed" redirect={auth?.role === Role.ADMIN} />
        <Drawer.Screen name="admin" redirect={auth?.role === Role.USER} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
