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

export const fetchMainUserData = async (userId: string | undefined) => {
  try {
    const response = await axios(`${BASE_URL}/user/${userId}`);

    const firstName = response?.data?.data.userInfos.firstName;
    const keyData = response?.data?.data.keyData;
    const score = response?.data?.data.todayScore ?? response?.data?.data.score;

    return { firstName, keyData, score };
  } catch (error) {
    console.log(error);
  }
};
