import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Register the device for push notifications
export async function registerForPushNotificationsAsync(): Promise<
	string | null
> {
	if (!Device.isDevice) {
		console.warn("Must use a physical device for Push Notifications");
		return null;
	}

	try {
		// Check the current permissions
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		console.log("Existing permission status:", existingStatus); // Log status here
		let finalStatus = existingStatus;

		// Request permissions if not already granted
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
			console.log("Requested permission status:", finalStatus); // Log updated status here
		}

		if (finalStatus !== "granted") {
			console.warn("Failed to get push token: Permissions not granted");
			return null;
		}

		// Get the push token
		const token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log("Expo Push Token:", token); // Log the token
		return token;
	} catch (error) {
		console.error("Error in registering for push notifications:", error);
		return null;
	}
}

// Setup notification handlers
export function setupNotificationHandlers() {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: false,
		}),
	});

	Notifications.addNotificationReceivedListener((notification) => {
		console.log("Notification Received:", notification);
	});

	Notifications.addNotificationResponseReceivedListener((response) => {
		console.log("Notification Clicked:", response);
	});
}
