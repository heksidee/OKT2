import { calculateBmi } from "./bmiCalculator";

if (require.main === module) {
  const args = process.argv;

  if (args.length !== 4) {
    console.log("Incorrect amount of arguments");
    process.exit(1);
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    console.error("Both height and weight musta be numbers.");
    process.exit(1);
  }

  const result = calculateBmi(height, weight);
  console.log(result);
}
