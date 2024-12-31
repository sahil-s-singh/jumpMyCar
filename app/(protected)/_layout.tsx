import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { useAuthStore } from "@/store/authStore";
import Header from "@/components/Header"; // Adjust the path as per your project structure

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || (!user && !loading)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Header />
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          {children}
        </Stack>
      </View>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
