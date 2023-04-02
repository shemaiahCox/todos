import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../components/todos/todosSlice";

export default configureStore({
    reducer: {
        todos: todosReducer
    }
})