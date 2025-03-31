import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	Alert,
	ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";

export default function HelpRequest() {
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	// State for the radius in kilometers (default to 5km)
	const [radius, setRadius] = useState(5);

	// Request location permissions and fetch current location
	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				setLoading(false);
				return;
			}
			try {
				const loc = await Location.getCurrentPositionAsync({});
				setLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
				});
			} catch (error) {
				setErrorMsg("Error fetching location");
			}
			setLoading(false);
		})();
	}, []);

	// Simulated help request trigger with the radius value
	const handleHelpRequest = () => {
		if (!location) {
			Alert.alert("Error", "Location data is not available.");
			return;
		}
		// Here you would call your backend API with the location and radius,
		// so the backend can notify only users within the specified radius.
		// Example: sendHelpRequest({ location, radius, userId, pushToken });
		Alert.alert(
			"Help Request Sent",
			`Your request has been sent to nearby users within ${radius} km.`
		);
	};

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
				<Text>Fetching your location...</Text>
			</View>
		);
	}

	if (errorMsg) {
		return (
			<View style={styles.center}>
				<Text>{errorMsg}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: location!.latitude,
					longitude: location!.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					coordinate={{
						latitude: location!.latitude,
						longitude: location!.longitude,
					}}
					title="Your Location"
					description="You are here"
				/>
			</MapView>

			<View style={styles.controls}>
				<Text style={styles.label}>Notification Radius: {radius} km</Text>
				<Slider
					style={styles.slider}
					minimumValue={1}
					maximumValue={20}
					step={1}
					value={radius}
					onValueChange={setRadius}
					minimumTrackTintColor="#1E90FF"
					maximumTrackTintColor="#d3d3d3"
				/>
				<Button title="Need Help" onPress={handleHelpRequest} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: { flex: 1 },
	controls: {
		position: "absolute",
		bottom: 30,
		left: 20,
		right: 20,
		backgroundColor: "rgba(255,255,255,0.9)",
		borderRadius: 10,
		padding: 15,
		alignItems: "center",
	},
	label: { marginBottom: 10, fontSize: 16, fontWeight: "bold" },
	slider: { width: "100%", height: 40, marginBottom: 15 },
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
