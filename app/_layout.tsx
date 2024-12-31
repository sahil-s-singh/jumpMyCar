// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import 'react-native-reanimated';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FIREBASE_AUTH as auth } from '../FirebaseConfig';
// import { useColorScheme } from '@/components/useColorScheme';
// import React from 'react';
// import { ActivityIndicator, View } from 'react-native';

// export { ErrorBoundary } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: 'home',
// };

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   useEffect(() => {
//     if (error) {
//       throw error;
//     }
//   }, [error]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav loaded={loaded} />;
// }

// function RootLayoutNav({ loaded }: { loaded: boolean }) {
//   const colorScheme = useColorScheme();
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   // Check Firebase authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (currentUser: any) => {
//         setUser(currentUser);
//         setAuthLoading(false);
//       },
//       (error) => {
//         console.error('Error in onAuthStateChanged:', error);
//         setAuthLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // Hide splash screen after loading
//   useEffect(() => {
//     if (!authLoading && loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [authLoading, loaded]);

//   if (authLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack
//         screenOptions={{
//           headerShown: false, // Set to `false` for all screens
//         }}
//       >
//         {/* Public screens */}
//         <Stack.Screen name="auth/login" />
//         <Stack.Screen name="auth/register" />

//         {/* Private screens */}
//         {user && (
//           <>
//             <Stack.Screen name="home" />
//             <Stack.Screen name="profile" />
//           </>
//         )}
//       </Stack>
//     </ThemeProvider>
//   );
// }

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH as auth } from "../FirebaseConfig";
import { useColorScheme } from "@/components/useColorScheme";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import {
	registerForPushNotificationsAsync,
	setupNotificationHandlers,
} from "../services/notification.service";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "home",
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
	const [user, setUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(true);

	// Initialize notifications
	useEffect(() => {
		(async () => {
			const token = await registerForPushNotificationsAsync();
			if (token) {
				console.log("Expo Push Token:", token); // Log the token here
			}
			setupNotificationHandlers();
		})();
	}, []);

	// Check Firebase authentication state
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

	// Hide splash screen after loading
	useEffect(() => {
		if (!authLoading && loaded) {
			SplashScreen.hideAsync();
		}
	}, [authLoading, loaded]);

	// Show loading screen while waiting for authentication
	if (authLoading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	// Render application with navigation
	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack screenOptions={{ headerShown: false }}>
				{/* Public screens */}
				<Stack.Screen name="auth/login" />
				<Stack.Screen name="auth/register" />

				{/* Private screens */}
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
