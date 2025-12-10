import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useTasks } from '../context/TaskContext';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { markTaskDone, deleteTask } = useTasks();

  const handleMarkDone = async () => {
    if (task.status === 'done') {
      Alert.alert('Info', 'This task is already marked as done');
      return;
    }

    Alert.alert(
      'Mark as Done',
      'Are you sure you want to mark this task as done?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            const result = await markTaskDone(task.id);
            if (result.success) {
              Alert.alert('Success', 'Task marked as done', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteTask(task.id);
            if (result.success) {
              Alert.alert('Success', 'Task deleted successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    return status === 'done' ? '#10B981' : '#F59E0B';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {task.status === 'done' ? '✓ Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        {task.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Due Date</Text>
          <Text style={styles.infoText}>
            {new Date(task.due_date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.infoSubText}>
            at {new Date(task.due_date).toLocaleTimeString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Created</Text>
          <Text style={styles.infoText}>
            {new Date(task.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {task.status === 'pending' && (
            <TouchableOpacity
              style={[styles.button, styles.doneButton]}
              onPress={handleMarkDone}
            >
              <Text style={styles.buttonText}>✓ Mark as Done</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>🗑️ Delete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  infoText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  infoSubText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: '#10B981',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskDetailsScreen;