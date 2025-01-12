const BASE_URL = 'http://localhost:3000';


export const postLocation = async (token: string, location: Location): Promise<any> => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${BASE_URL}/location`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({location}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to post location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting location:', error);
    throw error;
  }
};
