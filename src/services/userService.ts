import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchUserData = async (
  userId: string | undefined,
  endpoint?: 'activity' | 'performance' | 'average-sessions'
) => {
  const endpointSegment = endpoint ? `${endpoint}` : '';

  try {
    const response = await axios(
      `${BASE_URL}/user/${userId}/${endpointSegment}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
