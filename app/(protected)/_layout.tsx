import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useColorScheme, View, ActivityIndicator } from "react-native";
import { FIREBASE_AUTH as auth } from '../../FirebaseConfig';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser: any) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      (error) => {
        console.error("Error in onAuthStateChanged:", error);
        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        />
        {children}
      </Stack>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
