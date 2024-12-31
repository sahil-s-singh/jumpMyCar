import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationPayload {
	title: string;
	body: string;
	data?: Record<string, string>;
}

export async function subscribeToTopic(topic: string) {
	try {
		await messaging().subscribeToTopic(topic);
		console.log("Subscribed to topic:", topic);
	} catch (error) {
		console.error("Error subscribing to topic:", error);
	}
}

export async function unsubscribeFromTopic(topic: string) {
	try {
		await messaging().unsubscribeFromTopic(topic);
		console.log("Unsubscribed from topic:", topic);
	} catch (error) {
		console.error("Error unsubscribing from topic:", error);
	}
}

// Function to get the FCM token
export async function getFCMToken() {
	try {
		const fcmToken = await messaging().getToken();
		await AsyncStorage.setItem("fcmToken", fcmToken);
		return fcmToken;
	} catch (error) {
		console.error("Error getting FCM token:", error);
		return null;
	}
}

// Function to handle incoming notifications
export function setupNotificationListeners() {
	// Foreground messages
	messaging().onMessage(async (remoteMessage) => {
		console.log("Received foreground message:", remoteMessage);
		// Handle the notification here (e.g., show a local notification)
	});

	// Background/quit state messages
	messaging().setBackgroundMessageHandler(async (remoteMessage) => {
		console.log("Received background message:", remoteMessage);
		// Handle the notification here
	});
}
