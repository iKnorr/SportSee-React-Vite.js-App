export const formatDay = (day: number) => {
  switch (day) {
    case 1:
      return 'L';
    case 2:
      return 'M';
    case 3:
      return 'M';
    case 4:
      return 'J';
    case 5:
      return 'V';
    case 6:
      return 'S';
    case 7:
      return 'D';
    default:
      return '';
  }
};

export const translateSubject = (word: string) => {
  if (word === 'cardio') {
    return 'Cardio';
  } else if (word === 'energy') {
    return 'Energie';
  } else if (word === 'endurance') {
    return 'Endurance';
  } else if (word === 'strength') {
    return 'Force';
  } else if (word === 'speed') {
    return 'Vitesse';
  } else if (word === 'intensity') {
    return 'Intensité';
  }
};
