class UserInfo {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

class KeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;

  constructor(
    calorieCount: number,
    proteinCount: number,
    carbohydrateCount: number,
    lipidCount: number
  ) {
    this.calorieCount = calorieCount;
    this.proteinCount = proteinCount;
    this.carbohydrateCount = carbohydrateCount;
    this.lipidCount = lipidCount;
  }
}

export class UserMainData {
  id: number;
  userInfos: UserInfo;
  todayScore?: number;
  score?: number;
  keyData: KeyData;

  constructor(
    id: number,
    userInfos: UserInfo,
    keyData: KeyData,
    todayScore?: number,
    score?: number
  ) {
    this.id = id;
    this.userInfos = userInfos;
    this.keyData = keyData;
    this.todayScore = todayScore;
    this.score = score;
  }
}
