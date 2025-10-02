import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC = () => {
  // Mock data - in a real app this would come from a state management solution
  const userLevel = 3;
  const steezPoints = 1250;
  const nextLevelPoints = 1500;
  const currentTrick = 'Frontside 180';
  const nextTrick = 'Backside 180';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Steezy</Text>
        <Text style={styles.subtitle}>Elevate your steez!</Text>
      </View>

      {/* Level Progress Card */}
      <View style={styles.card}>
        <View style={styles.levelHeader}>
          <Icon name="trending-up" size={24} color="#2196F3" />
          <Text style={styles.cardTitle}>Level {userLevel}</Text>
        </View>
        <Text style={styles.pointsText}>
          {steezPoints} / {nextLevelPoints} Steez Points
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${(steezPoints / nextLevelPoints) * 100}%`},
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {nextLevelPoints - steezPoints} points to Level {userLevel + 1}
        </Text>
      </View>

      {/* Current Trick Card */}
      <View style={styles.card}>
        <View style={styles.levelHeader}>
          <Icon name="sports" size={24} color="#FF9800" />
          <Text style={styles.cardTitle}>Current Focus</Text>
        </View>
        <Text style={styles.trickName}>{currentTrick}</Text>
        <Text style={styles.trickDescription}>
          Practice your frontside rotations on smaller jumps before progressing
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Trick Details</Text>
        </TouchableOpacity>
      </View>

      {/* Next Trick Card */}
      <View style={styles.card}>
        <View style={styles.levelHeader}>
          <Icon name="arrow-forward" size={24} color="#4CAF50" />
          <Text style={styles.cardTitle}>Up Next</Text>
        </View>
        <Text style={styles.trickName}>{nextTrick}</Text>
        <Text style={styles.trickDescription}>
          Master your frontside 180 first, then progress to backside rotations
        </Text>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Preview Trick
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="add" size={32} color="#2196F3" />
          <Text style={styles.actionText}>Log Session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="people" size={32} color="#2196F3" />
          <Text style={styles.actionText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="photo-camera" size={32} color="#2196F3" />
          <Text style={styles.actionText}>Share Video</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#2196F3',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  pointsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  trickName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  trickDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    color: '#2196F3',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default HomeScreen;
