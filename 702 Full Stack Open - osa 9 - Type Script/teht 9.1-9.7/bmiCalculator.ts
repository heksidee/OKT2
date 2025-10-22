export interface Values {
  height: number;
  weight: number;
  bmi: string;
}

/*const parseArguments = (args: string[]): Values => {
  if (process.argv.length !== 4) {
    throw new Error("Incorrect amount of arguments");
  }
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};*/

export const calculateBmi = (height: number, weight: number): Values => {
  const heightInMeters = height / 100;
  const bmiCalc = weight / (heightInMeters * heightInMeters);

  let bmi = "";
  if (bmiCalc < 18.5) {
    bmi = "Underweight";
  } else if (bmiCalc < 25) {
    bmi = "Normal weight";
  } else if (bmiCalc < 30) {
    bmi = "Overweight";
  } else {
    bmi = "Obese";
  }

  return {
    height,
    weight,
    bmi,
  };
};

/*try {
  const { height, weight } = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}*/
