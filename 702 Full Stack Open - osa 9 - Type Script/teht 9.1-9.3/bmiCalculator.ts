interface Values {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): Values => {
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
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal weight";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
