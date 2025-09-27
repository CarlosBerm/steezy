import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { User, Level } from "../types";

const ProfileScreen: React.FC = () => {
  // Mock user data
  const currentUser: User = {
    id: "user1",
    username: "snow_rider_23",
    email: "user@example.com",
    level: 3,
    steezPoints: 1250,
    friends: ["alex_rider", "sarah_shreds", "mike_mountain"],
    createdAt: new Date("2023-11-01"),
  };

  // Mock friends data
  const friends = [
    { id: "alex_rider", username: "alex_rider", level: 4, steezPoints: 1800 },
    {
      id: "sarah_shreds",
      username: "sarah_shreds",
      level: 5,
      steezPoints: 2100,
    },
    {
      id: "mike_mountain",
      username: "mike_mountain",
      level: 2,
      steezPoints: 800,
    },
  ];

  // Mock level system
  const levels: Level[] = [
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

  const currentLevel =
    levels.find((l) => l.level === currentUser.level) || levels[0];
  const nextLevel = levels.find((l) => l.level === currentUser.level + 1);

  const achievements = [
    {
      id: "1",
      name: "First Trick",
      description: "Land your first trick",
      icon: "stars",
    },
    {
      id: "2",
      name: "Level Up",
      description: "Reach Level 2",
      icon: "trending-up",
    },
    {
      id: "3",
      name: "Social Butterfly",
      description: "Add 5 friends",
      icon: "people",
    },
    {
      id: "4",
      name: "Spin Master",
      description: "Master all 180° tricks",
      icon: "rotate-right",
    },
  ];

  const stats = [
    { label: "Tricks Mastered", value: "12", icon: "stars" },
    { label: "Total Sessions", value: "47", icon: "event" },
    { label: "Days Active", value: "23", icon: "calendar-today" },
    { label: "Videos Shared", value: "8", icon: "videocam" },
  ];

  const renderFriend = ({ item }: { item: any }) => {
    const friendLevel = levels.find((l) => l.level === item.level) || levels[0];

    return (
      <TouchableOpacity style={styles.friendCard}>
        <View style={styles.friendInfo}>
          <View style={styles.friendAvatar}>
            <Icon name="person" size={24} color="#666" />
          </View>
          <View style={styles.friendDetails}>
            <Text style={styles.friendName}>@{item.username}</Text>
            <View style={styles.friendLevel}>
              <Icon
                name={friendLevel.icon}
                size={16}
                color={friendLevel.color}
              />
              <Text
                style={[styles.friendLevelText, { color: friendLevel.color }]}
              >
                Level {item.level} - {friendLevel.name}
              </Text>
            </View>
            <Text style={styles.friendPoints}>
              {item.steezPoints} steez points
            </Text>
          </View>
        </View>
        <View style={styles.friendActions}>
          <TouchableOpacity style={styles.friendActionButton}>
            <Icon name="visibility" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.friendActionButton}>
            <Icon name="message" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={48} color="#666" />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Icon name="camera-alt" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>@{currentUser.username}</Text>
          <View style={styles.levelBadge}>
            <Icon
              name={currentLevel.icon}
              size={20}
              color={currentLevel.color}
            />
            <Text style={[styles.levelText, { color: currentLevel.color }]}>
              Level {currentUser.level} - {currentLevel.name}
            </Text>
          </View>
          <Text style={styles.joinDate}>
            Riding since{" "}
            {currentUser.createdAt.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Level Progress */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="trending-up" size={24} color="#2196F3" />
          <Text style={styles.cardTitle}>Level Progress</Text>
        </View>
        <Text style={styles.pointsText}>
          {currentUser.steezPoints} / {nextLevel?.requiredPoints || "Max"} Steez
          Points
        </Text>
        {nextLevel && (
          <>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (currentUser.steezPoints / nextLevel.requiredPoints) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {nextLevel.requiredPoints - currentUser.steezPoints} points to{" "}
              {nextLevel.name}
            </Text>
          </>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Icon name={stat.icon} size={24} color="#2196F3" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="emoji-events" size={24} color="#FF9800" />
          <Text style={styles.cardTitle}>Recent Achievements</Text>
        </View>
        {achievements.slice(0, 3).map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Icon name={achievement.icon} size={24} color="#FF9800" />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Achievements</Text>
          <Icon name="arrow-forward" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Friends */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="people" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Friends ({friends.length})</Text>
          <TouchableOpacity style={styles.addFriendButton}>
            <Icon name="person-add" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {friends.map((friend, index) => (
          <View key={friend.id}>{renderFriend({ item: friend })}</View>
        ))}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Friends</Text>
          <Icon name="arrow-forward" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Account Actions */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="edit" size={24} color="#666" />
          <Text style={styles.actionText}>Edit Profile</Text>
          <Icon name="arrow-forward-ios" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="notifications" size={24} color="#666" />
          <Text style={styles.actionText}>Notifications</Text>
          <Icon name="arrow-forward-ios" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="privacy-tip" size={24} color="#666" />
          <Text style={styles.actionText}>Privacy Settings</Text>
          <Icon name="arrow-forward-ios" size={16} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="help" size={24} color="#666" />
          <Text style={styles.actionText}>Help & Support</Text>
          <Icon name="arrow-forward-ios" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  levelText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
  joinDate: {
    fontSize: 12,
    color: "#666",
  },
  settingsButton: {
    padding: 8,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#333",
    flex: 1,
  },
  addFriendButton: {
    padding: 4,
  },
  pointsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2196F3",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementInfo: {
    marginLeft: 12,
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  friendCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  friendLevel: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  friendLevelText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  friendPoints: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  friendActions: {
    flexDirection: "row",
  },
  friendActionButton: {
    padding: 8,
    marginLeft: 4,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: "#2196F3",
    fontWeight: "500",
    marginRight: 4,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
    flex: 1,
  },
});

export default ProfileScreen;
