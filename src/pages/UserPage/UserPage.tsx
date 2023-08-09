import { useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { fetchUserData } from '../../services/userService';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { UserMainData } from '../../services/userModels';
import {
  ChartData,
  RadialChartScore,
} from '../../components/RadialChartScore/RadialChartScore';

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
        console.log(response, 'RESPONSE');
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

  const { id, userInfos, todayScore, score, keyData } = userData.data;
  console.log(userData);

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
        {typeof (todayScore || score) === 'number' && (
          <RadialChartScore data={chartData} />
        )}
        <div>{id}</div>
        <div>{userInfos.lastName}</div>
        <div>{todayScore}</div>
        <div>{keyData.calorieCount}</div>
        <div>{keyData.carbohydrateCount}</div>
        <div>{keyData.lipidCount}</div>
        <div>{keyData.proteinCount}</div>
      </div>
    </Navbar>
  );
};
