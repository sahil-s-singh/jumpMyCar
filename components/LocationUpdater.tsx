import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { saveUserLocation } from '@/services/locationService';
import { useAuthStore } from '@/store/authStore';


const LOCATION_TASK_NAME = 'background-location-task';


const LocationUpdater = () => {
const { user } = useAuthStore()

    useEffect(() => {
        
        TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
            try {
              const location: any = await Location.getCurrentPositionAsync({});
              console.log('Location updated:', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });

              user && await saveUserLocation(user.accessToken, { latitude: location.coords.latitude, longitude: location.coords.longitude });
          
              return BackgroundFetch.BackgroundFetchResult.NewData;
            } catch (error) {
              console.error('Error in background task:', error);
              return BackgroundFetch.BackgroundFetchResult.Failed;
            }
          });

        (async () => {
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus === 'granted') {
                const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus === 'granted') {
                    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                        accuracy: Location.Accuracy.Balanced,
                    });
                }
            }
        })();
    }, [])

    return;
};

export default LocationUpdater;
