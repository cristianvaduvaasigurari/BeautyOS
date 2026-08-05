export type HealthScoreInputs = {
  sleepHours: number; // target 8h
  proteinMetPercentage: number; // 0-100%
  trainingCompleted: boolean;
  recoveryIndex: number; // 0-100
  consistencyStreakDays: number; // target 30 days
};

export type HealthScoreResult = {
  score: number;
  label: "Optimal" | "Excellent" | "Good" | "Needs Optimization";
  breakdown: {
    sleep: number;
    nutrition: number;
    training: number;
    recovery: number;
    consistency: number;
  };
  recommendations: string[];
};

export function calculateHealthScore(inputs: HealthScoreInputs): HealthScoreResult {
  // 1. Sleep (25%) - target 8 hours
  const sleepRatio = Math.min(1, inputs.sleepHours / 8);
  const sleepScore = Math.round(sleepRatio * 100);

  // 2. Nutrition (25%) - protein met percentage
  const nutritionScore = Math.min(100, Math.max(0, inputs.proteinMetPercentage));

  // 3. Training (20%)
  const trainingScore = inputs.trainingCompleted ? 100 : 40;

  // 4. Recovery (15%)
  const recoveryScore = Math.min(100, Math.max(0, inputs.recoveryIndex));

  // 5. Consistency (15%) - 30 days max scale
  const consistencyScore = Math.min(100, Math.round((inputs.consistencyStreakDays / 30) * 100));

  const totalScore = Math.round(
    sleepScore * 0.25 +
    nutritionScore * 0.25 +
    trainingScore * 0.20 +
    recoveryScore * 0.15 +
    consistencyScore * 0.15
  );

  let label: "Optimal" | "Excellent" | "Good" | "Needs Optimization" = "Good";
  if (totalScore >= 90) label = "Optimal";
  else if (totalScore >= 80) label = "Excellent";
  else if (totalScore >= 65) label = "Good";
  else label = "Needs Optimization";

  const recommendations: string[] = [];
  if (sleepScore < 80) recommendations.push("Increase sleep duration to 8h for optimal neural recovery.");
  if (nutritionScore < 80) recommendations.push("Increase protein intake to hit your 2.2g/kg daily target.");
  if (!inputs.trainingCompleted) recommendations.push("Complete today's prescribed strength session.");
  if (recoveryScore < 70) recommendations.push("Add 15 minutes of foam rolling or contrast hydrotherapy.");
  if (consistencyScore < 50) recommendations.push("Maintain daily check-ins to build compounding protocol adherence.");

  if (recommendations.length === 0) {
    recommendations.push("Maintain your current protocol adherence for biological age optimization!");
  }

  return {
    score: totalScore,
    label,
    breakdown: {
      sleep: sleepScore,
      nutrition: nutritionScore,
      training: trainingScore,
      recovery: recoveryScore,
      consistency: consistencyScore,
    },
    recommendations,
  };
}
