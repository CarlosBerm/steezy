import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TrickDetailScreen: React.FC = () => {
  const [comfortLevel, setComfortLevel] = useState<string>('learning');

  // Mock trick data
  const trick = {
    name: 'Frontside 180',
    description:
      'A half rotation (180 degrees) where you spin in the frontside direction while jumping.',
    difficulty: 2,
    risk: 2,
    category: 'spins',
    steezPoints: 100,
    prerequisites: ['Ollie'],
    tips: [
      'Start with small jumps to get comfortable with the rotation',
      'Keep your shoulders aligned with your board throughout the spin',
      'Spot your landing early in the rotation',
      'Practice the motion on flat ground first',
    ],
    commonMistakes: [
      'Over-rotating and landing switch',
      'Not committing to the full rotation',
      'Looking down instead of spotting the landing',
      'Rushing the takeoff',
    ],
  };

  const comfortLevels = [
    {key: 'learning', label: 'Learning', icon: 'school', color: '#FF9800'},
    {
      key: 'trying',
      label: 'Trying',
      icon: 'fitness-center',
      color: '#2196F3',
    },
    {
      key: 'comfortable',
      label: 'Comfortable',
      icon: 'thumb-up',
      color: '#4CAF50',
    },
    {key: 'mastered', label: 'Mastered', icon: 'stars', color: '#9C27B0'},
  ];

  const renderDifficultyStars = (level: number) => {
    return Array.from({length: 5}, (_, i) => (
      <Icon
        key={i}
        name="star"
        size={20}
        color={i < level ? '#FF9800' : '#e0e0e0'}
      />
    ));
  };

  const renderRiskIndicator = (risk: number) => {
    return Array.from({length: 5}, (_, i) => (
      <View
        key={i}
        style={[
          styles.riskDot,
          {backgroundColor: i < risk ? '#F44336' : '#e0e0e0'},
        ]}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Trick Header */}
      <View style={styles.header}>
        <Text style={styles.trickName}>{trick.name}</Text>
        <Text style={styles.category}>{trick.category.toUpperCase()}</Text>
        <Text style={styles.steezPoints}>
          +{trick.steezPoints} Steez Points
        </Text>
      </View>

      {/* Video Placeholder */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Icon name="play-circle-filled" size={64} color="white" />
          <Text style={styles.videoLabel}>Tutorial Video</Text>
        </View>
        <View style={styles.videoControls}>
          <TouchableOpacity style={styles.videoButton}>
            <Icon name="slow-motion-video" size={20} color="#2196F3" />
            <Text style={styles.videoButtonText}>Slow Motion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoButton}>
            <Icon name="replay" size={20} color="#2196F3" />
            <Text style={styles.videoButtonText}>Replay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Trick Metrics */}
      <View style={styles.metricsCard}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Difficulty</Text>
          <View style={styles.stars}>
            {renderDifficultyStars(trick.difficulty)}
          </View>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Risk Level</Text>
          <View style={styles.riskIndicators}>
            {renderRiskIndicator(trick.risk)}
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.description}>{trick.description}</Text>
      </View>

      {/* Prerequisites */}
      {trick.prerequisites.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prerequisites</Text>
          <Text style={styles.prerequisiteText}>
            Make sure you can consistently land these tricks first:
          </Text>
          {trick.prerequisites.map((prerequisite, index) => (
            <TouchableOpacity key={index} style={styles.prerequisiteItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.prerequisiteName}>{prerequisite}</Text>
              <Icon name="arrow-forward-ios" size={16} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tips */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pro Tips</Text>
        {trick.tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Icon name="lightbulb" size={20} color="#FF9800" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Common Mistakes */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Common Mistakes</Text>
        {trick.commonMistakes.map((mistake, index) => (
          <View key={index} style={styles.mistakeItem}>
            <Icon name="warning" size={20} color="#F44336" />
            <Text style={styles.mistakeText}>{mistake}</Text>
          </View>
        ))}
      </View>

      {/* Comfort Level Selection */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Comfort Level</Text>
        <View style={styles.comfortLevels}>
          {comfortLevels.map(level => (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.comfortButton,
                comfortLevel === level.key && {backgroundColor: level.color},
              ]}
              onPress={() => setComfortLevel(level.key)}>
              <Icon
                name={level.icon}
                size={24}
                color={comfortLevel === level.key ? 'white' : level.color}
              />
              <Text
                style={[
                  styles.comfortText,
                  comfortLevel === level.key && {color: 'white'},
                ]}>
                {level.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <Icon name="add" size={20} color="white" />
          <Text style={styles.primaryButtonText}>Add to Practice List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Icon name="videocam" size={20} color="#2196F3" />
          <Text style={styles.secondaryButtonText}>Record Attempt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Icon name="share" size={20} color="#2196F3" />
          <Text style={styles.secondaryButtonText}>Share Trick</Text>
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
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  trickName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
  },
  steezPoints: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  videoContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  videoPlaceholder: {
    height: 220,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  videoControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  videoButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  metricsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
  },
  riskIndicators: {
    flexDirection: 'row',
  },
  riskDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 2,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  prerequisiteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  prerequisiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  prerequisiteName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mistakeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  comfortLevels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  comfortButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  comfortText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  actionButtons: {
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TrickDetailScreen;
