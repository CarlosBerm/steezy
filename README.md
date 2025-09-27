# Steezy

Steezy is a React Native mobile app made for snowboarders and skiers by snowboarders and skiers. It helps riders elevate their "steez" by providing a comprehensive guide to learn new tricks, track progression, and stay motivated through social features and gamification.

## Features

### 🎿 Trick Management & Progression

- **12 Comprehensive Tricks**: From basic Ollie to advanced Backflips, ordered by difficulty and risk
- **Smart Prerequisites**: Master foundational tricks before advancing to complex maneuvers
- **Comfort Levels**: Track your progress from Learning → Trying → Comfortable → Mastered
- **Steez Points**: Earn 50-400 points per trick completion

### 🏆 Gamification System

- **6-Level Progression**: Rookie → Learner → Rider → Shredder → Pro → Legend
- **Dynamic Point Thresholds**: 0, 500, 1000, 1500, 2000, 3000 steez points
- **Achievement System**: Unlock badges for milestones and social engagement
- **Visual Progress Tracking**: Real-time stats and progression indicators

### 👥 Social Features

- **Friend System**: Connect with other riders and discover new friends
- **Social Feed**: Share trick videos, celebrate milestones, and engage through comments/likes
- **Level Comparison**: Compare your progression with friends through leaderboard elements
- **Video Sharing**: Record and share your trick attempts and successes

### 📱 Technical Stack

- **React Native 0.72.6** with TypeScript for type safety
- **React Navigation** with bottom tabs and stack navigation
- **Material Design** icons and consistent winter sports theming
- **Modular Architecture** with services, utilities, and comprehensive type definitions
- **Mock Data Service** ready for backend integration

## Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/         # Navigation configuration
├── screens/           # Main app screens
│   ├── HomeScreen.tsx        # Dashboard with level progress and current tricks
│   ├── TricksScreen.tsx      # Comprehensive tricks library
│   ├── ProgressScreen.tsx    # Personal progression tracking
│   ├── SocialScreen.tsx      # Social feed and community features
│   ├── ProfileScreen.tsx     # User profile and friend management
│   ├── TrickDetailScreen.tsx # Detailed trick information and tutorials
│   └── FriendsScreen.tsx     # Friend discovery and management
├── services/          # Data management and business logic
├── types/            # TypeScript type definitions
├── utils/           # Helper functions and utilities
└── assets/         # Images, icons, and static resources
```

## Getting Started

### Prerequisites

- Node.js (v20+)
- React Native development environment
- iOS Simulator / Android Emulator

### Installation

1. Clone the repository:

```bash
git clone https://github.com/CarlosBerm/steezy.git
cd steezy
```

2. Install dependencies:

```bash
npm install
```

3. Start the Metro bundler:

```bash
npm start
```

4. Run on your preferred platform:

```bash
# iOS
npm run ios

# Android
npm run android
```

## Development

### Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

### Code Style

The project uses Prettier and ESLint for consistent code formatting. Run `npm run lint` to check for issues.

## Features in Detail

### Trick Progression System

The app features a smart progression system that guides users through tricks based on difficulty and prerequisites:

- **Beginner**: Ollie, Indy Grab, Tail Grab, Butter
- **Intermediate**: Frontside/Backside 180s, Method, 50-50 Rail
- **Advanced**: Frontside 360, Boardslide, Frontside 540
- **Expert**: Backflip and other high-risk maneuvers

### Gamification Elements

- **Steez Points**: Immediate reward system for trick completion
- **Level Progression**: Visual representation of skill advancement
- **Achievements**: Special badges for milestones and social engagement
- **Leaderboards**: Compare progress with friends and community

### Social Interaction

- **Feed**: Share videos, celebrate achievements, and motivate others
- **Comments & Likes**: Engage with the community
- **Friend Discovery**: Find riders with similar skill levels
- **Group Challenges**: Planned feature for community events

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

_Keep shredding and elevate your steez! 🏂⛷️_
