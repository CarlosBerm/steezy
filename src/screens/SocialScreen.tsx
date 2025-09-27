import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SocialPost } from "../types";

const SocialScreen: React.FC = () => {
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Mock social feed data
  const feedPosts: SocialPost[] = [
    {
      id: "1",
      userId: "alex_rider",
      content:
        "Just landed my first backside 360! 🔥 Been working on this for weeks!",
      trickId: "4",
      likes: ["user1", "user2", "user3"],
      comments: [
        {
          id: "c1",
          userId: "sarah_shreds",
          content: "So clean! Great progress! 🙌",
          createdAt: new Date("2024-01-20T10:30:00"),
        },
        {
          id: "c2",
          userId: "mike_mountain",
          content: "Nice! That grab was perfect",
          createdAt: new Date("2024-01-20T11:15:00"),
        },
      ],
      createdAt: new Date("2024-01-20T09:45:00"),
    },
    {
      id: "2",
      userId: "sarah_shreds",
      content:
        "Level 5 unlocked! 🏆 Finally hit that 2000 steez points milestone. Next goal: frontflip!",
      likes: ["user1", "alex_rider", "mike_mountain"],
      comments: [
        {
          id: "c3",
          userId: "alex_rider",
          content: "Congrats! You're killing it this season",
          createdAt: new Date("2024-01-19T16:20:00"),
        },
      ],
      createdAt: new Date("2024-01-19T15:30:00"),
    },
    {
      id: "3",
      userId: "mike_mountain",
      content:
        "Perfect powder day at Whistler! Got some sick footage of my method grab. Nothing beats that feeling! ⛷️",
      trickId: "6",
      likes: ["user1", "sarah_shreds"],
      comments: [],
      createdAt: new Date("2024-01-18T12:00:00"),
    },
  ];

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      return "Just now";
    }
  };

  const renderPost = ({ item }: { item: SocialPost }) => (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={24} color="#666" />
          </View>
          <View>
            <Text style={styles.username}>@{item.userId}</Text>
            <Text style={styles.timestamp}>
              {formatTimeAgo(item.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Video placeholder */}
      {item.trickId && (
        <View style={styles.videoPlaceholder}>
          <Icon name="play-circle-filled" size={48} color="white" />
          <Text style={styles.videoLabel}>Trick Video</Text>
        </View>
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon
            name="favorite"
            size={20}
            color={item.likes.includes("user1") ? "#F44336" : "#666"}
          />
          <Text style={styles.actionText}>{item.likes.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleComments(item.id)}
        >
          <Icon name="comment" size={20} color="#666" />
          <Text style={styles.actionText}>{item.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      {showComments[item.id] && (
        <View style={styles.commentsSection}>
          {item.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Icon name="person" size={16} color="#666" />
              </View>
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>@{comment.userId}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <Text style={styles.commentTime}>
                  {formatTimeAgo(comment.createdAt)}
                </Text>
              </View>
            </View>
          ))}

          {/* Add Comment Input */}
          <View style={styles.addComment}>
            <View style={styles.commentAvatar}>
              <Icon name="person" size={16} color="#666" />
            </View>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Icon name="send" size={20} color="#2196F3" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Social Feed</Text>
        <TouchableOpacity style={styles.createPostButton}>
          <Icon name="add" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Feed Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Tricks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Achievements</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={feedPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedList}
        showsVerticalScrollIndicator={false}
        refreshing={false}
        onRefresh={() => {
          // Refresh feed logic
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  createPostButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  activeFilter: {
    backgroundColor: "#2196F3",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  feedList: {
    paddingVertical: 8,
  },
  postCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: "#333",
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  videoLabel: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
  },
  postActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  comment: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: "#666",
  },
  addComment: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 80,
  },
  sendButton: {
    padding: 4,
  },
});

export default SocialScreen;
