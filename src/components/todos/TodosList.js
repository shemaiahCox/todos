import { useSelector } from "react-redux";

import Todo from "./Todo";

export default function TodosList({ showCompletedTodos }) {
    const todos = useSelector(state => state.todos.todos);
    const completedTodos = todos.filter(todo => todo.completed === true);
    const status = useSelector(state => state.todos.status)

    return (
        <div className="todos-list">
            {status === 'pending' && <div className='loading'></div>}
           {!showCompletedTodos ?
            todos.map(todo =>
                todo.completed ? '' : <Todo key={todo.id} todo={todo} />
            )
            :
            completedTodos.map(todo =>
                <Todo key={todo.id} todo={todo} />
            )
           }
        </div>
    );
}