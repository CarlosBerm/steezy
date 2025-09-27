import {Level} from '../types';
import DataService from '../services/DataService';

export const getCurrentLevel = (steezPoints: number): Level => {
  const level = DataService.calculateUserLevel(steezPoints);
  return DataService.getLevelInfo(level) || DataService.levels[0];
};

export const getNextLevel = (currentLevel: number): Level | null => {
  return DataService.getLevelInfo(currentLevel + 1) || null;
};

export const getProgressToNextLevel = (
  steezPoints: number,
  currentLevel: Level,
  nextLevel: Level | null,
): number => {
  if (!nextLevel) {
    return 100;
  }

  const pointsInCurrentLevel = steezPoints - currentLevel.requiredPoints;
  const pointsNeededForNext =
    nextLevel.requiredPoints - currentLevel.requiredPoints;

  return Math.min((pointsInCurrentLevel / pointsNeededForNext) * 100, 100);
};

export const getPointsToNextLevel = (
  steezPoints: number,
  nextLevel: Level | null,
): number => {
  if (!nextLevel) {
    return 0;
  }
  return Math.max(nextLevel.requiredPoints - steezPoints, 0);
};
