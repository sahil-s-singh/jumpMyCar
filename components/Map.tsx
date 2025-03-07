import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function Map() {
    const [region, setRegion] = React.useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [locationFetched, setLocationFetched] = React.useState(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                let location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setLocationFetched(true);
            } else {
                Alert.alert(
                    "Permission Denied",
                    "Please enable location services for this app"
                );
            }
        };

        requestLocationPermission();
    }, []);

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            showsUserLocation={true}
            region={locationFetched ? region : undefined}
        >
            <Marker
                coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                }}
                title="You are here"
            />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
});
