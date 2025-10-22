export interface Hours {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

/*const parseArgum = (
  args: string[]
): { target: number; dailyHours: number[] } => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map((n) => Number(n));

  if (isNaN(target) || dailyHours.some((n) => isNaN(n))) {
    throw new Error("All values must be numbers");
  }

  return {
    target,
    dailyHours,
  };
};*/

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Hours => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;

  let success: boolean;
  if (average >= target) {
    success = true;
  } else {
    success = false;
  }

  let rating: number;
  let ratingDescription: string;
  if (average < target * 0.75) {
    rating = 1;
    ratingDescription = "You could do better";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "Good job!";
  } else {
    rating = 3;
    ratingDescription = "Splendid!!!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/*try {
  const { target, dailyHours } = parseArgum(process.argv);
  console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}*/
