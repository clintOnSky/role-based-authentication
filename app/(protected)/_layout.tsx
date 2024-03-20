import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constant from "expo-constants";

const HEIGHT = Constant.statusBarHeight;

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayoutNav />
    </GestureHandlerRootView>
  );
}

function DrawerLayoutNav() {
  // const navigation = useNavigation();
  return (
    <Drawer
      initialRouteName="(tabs)"
      // screenOptions={{
      //   header: (props) => (
      //     <TouchableOpacity
      //       style={{ paddingTop: HEIGHT }}
      //       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      //     >
      //       <Text>Hello</Text>
      //     </TouchableOpacity>
      //   ),
      // }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="tablet-portrait-outline"
              size={size}
              color={color}
            />
          ),
          title: "Home",
        }}
      />
    </Drawer>
  );
}
