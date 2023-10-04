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
  public static transformMainUserData({
    userInfos,
    keyData: kData,
    todayScore,
    score,
  }: any) {
    const firstName = userInfos.firstName;
    const keyData = kData;
    const scoreTodayScore = todayScore ?? score;

    const scoreValue = scoreTodayScore || 0;

    const chartData: ChartData = [
      {
        name: 'Score',
        value: scoreValue * 100,
        fill: 'red',
      },
    ];

    return { firstName, keyData, chartData, score };
  }

  public static transformUserActicityData({ sessions }: any) {
    sessions?.forEach((session: Session) => {
      const date = new Date(session.day);
      const day = date.getDate();
      session.day = day.toString();
    });

    const userSessions = sessions;

    return { userSessions };
  }

  public static transformUserAverageSessionsData({ sessions }: any) {
    const averageSessions = sessions;

    return { averageSessions };
  }

  public static transformUserPerformanceData({ kind: k, data: d }: any) {
    const kind = k;
    const data = d;
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
