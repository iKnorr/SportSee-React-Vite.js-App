import { ChartData } from '../components/Charts/RadialChartScore/RadialChartScore';
import { translateSubject } from './chartService';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Session = {
  day: string;
  kilogram: number;
  calories: number;
};

type Entry = {
  value: number;
  kind: number;
};

export class DataMapper {
  public static transformMainUserData(response: any) {
    const firstName = response?.data?.data.userInfos.firstName;
    const keyData = response?.data?.data.keyData;
    const score = response?.data?.data.todayScore ?? response?.data?.data.score;

    const scoreValue = score || 0;

    const chartData: ChartData = [
      {
        name: 'Score',
        value: scoreValue * 100,
        fill: 'red',
      },
    ];

    return { firstName, keyData, chartData, score };
  }

  public static transformUserActicityData(response: any) {
    response?.data?.data?.sessions?.forEach((session: Session) => {
      const date = new Date(session.day);
      const day = date.getDate();
      session.day = day.toString();
    });

    const userSessions = response?.data?.data?.sessions;

    return { userSessions };
  }

  public static transformUserAverageSessionsData(response: any) {
    const averageSessions = response?.data?.data?.sessions;

    return { averageSessions };
  }

  public static transformUserPerformanceData(response: any) {
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
  }
}
