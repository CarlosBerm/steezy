import {Trick, UserTrickProgress} from '../types';
import DataService from '../services/DataService';

export const getTrickProgress = (
  trickId: string,
  userProgress: UserTrickProgress[],
): UserTrickProgress | null => {
  return userProgress.find(p => p.trickId === trickId) || null;
};

export const canAttemptTrick = (
  trick: Trick,
  userProgress: UserTrickProgress[],
): boolean => {
  if (!trick.prerequisites || trick.prerequisites.length === 0) {
    return true;
  }

  const masteredTrickIds = userProgress
    .filter(p => p.comfortLevel === 'mastered')
    .map(p => p.trickId);

  return trick.prerequisites.every(prereqId =>
    masteredTrickIds.includes(prereqId),
  );
};

export const getRecommendedTricks = (
  userProgress: UserTrickProgress[],
  limit: number = 5,
): Trick[] => {
  const availableTricks = DataService.getTricksForProgression().filter(
    trick => {
      const progress = getTrickProgress(trick.id, userProgress);
      // Show tricks that are not mastered and can be attempted
      return (
        (!progress || progress.comfortLevel !== 'mastered') &&
        canAttemptTrick(trick, userProgress)
      );
    },
  );

  return availableTricks.slice(0, limit);
};

export const getTricksByComfortLevel = (
  userProgress: UserTrickProgress[],
  comfortLevel: string,
): Trick[] => {
  const filteredProgress = userProgress.filter(
    p => p.comfortLevel === comfortLevel,
  );

  return filteredProgress
    .map(p => DataService.getTrickById(p.trickId))
    .filter((trick): trick is Trick => trick !== undefined);
};

export const calculateTotalSteezPoints = (
  userProgress: UserTrickProgress[],
): number => {
  return DataService.calculateSteezPoints(userProgress);
};

export const getPrerequisiteNames = (trick: Trick): string[] => {
  if (!trick.prerequisites) {
    return [];
  }

  return trick.prerequisites
    .map(id => DataService.getTrickById(id))
    .filter((t): t is Trick => t !== undefined)
    .map(t => t.name);
};
