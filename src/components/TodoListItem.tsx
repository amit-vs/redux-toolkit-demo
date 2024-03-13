import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Todo} from '../state/slices/todo';

type TodoListItemProps = {
  todo: Todo;
  handleTodoStateChange: (id: string) => void;
  handleRemoveTodo: (id: string) => void;
};

const TodoListItem = (props: TodoListItemProps) => {
  const {todo, handleTodoStateChange, handleRemoveTodo} = props;

  const handleButtonPress = () => {
    handleTodoStateChange(todo.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{todo.title}</Text>
      </View>
      <Button
        title={todo.completed ? 'Reset' : 'Complete'}
        onPress={handleButtonPress}
      />
      <Button title="Delete" onPress={() => handleRemoveTodo(todo.id)} />
    </View>
  );
};

export default TodoListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});
