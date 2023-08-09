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
import { KeyDataCard } from '../../components/KeyDataCard/KeyDataCard';
import { Calories } from '../../components/icons/Calories';
import { Protein } from '../../components/icons/Protein';
import { Carbs } from '../../components/icons/Carbs';
import { Fat } from '../../components/icons/Fat';
import { BarChartActivity } from '../../components/BarChartActivity/BarChartActivity';

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

  const { userInfos, todayScore, score, keyData } = userData.data;
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
        <div>
          <div className={styles.greeting}>
            <span>Bonjour</span>
            <span className={styles.name}>{`${userInfos.firstName}`}</span>
          </div>
          <p className={styles.subHeading}>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </div>
        <div className={styles.contentContainer}>
          <div>
            <BarChartActivity userId={userId} />
            {typeof (todayScore || score) === 'number' && (
              <RadialChartScore data={chartData} />
            )}
          </div>
          <div className={styles.keyDataContainer}>
            <KeyDataCard
              dietaryTypes="Calories"
              icon={<Calories />}
              amount={`${keyData.calorieCount}kCal`}
            />
            <KeyDataCard
              dietaryTypes="Proteines"
              icon={<Protein />}
              amount={`${keyData.proteinCount}g`}
            />
            <KeyDataCard
              dietaryTypes="Glucides"
              icon={<Carbs />}
              amount={`${keyData.carbohydrateCount}g`}
            />
            <KeyDataCard
              dietaryTypes="Lipides"
              icon={<Fat />}
              amount={`${keyData.lipidCount}kCal`}
            />
          </div>
        </div>
      </div>
    </Navbar>
  );
};
