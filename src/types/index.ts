// User types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  steezPoints: number;
  friends: string[];
  createdAt: Date;
}

// Trick types
export interface Trick {
  id: string;
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
  risk: 1 | 2 | 3 | 4 | 5; // 1 = low risk, 5 = high risk
  category: 'grabs' | 'spins' | 'flips' | 'rails' | 'jumps' | 'butters';
  steezPoints: number;
  prerequisites?: string[]; // IDs of tricks that should be learned first
}

// User trick progress
export interface UserTrickProgress {
  trickId: string;
  userId: string;
  comfortLevel: 'learning' | 'trying' | 'comfortable' | 'mastered';
  attempts: number;
  completedAt?: Date;
  videoUrl?: string;
}

// Social feed post
export interface SocialPost {
  id: string;
  userId: string;
  content: string;
  videoUrl?: string;
  trickId?: string;
  likes: string[]; // user IDs who liked
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

// Level system
export interface Level {
  level: number;
  name: string;
  requiredPoints: number;
  color: string;
  icon: string;
}

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  TrickDetail: {trickId: string};
  Profile: {userId?: string};
  Friends: undefined;
  AddFriend: undefined;
};
