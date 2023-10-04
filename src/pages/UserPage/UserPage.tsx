import { useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { fetchUserData } from '../../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import {
  ChartData,
  RadialChartScore,
} from '../../components/Charts/RadialChartScore/RadialChartScore';
import { BarChartActivity } from '../../components/Charts/BarChartActivity/BarChartActivity';
import { KeyDataCardsList } from '../../components/KeyDataCard/KeyDataCardsList';
import { LineChartAverageActivity } from '../../components/Charts/LineChartAverageActivity/LineChartAverageActivity';
import { RadarChartPerformance } from '../../components/Charts/RadarChartPerformance/RadarChartPerformance';
import { DataMapper } from '../../services/dataMapper';

type UserKeyData = {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
};

type UserMainDataType = {
  firstName: string;
  keyData: UserKeyData;
  todayScore?: number;
  score?: number;
  chartData: ChartData;
};

export const UserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<UserMainDataType | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId);
        setUserData(DataMapper.transformMainUserData(response));
      } catch (error) {
        console.log(error);
        navigate('*');
      }
    };
    fetchData();
  }, [userId]);

  if (!userData) return null;

  const { firstName, score, chartData, keyData } = userData;

  return (
    <Navbar>
      <div className={styles.mainContainer}>
        <div className={styles.greeting}>
          <span>Bonjour</span>
          <span className={styles.name}>{`${firstName}`}</span>
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
              {typeof score === 'number' && (
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
