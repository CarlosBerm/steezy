/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Trick} from '../types';

const TricksScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock trick data - in a real app this would come from a database
  const tricks: Trick[] = [
    {
      id: '1',
      name: 'Ollie',
      description: 'Basic jump - foundation for all tricks',
      difficulty: 1,
      risk: 1,
      category: 'jumps',
      steezPoints: 50,
    },
    {
      id: '2',
      name: 'Frontside 180',
      description: 'Half rotation facing forward',
      difficulty: 2,
      risk: 2,
      category: 'spins',
      steezPoints: 100,
      prerequisites: ['1'],
    },
    {
      id: '3',
      name: 'Backside 180',
      description: 'Half rotation facing backward',
      difficulty: 2,
      risk: 2,
      category: 'spins',
      steezPoints: 100,
      prerequisites: ['2'],
    },
    {
      id: '4',
      name: 'Frontside 360',
      description: 'Full frontside rotation',
      difficulty: 3,
      risk: 3,
      category: 'spins',
      steezPoints: 200,
      prerequisites: ['2'],
    },
    {
      id: '5',
      name: 'Indy Grab',
      description: 'Grab between your feet with trailing hand',
      difficulty: 2,
      risk: 1,
      category: 'grabs',
      steezPoints: 75,
      prerequisites: ['1'],
    },
    {
      id: '6',
      name: 'Method',
      description: 'Stylish indy grab with tweaked style',
      difficulty: 3,
      risk: 2,
      category: 'grabs',
      steezPoints: 150,
      prerequisites: ['5'],
    },
    {
      id: '7',
      name: 'Backflip',
      description: 'Backward somersault',
      difficulty: 4,
      risk: 5,
      category: 'flips',
      steezPoints: 400,
      prerequisites: ['1', '2', '3'],
    },
  ];

  const categories = [
    {key: 'all', label: 'All', icon: 'apps'},
    {key: 'jumps', label: 'Jumps', icon: 'trending-up'},
    {key: 'spins', label: 'Spins', icon: 'rotate-right'},
    {key: 'grabs', label: 'Grabs', icon: 'pan-tool'},
    {key: 'flips', label: 'Flips', icon: 'flip'},
    {key: 'rails', label: 'Rails', icon: 'linear-scale'},
  ];

  const filteredTricks =
    selectedCategory === 'all'
      ? tricks
      : tricks.filter(trick => trick.category === selectedCategory);

  // Sort by difficulty and risk
  const sortedTricks = [...filteredTricks].sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      return a.difficulty - b.difficulty;
    }
    return a.risk - b.risk;
  });

  const getDifficultyColor = (difficulty: number) => {
    const colors = ['#4CAF50', '#8BC34A', '#FF9800', '#FF5722', '#F44336'];
    return colors[difficulty - 1];
  };

  const getRiskColor = (risk: number) => {
    const colors = ['#4CAF50', '#8BC34A', '#FF9800', '#FF5722', '#F44336'];
    return colors[risk - 1];
  };

  const renderDifficultyStars = (level: number) => {
    return Array.from({length: 5}, (_, i) => (
      <Icon
        key={i}
        name="star"
        size={16}
        color={i < level ? getDifficultyColor(level) : '#e0e0e0'}
      />
    ));
  };

  const renderRiskIndicator = (risk: number) => {
    return Array.from({length: 5}, (_, i) => (
      <View
        key={i}
        style={[
          styles.riskDot,
          {backgroundColor: i < risk ? getRiskColor(risk) : '#e0e0e0'},
        ]}
      />
    ));
  };

  const renderTrick = ({item}: {item: Trick}) => (
    <TouchableOpacity style={styles.trickCard}>
      <View style={styles.trickHeader}>
        <Text style={styles.trickName}>{item.name}</Text>
        <Text style={styles.steezPoints}>+{item.steezPoints} pts</Text>
      </View>

      <Text style={styles.trickDescription}>{item.description}</Text>

      <View style={styles.trickMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Difficulty</Text>
          <View style={styles.stars}>
            {renderDifficultyStars(item.difficulty)}
          </View>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Risk</Text>
          <View style={styles.riskIndicators}>
            {renderRiskIndicator(item.risk)}
          </View>
        </View>
      </View>

      {item.prerequisites && item.prerequisites.length > 0 && (
        <View style={styles.prerequisites}>
          <Icon name="info" size={16} color="#FF9800" />
          <Text style={styles.prerequisiteText}>Learn basic tricks first</Text>
        </View>
      )}

      <View style={styles.trickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="play-arrow" size={20} color="#2196F3" />
          <Text style={styles.actionButtonText}>Watch Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="add" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Add to Practice</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tricks Library</Text>
        <Text style={styles.subtitle}>Ordered by difficulty and risk</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.key)}>
            <Icon
              name={category.icon}
              size={20}
              color={selectedCategory === category.key ? 'white' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.key &&
                  styles.selectedCategoryText,
              ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={sortedTricks}
        renderItem={renderTrick}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.tricksList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
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
  categoryScroll: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  tricksList: {
    padding: 16,
  },
  trickCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trickHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trickName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  steezPoints: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  trickDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  trickMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  riskIndicators: {
    flexDirection: 'row',
  },
  riskDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  prerequisites: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#fff8e1',
    borderRadius: 6,
  },
  prerequisiteText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#FF9800',
  },
  trickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
});

export default TricksScreen;
