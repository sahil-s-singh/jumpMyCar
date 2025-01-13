import { postLocation } from '../api/locationApi';

interface Location {
  latitude: number;
  longitude: number;
}

export const saveUserLocation = async (token: string, location: any): Promise<any> => {

  try {
    const response = await postLocation(token, location);
    console.log('Location successfully posted:', response);
    return response;
  } catch (error) {
    console.error('Error saving user location:', error);
    throw error;
  }
};
