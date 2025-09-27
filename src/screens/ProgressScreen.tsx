import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserTrickProgress} from '../types';

const ProgressScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'current' | 'mastered'>(
    'current',
  );

  // Mock progress data
  const currentProgress: UserTrickProgress[] = [
    {
      trickId: '1',
      userId: 'user1',
      comfortLevel: 'mastered',
      attempts: 15,
      completedAt: new Date('2024-01-15'),
    },
    {
      trickId: '2',
      userId: 'user1',
      comfortLevel: 'comfortable',
      attempts: 8,
    },
    {
      trickId: '3',
      userId: 'user1',
      comfortLevel: 'trying',
      attempts: 3,
    },
    {
      trickId: '4',
      userId: 'user1',
      comfortLevel: 'learning',
      attempts: 1,
    },
  ];

  // Mock trick names (in real app, this would be joined with tricks data)
  const trickNames: {[key: string]: string} = {
    '1': 'Ollie',
    '2': 'Frontside 180',
    '3': 'Backside 180',
    '4': 'Frontside 360',
  };

  const masteredTricks = currentProgress.filter(
    p => p.comfortLevel === 'mastered',
  );
  const activeTricks = currentProgress.filter(
    p => p.comfortLevel !== 'mastered',
  );

  const getComfortLevelColor = (level: string) => {
    switch (level) {
      case 'learning':
        return '#FF9800';
      case 'trying':
        return '#2196F3';
      case 'comfortable':
        return '#4CAF50';
      case 'mastered':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const getComfortLevelIcon = (level: string) => {
    switch (level) {
      case 'learning':
        return 'school';
      case 'trying':
        return 'fitness-center';
      case 'comfortable':
        return 'thumb-up';
      case 'mastered':
        return 'stars';
      default:
        return 'help';
    }
  };

  const renderProgressItem = ({item}: {item: UserTrickProgress}) => (
    <TouchableOpacity style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <View style={styles.trickInfo}>
          <Text style={styles.trickName}>{trickNames[item.trickId]}</Text>
          <View style={styles.comfortLevel}>
            <Icon
              name={getComfortLevelIcon(item.comfortLevel)}
              size={16}
              color={getComfortLevelColor(item.comfortLevel)}
            />
            <Text
              style={[
                styles.comfortText,
                {color: getComfortLevelColor(item.comfortLevel)},
              ]}>
              {item.comfortLevel.charAt(0).toUpperCase() +
                item.comfortLevel.slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.attempts}>
          <Text style={styles.attemptsNumber}>{item.attempts}</Text>
          <Text style={styles.attemptsLabel}>attempts</Text>
        </View>
      </View>

      {item.completedAt && (
        <View style={styles.completedInfo}>
          <Icon name="check-circle" size={16} color="#4CAF50" />
          <Text style={styles.completedText}>
            Mastered on {item.completedAt.toLocaleDateString()}
          </Text>
        </View>
      )}

      <View style={styles.progressActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="play-arrow" size={18} color="#2196F3" />
          <Text style={styles.actionText}>Watch Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="add" size={18} color="#4CAF50" />
          <Text style={styles.actionText}>Log Session</Text>
        </TouchableOpacity>
        {item.comfortLevel === 'mastered' && (
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={18} color="#FF9800" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Icon name="stars" size={32} color="#9C27B0" />
        <Text style={styles.statNumber}>{masteredTricks.length}</Text>
        <Text style={styles.statLabel}>Mastered</Text>
      </View>
      <View style={styles.statCard}>
        <Icon name="trending-up" size={32} color="#2196F3" />
        <Text style={styles.statNumber}>{activeTricks.length}</Text>
        <Text style={styles.statLabel}>In Progress</Text>
      </View>
      <View style={styles.statCard}>
        <Icon name="fitness-center" size={32} color="#FF9800" />
        <Text style={styles.statNumber}>
          {currentProgress.reduce((sum, p) => sum + p.attempts, 0)}
        </Text>
        <Text style={styles.statLabel}>Total Attempts</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your trick mastery</Text>
      </View>

      {renderStats()}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'current' && styles.activeTab]}
          onPress={() => setSelectedTab('current')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'current' && styles.activeTabText,
            ]}>
            In Progress ({activeTricks.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'mastered' && styles.activeTab]}
          onPress={() => setSelectedTab('mastered')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'mastered' && styles.activeTabText,
            ]}>
            Mastered ({masteredTricks.length})
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressList}>
        {(selectedTab === 'current' ? activeTricks : masteredTricks).map(
          (item, index) => (
            <View key={`${item.trickId}-${index}`}>
              {renderProgressItem({item})}
            </View>
          ),
        )}
      </View>

      {(selectedTab === 'current' ? activeTricks : masteredTricks).length ===
        0 && (
        <View style={styles.emptyState}>
          <Icon
            name={selectedTab === 'current' ? 'school' : 'stars'}
            size={64}
            color="#ccc"
          />
          <Text style={styles.emptyTitle}>
            {selectedTab === 'current'
              ? 'No tricks in progress'
              : 'No mastered tricks yet'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {selectedTab === 'current'
              ? 'Start learning new tricks from the Tricks tab'
              : 'Keep practicing to master your first trick!'}
          </Text>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  progressList: {
    paddingHorizontal: 16,
  },
  progressCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trickInfo: {
    flex: 1,
  },
  trickName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  comfortLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comfortText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  attempts: {
    alignItems: 'center',
  },
  attemptsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  attemptsLabel: {
    fontSize: 12,
    color: '#666',
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#e8f5e8',
    borderRadius: 6,
  },
  completedText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#4CAF50',
  },
  progressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProgressScreen;
