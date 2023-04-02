import { useSelector } from "react-redux";

export default function Dashboard({ showCompletedTodos, setShowCompletedTodos}) {
    const todos = useSelector(state => state.todos.todos);
    const completedTodos = todos.filter(todo => todo.completed === true);
    const activeTodos = todos.filter(todo => todo.completed === false);

    return (
        <div className="dashboard">
            <h4>{activeTodos.length} Active / {completedTodos.length} Completed</h4>
            <div className="show-completed-todos">
           <input 
                type="checkbox"
                id="show-completed-todos"
                value={showCompletedTodos}
                onChange={() => 
                    setShowCompletedTodos(!showCompletedTodos)
                }
            />
            <label htmlFor="show-completed-todos">
                Show Completed
            </label>
            </div>
            <p><b>{!showCompletedTodos ? 'Mark as complete' : 'Unmark as complete'}</b></p>
        </div>
    )
}