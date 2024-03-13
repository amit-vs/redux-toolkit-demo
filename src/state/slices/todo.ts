import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { RootStore } from "../store";

const FETCH_TODO_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';
// Redux-toolkit
/**
 * Store
 * Actions
 * Reduces
 */

/**
 * dispatch({type: 'GET_ALL_POST', payload: data[]})
 * 
 * switch(type){
 *  case GET_ALL_POST: 
 *  return {
 *  ...state,
 *  posts: action.payload
 * }
 * }
 * 
 * 
 * reducer
 * actions
 * action-types
 * 
 * 
 * actions ->fetchTodo
 * actions -> delete
 * toggle
 * 
 * 
 * useSelector
 * 
 * useDispatch
 */


export type Todo = {
    id: string;
    title: string;
    completed: boolean
}

type InitialStateTypes = {
    todos: Todo[]
}

const initialState: InitialStateTypes = {
    todos: []
}

export const fetchAllTodos = createAsyncThunk('fetch/todos', async () => {
    try {
        const response = await fetch(FETCH_TODO_ENDPOINT);
        const data = await response.json();
        return data.splice(0, 5);
    } catch (error) {
        return [];
    }
});

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo: Todo = {
                id: nanoid(),
                title: action.payload,
                completed: false
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTodos.pending, (state, action) => {
            state.todos = [];
        });
        builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        });
        builder.addCase(fetchAllTodos.rejected, (state, action) => {
            state.todos = state.todos
        });
    }
})

export const getAllTodos = (state: RootStore) => state.todoReducer.todos;
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer