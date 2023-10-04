import axios from 'axios';
import {
  mockUserActivity,
  mockUserAverageSessions,
  mockUserData,
  mockUserPerformance,
} from '../data/mockData';

const BASE_URL = 'http://localhost:3000';

const useMockData = false;

export const fetchUserData = async (
  userId: string | undefined,
  endpoint?: 'activity' | 'performance' | 'average-sessions'
) => {
  const endpointSegment = endpoint ? `${endpoint}` : '';

  if (useMockData) {
    switch (endpoint) {
      case 'activity':
        return mockUserActivity.find(data => data.userId);
      case 'performance':
        return mockUserPerformance.find(data => data.userId);
      case 'average-sessions':
        return mockUserAverageSessions.find(data => data.userId);
      default:
        return mockUserData.find(data => data.id === Number(userId));
    }
  } else {
    // Fetch actual data from the API
    try {
      const response = await axios(
        `${BASE_URL}/user/${userId}/${endpointSegment}`
      );

      return response?.data.data;
    } catch (error) {
      console.log(error);
    }
  }
};
