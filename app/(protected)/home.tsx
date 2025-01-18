// app/home.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const handleRequestHelp = async () => {
    console.log('requested')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} className='text-sm'>Welcome to the Home Screen!</Text>
      <Button title="Request Help" onPress={() => handleRequestHelp()} />
      <Button
				title="Go to Map"
				onPress={() => router.push("/(protected)/MapScreen")} // Correct path
			/>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
});
