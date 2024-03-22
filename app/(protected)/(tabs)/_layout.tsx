import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="one"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="one" options={{ title: "Home" }} />
      <Tabs.Screen name="two" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}
