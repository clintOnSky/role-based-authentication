import { AuthProvider, useAuth } from "@/context/jwtAuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { router, useSegments } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(index)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const segments = useSegments();
  const inAuthGroup = segments[0] !== "(protected)";
  const { authState } = useAuth();

  // if (true) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "red",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <ActivityIndicator size={40} />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   const checkAuth = () => {
  //     if (!authState?.user && !inAuthGroup) {
  //       console.log("Not authenticated but in group, ");
  //       router.replace("/");
  //     } else if (authState?.user) {
  //       console.log("Authenticated");
  //       router.replace("/(protected)/(tabs)/one");
  //     }
  //   };
  //   checkAuth();
  // }, [authState]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </SafeAreaView>
    </>
  );
}
