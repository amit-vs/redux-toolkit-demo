import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {fetchAllTodos, getAllTodos} from '../state/slices/todo';

import TodoListItem from './TodoListItem';

import {addTodo, removeTodo, toggleTodo} from '../state/slices/todo';
import {useAppDispatch} from '../state/store';

const Todos: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const todos = useSelector(getAllTodos);

  const dispatch = useAppDispatch();

  const addTodoHandler = () => {
    if (newTodoText.trim() !== '') {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  return (
    <View>
      <Text style={styles.title}>Todos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Enter a new todo"
        />
        <Button title="Add Todo" onPress={addTodoHandler} />
      </View>
      <View style={styles.todoContainer}>
        {todos.map(todo => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleTodoStateChange={id => {
              dispatch(toggleTodo(id));
            }}
            handleRemoveTodo={id => {
              dispatch(removeTodo(id));
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoContainer: {
    top: 50,
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    fontSize: 24,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default Todos;
