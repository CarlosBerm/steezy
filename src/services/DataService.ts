import { Trick, User, UserTrickProgress, SocialPost, Level } from "../types";

class DataService {
  // Level system configuration
  static levels: Level[] = [
    {
      level: 1,
      name: "Rookie",
      requiredPoints: 0,
      color: "#8BC34A",
      icon: "child-care",
    },
    {
      level: 2,
      name: "Learner",
      requiredPoints: 500,
      color: "#2196F3",
      icon: "school",
    },
    {
      level: 3,
      name: "Rider",
      requiredPoints: 1000,
      color: "#FF9800",
      icon: "sports",
    },
    {
      level: 4,
      name: "Shredder",
      requiredPoints: 1500,
      color: "#9C27B0",
      icon: "whatshot",
    },
    {
      level: 5,
      name: "Pro",
      requiredPoints: 2000,
      color: "#F44336",
      icon: "stars",
    },
    {
      level: 6,
      name: "Legend",
      requiredPoints: 3000,
      color: "#FFD700",
      icon: "emoji-events",
    },
  ];

  // Tricks database ordered by difficulty and risk
  static tricks: Trick[] = [
    {
      id: "1",
      name: "Ollie",
      description: "Basic jump - foundation for all tricks",
      difficulty: 1,
      risk: 1,
      category: "jumps",
      steezPoints: 50,
    },
    {
      id: "2",
      name: "Frontside 180",
      description: "Half rotation facing forward",
      difficulty: 2,
      risk: 2,
      category: "spins",
      steezPoints: 100,
      prerequisites: ["1"],
    },
    {
      id: "3",
      name: "Backside 180",
      description: "Half rotation facing backward",
      difficulty: 2,
      risk: 2,
      category: "spins",
      steezPoints: 100,
      prerequisites: ["2"],
    },
    {
      id: "4",
      name: "Frontside 360",
      description: "Full frontside rotation",
      difficulty: 3,
      risk: 3,
      category: "spins",
      steezPoints: 200,
      prerequisites: ["2"],
    },
    {
      id: "5",
      name: "Indy Grab",
      description: "Grab between your feet with trailing hand",
      difficulty: 2,
      risk: 1,
      category: "grabs",
      steezPoints: 75,
      prerequisites: ["1"],
    },
    {
      id: "6",
      name: "Method",
      description: "Stylish indy grab with tweaked style",
      difficulty: 3,
      risk: 2,
      category: "grabs",
      steezPoints: 150,
      prerequisites: ["5"],
    },
    {
      id: "7",
      name: "Backflip",
      description: "Backward somersault",
      difficulty: 4,
      risk: 5,
      category: "flips",
      steezPoints: 400,
      prerequisites: ["1", "2", "3"],
    },
    {
      id: "8",
      name: "Frontside 540",
      description: "One and a half frontside rotations",
      difficulty: 4,
      risk: 4,
      category: "spins",
      steezPoints: 350,
      prerequisites: ["4"],
    },
    {
      id: "9",
      name: "Tail Grab",
      description: "Grab the tail of your board",
      difficulty: 2,
      risk: 1,
      category: "grabs",
      steezPoints: 75,
      prerequisites: ["1"],
    },
    {
      id: "10",
      name: "50-50 Rail",
      description: "Slide on a rail with both feet",
      difficulty: 3,
      risk: 3,
      category: "rails",
      steezPoints: 175,
      prerequisites: ["1"],
    },
    {
      id: "11",
      name: "Boardslide",
      description: "Slide perpendicular on a rail",
      difficulty: 3,
      risk: 4,
      category: "rails",
      steezPoints: 200,
      prerequisites: ["10"],
    },
    {
      id: "12",
      name: "Butter",
      description: "Press on nose or tail while riding",
      difficulty: 2,
      risk: 1,
      category: "butters",
      steezPoints: 80,
      prerequisites: ["1"],
    },
  ];

  // Get tricks ordered by difficulty and risk for progression
  static getTricksForProgression(): Trick[] {
    return this.tricks.sort((a, b) => {
      if (a.difficulty !== b.difficulty) {
        return a.difficulty - b.difficulty;
      }
      return a.risk - b.risk;
    });
  }

  // Get tricks by category
  static getTricksByCategory(category: string): Trick[] {
    if (category === "all") return this.tricks;
    return this.tricks.filter((trick) => trick.category === category);
  }

  // Get trick by ID
  static getTrickById(id: string): Trick | undefined {
    return this.tricks.find((trick) => trick.id === id);
  }

  // Calculate user level based on steez points
  static calculateUserLevel(steezPoints: number): number {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (steezPoints >= this.levels[i].requiredPoints) {
        return this.levels[i].level;
      }
    }
    return 1;
  }

  // Get level info
  static getLevelInfo(level: number): Level | undefined {
    return this.levels.find((l) => l.level === level);
  }

  // Get next recommended trick based on user progress
  static getNextRecommendedTrick(
    userProgress: UserTrickProgress[]
  ): Trick | null {
    const masteredTrickIds = userProgress
      .filter((p) => p.comfortLevel === "mastered")
      .map((p) => p.trickId);

    // Find the first trick that hasn't been mastered and has all prerequisites met
    for (const trick of this.getTricksForProgression()) {
      if (masteredTrickIds.includes(trick.id)) continue;

      // Check if all prerequisites are mastered
      if (trick.prerequisites) {
        const allPrereqsMastered = trick.prerequisites.every((prereqId) =>
          masteredTrickIds.includes(prereqId)
        );
        if (!allPrereqsMastered) continue;
      }

      return trick;
    }

    return null;
  }

  // Calculate steez points earned from user progress
  static calculateSteezPoints(userProgress: UserTrickProgress[]): number {
    return userProgress
      .filter((p) => p.comfortLevel === "mastered")
      .reduce((total, progress) => {
        const trick = this.getTrickById(progress.trickId);
        return total + (trick?.steezPoints || 0);
      }, 0);
  }

  // Get leaderboard position among friends
  static getLeaderboardPosition(
    userPoints: number,
    friendsPoints: number[]
  ): number {
    const allPoints = [userPoints, ...friendsPoints].sort((a, b) => b - a);
    return allPoints.indexOf(userPoints) + 1;
  }

  // Generate achievement progress
  static getAchievementProgress(
    userProgress: UserTrickProgress[],
    userFriends: string[]
  ) {
    const masteredTricks = userProgress.filter(
      (p) => p.comfortLevel === "mastered"
    ).length;
    const totalAttempts = userProgress.reduce((sum, p) => sum + p.attempts, 0);
    const spinTricks = userProgress.filter((p) => {
      const trick = this.getTrickById(p.trickId);
      return trick?.category === "spins" && p.comfortLevel === "mastered";
    }).length;

    return {
      firstTrick: masteredTricks >= 1,
      socialButterfly: userFriends.length >= 5,
      spinMaster: spinTricks >= 3,
      dedicated: totalAttempts >= 50,
    };
  }
}

export default DataService;
