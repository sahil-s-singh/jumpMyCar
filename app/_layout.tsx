import "react-native-reanimated";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import LocationUpdater from "@/components/LocationUpdater";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "auth/login",
};

// Prevent the splash screen from auto-hiding until setup is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	if (!loaded) return null;

	return <RootLayoutNav loaded={loaded} />;
}

function RootLayoutNav({ loaded }: { loaded: boolean }) {
	const colorScheme = useColorScheme();
	const { user, loading } = useAuthStore();

	LocationUpdater();

	useEffect(() => {
		if (!loading && loaded) {
			SplashScreen.hideAsync();
		}
	}, [loading, loaded]);

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="auth/login" />
				<Stack.Screen name="auth/register" />
				{user && (
					<>
						<Stack.Screen name="home" />
						<Stack.Screen name="profile" />
					</>
				)}
			</Stack>
		</ThemeProvider>
	);
}
