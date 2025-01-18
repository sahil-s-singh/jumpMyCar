import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { registerForPushNotificationsAsync } from "../services/notification.service";

export default function NotificationTest() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const pushToken = await registerForPushNotificationsAsync();
			setToken(pushToken);
		})();
	}, []);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ fontSize: 16, marginBottom: 20 }}>Push Token:</Text>
			<Text selectable>{token || "Token not available yet"}</Text>
			<Button
				title="Request Token Again"
				onPress={async () => {
					const pushToken = await registerForPushNotificationsAsync();
					setToken(pushToken);
				}}
			/>
		</View>
	);
}
