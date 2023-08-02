import { useEffect, useState } from 'react';
import styles from './UserPage.module.scss';
import { fetchUserData } from '../../services/userService';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';

type APIResponse = {
  data: {
    id: number;
    score: number;
    userInfos: {
      age: number;
      firstName: string;
      lastName: string;
    };
    keyData: {
      calorieCount: number;
      carbohydrateCount: number;
      lipidCount: number;
      proteinCount: number;
    };
  };
};

export const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<APIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId);
        setUserData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!userData) return null;

  const { id, userInfos, score, keyData } = userData.data;

  return (
    <>
      <Navbar>
        <div className={styles.mainContainer}>
          <div>{id}</div>
          <div>{userInfos.firstName}</div>
          <div>{userInfos.lastName}</div>
          <div>{score}</div>
          <div>{keyData.calorieCount}</div>
          <div>{keyData.carbohydrateCount}</div>
          <div>{keyData.lipidCount}</div>
          <div>{keyData.proteinCount}</div>
        </div>
      </Navbar>
    </>
  );
};
