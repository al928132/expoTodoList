import { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Platform } from 'react-native';
import { CheckBox, Input, Button, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';

const defaultTasks = [
  { key: '1', description: 'Buy groceries', completed: false },
  { key: '2', description: 'Walk the dog', completed: false },
  { key: '3', description: 'Do laundry', completed: true },
  { key: '4', description: 'Read a book', completed: false },
  { key: '5', description: 'Write some code', completed: false },
];

export default function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const newTask = {
      key: Date.now().toString(),
      description: trimmed,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        containerStyle={styles.checkbox}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedText,
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Todo List</Text>

      <View style={styles.inputRow}>
        <Input
          placeholder="New task..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
          containerStyle={styles.inputContainer}
          returnKeyType="done"
        />
        <Button title="Add" onPress={addTask} buttonStyle={styles.addButton} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flex: 1,
  },
  addButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#999',
  },
});
