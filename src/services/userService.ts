import axios from 'axios';
import {
  mockUserActivity,
  mockUserAverageSessions,
  mockUserData,
  mockUserPerformance,
} from '../data/mockData';

const BASE_URL = 'http://localhost:3000';

const useMockData = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createApiResponse = (data: any) => {
  if (!data) throw new Error('No data available!');

  return {
    data: {
      data: {
        ...data,
      },
    },
  };
};

export const fetchUserData = async (
  userId: string | undefined,
  endpoint?: 'activity' | 'performance' | 'average-sessions'
) => {
  const endpointSegment = endpoint ? `${endpoint}` : '';

  if (useMockData) {
    switch (endpoint) {
      case 'activity':
        return createApiResponse(mockUserActivity.find(data => data?.userId));
      case 'performance':
        return createApiResponse(
          mockUserPerformance.find(data => data?.userId)
        );
      case 'average-sessions':
        return createApiResponse(
          mockUserAverageSessions.find(data => data?.userId)
        );
      default:
        return createApiResponse(
          mockUserData.find(data => data?.id === Number(userId))
        );
    }
  } else {
    // Fetch actual data from the API
    try {
      const response = await axios(
        `${BASE_URL}/user/${userId}/${endpointSegment}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
