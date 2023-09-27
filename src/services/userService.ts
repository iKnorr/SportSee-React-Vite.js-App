import axios from 'axios';
import { translateSubject } from './chartService';

const BASE_URL = 'http://localhost:3000';

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

export type Session = {
  day: string;
  kilogram: number;
  calories: number;
};

export const fetchUserActivityData = async (userId: string | undefined) => {
  try {
    const response = await axios(`${BASE_URL}/user/${userId}/activity`);

    response?.data?.data?.sessions?.forEach((session: Session) => {
      const date = new Date(session.day);
      const day = date.getDate();
      session.day = day.toString();
    });

    const userSessions = response?.data?.data.sessions;

    return { userSessions };
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAverageSessionsData = async (
  userId: string | undefined
) => {
  try {
    const response = await axios(`${BASE_URL}/user/${userId}/average-sessions`);

    const averageSessions = response?.data?.data.sessions;

    return { averageSessions };
  } catch (error) {
    console.log(error);
  }
};

type Entry = {
  value: number;
  kind: number;
};

export const fetchUserPerformanceData = async (userId: string | undefined) => {
  try {
    const response = await axios(`${BASE_URL}/user/${userId}/performance`);

    const kind = response?.data?.data.kind;
    const data = response?.data?.data.data;
    const newData = data?.map((i: Entry, index: number) => {
      return {
        subject: translateSubject(kind[index + 1]),
        kind: i.kind,
        value: i.value,
      };
    });

    return { newData };
  } catch (error) {
    console.log(error);
  }
};
