import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FriendsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'friends' | 'search'>(
    'friends',
  );

  // Mock friends data
  const friends = [
    {
      id: 'alex_rider',
      username: 'alex_rider',
      level: 4,
      steezPoints: 1800,
      status: 'online',
      lastSeen: 'Active now',
    },
    {
      id: 'sarah_shreds',
      username: 'sarah_shreds',
      level: 5,
      steezPoints: 2100,
      status: 'online',
      lastSeen: 'Active 2h ago',
    },
    {
      id: 'mike_mountain',
      username: 'mike_mountain',
      level: 2,
      steezPoints: 800,
      status: 'offline',
      lastSeen: 'Active yesterday',
    },
    {
      id: 'powder_seeker',
      username: 'powder_seeker',
      level: 6,
      steezPoints: 3200,
      status: 'online',
      lastSeen: 'Active 30m ago',
    },
  ];

  // Mock search results
  const searchResults = [
    {
      id: 'fresh_tracks',
      username: 'fresh_tracks',
      level: 3,
      steezPoints: 1400,
      mutualFriends: 2,
    },
    {
      id: 'slope_master',
      username: 'slope_master',
      level: 4,
      steezPoints: 1900,
      mutualFriends: 1,
    },
  ];

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getLevelColor = (level: number) => {
    const colors = [
      '#8BC34A',
      '#2196F3',
      '#FF9800',
      '#9C27B0',
      '#F44336',
      '#FFD700',
    ];
    return colors[Math.min(level - 1, colors.length - 1)];
  };

  const renderFriend = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={24} color="#666" />
          </View>
          {item.status === 'online' && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>@{item.username}</Text>
          <View style={styles.friendLevel}>
            <Icon name="stars" size={16} color={getLevelColor(item.level)} />
            <Text
              style={[styles.levelText, {color: getLevelColor(item.level)}]}>
              Level {item.level}
            </Text>
            <Text style={styles.pointsText}>• {item.steezPoints} pts</Text>
          </View>
          <Text style={styles.lastSeen}>{item.lastSeen}</Text>
        </View>
      </View>

      <View style={styles.friendActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="visibility" size={20} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="more-vert" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderSearchResult = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.searchResultCard}>
      <View style={styles.friendInfo}>
        <View style={styles.avatar}>
          <Icon name="person" size={24} color="#666" />
        </View>

        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>@{item.username}</Text>
          <View style={styles.friendLevel}>
            <Icon name="stars" size={16} color={getLevelColor(item.level)} />
            <Text
              style={[styles.levelText, {color: getLevelColor(item.level)}]}>
              Level {item.level}
            </Text>
            <Text style={styles.pointsText}>• {item.steezPoints} pts</Text>
          </View>
          <Text style={styles.mutualFriends}>
            {item.mutualFriends} mutual friends
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Icon name="person-add" size={20} color="#2196F3" />
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Friends</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Icon name="share" size={20} color="#2196F3" />
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends or find new riders..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'friends' && styles.activeTab]}
          onPress={() => setSelectedTab('friends')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'friends' && styles.activeTabText,
            ]}>
            My Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'search' && styles.activeTab]}
          onPress={() => setSelectedTab('search')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'search' && styles.activeTabText,
            ]}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      {/* Friends List or Search Results */}
      {selectedTab === 'friends' ? (
        <FlatList
          data={filteredFriends}
          renderItem={renderFriend}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Icon name="people" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No friends found' : 'No friends yet'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? 'Try a different search term'
                  : 'Start connecting with other riders!'}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  style={styles.discoverButton}
                  onPress={() => setSelectedTab('search')}>
                  <Text style={styles.discoverButtonText}>Discover Riders</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Suggested for you</Text>
              <Text style={styles.sectionSubtitle}>
                Based on your activity and mutual friends
              </Text>
            </View>
          )}
        />
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="qr-code" size={24} color="#2196F3" />
          <Text style={styles.quickActionText}>QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="contacts" size={24} color="#2196F3" />
          <Text style={styles.quickActionText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="group-add" size={24} color="#2196F3" />
          <Text style={styles.quickActionText}>Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
  },
  inviteText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2196F3',
  },
  listContainer: {
    paddingVertical: 8,
  },
  friendCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchResultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  friendLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  levelText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  pointsText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  lastSeen: {
    fontSize: 12,
    color: '#999',
  },
  mutualFriends: {
    fontSize: 12,
    color: '#666',
  },
  friendActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
  },
  addButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
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
    marginBottom: 20,
  },
  discoverButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#2196F3',
  },
  discoverButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionText: {
    marginTop: 6,
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default FriendsScreen;
