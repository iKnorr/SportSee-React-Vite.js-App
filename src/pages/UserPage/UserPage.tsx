import { useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { fetchUserData } from '../../services/userService';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { UserMainData } from '../../services/userModels';
import {
  ChartData,
  RadialChartScore,
} from '../../components/Charts/RadialChartScore/RadialChartScore';
import { BarChartActivity } from '../../components/Charts/BarChartActivity/BarChartActivity';
import { KeyDataCardsList } from '../../components/KeyDataCard/KeyDataCardsList';
import { LineChartAverageActivity } from '../../components/Charts/LineChartAverageActivity/LineChartAverageActivity';
import { RadarChartPerformance } from '../../components/Charts/RadarChartPerformance/RadarChartPerformance';

type APIResponse = {
  data: UserMainData;
};

export const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<APIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId);

        setUserData({
          data: new UserMainData(
            response?.data?.data.id,
            response?.data?.data.userInfos,
            response?.data?.data.keyData,
            response?.data?.data.todayScore,
            response?.data?.data.score
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  if (!userData) return null;

  const { userInfos, todayScore, score, keyData } = userData.data;

  const scoreValue = (todayScore ?? score) || 0;

  const chartData: ChartData = [
    {
      name: 'Score',
      value: scoreValue * 100,
      fill: 'red',
    },
  ];

  return (
    <Navbar>
      <div className={styles.mainContainer}>
        <div className={styles.greeting}>
          <span>Bonjour</span>
          <span className={styles.name}>{`${userInfos.firstName}`}</span>
        </div>
        <p className={styles.subHeading}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
        <div className={styles.contentContainer}>
          <div className={styles.chartsContainer}>
            <BarChartActivity userId={userId} />
            <div className={styles.bottomChartsContainer}>
              <LineChartAverageActivity userId={userId} />
              <RadarChartPerformance userId={userId} />
              {typeof (todayScore || score) === 'number' && (
                <RadialChartScore data={chartData} />
              )}
            </div>
          </div>
          <KeyDataCardsList keyData={keyData} />
        </div>
      </div>
    </Navbar>
  );
};
