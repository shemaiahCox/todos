import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ({skip, limit}) => {
    const response = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    return json.todos
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle'
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.todos.unshift(action.payload)
            },
            prepare(name) {
                return {
                    payload: {
                        id: nanoid(),
                        todo: name,
                        completed: false
                    }
                }
            }
        },
        deleteTodo(state, action) {
            const todoId = action.payload;
            const selectedTodo = state.todos.find(todo => todo.id === todoId);
            const selectedTodoIndex = state.todos.indexOf(selectedTodo);

            state.todos.splice(selectedTodoIndex, 1)
        },
        updateTodo(state, action) {
            const { todoId, newName } = action.payload;
            const selectedTodo = state.todos.find(todo => todo.id === todoId);
            selectedTodo.todo = newName
        },
        todoCompleted(state, action) {
            const todoId = action.payload;
            const selectedTodo = state.todos.find(todo => todo.id === todoId);
            selectedTodo.completed = !selectedTodo.completed
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchTodos.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'success'
            state.todos = action.payload;
        })
    }
})

export default todosSlice.reducer;
export const { addTodo, deleteTodo, updateTodo, todoCompleted } = todosSlice.actions;