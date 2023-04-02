import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteTodo, updateTodo, todoCompleted } from "./todosSlice";

export default function Todo({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(todo.todo);
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();

    function handleDeleteClick() {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteTodo(todo.id));
        }
        return;
    }

    return (
        <li className="todo">
            {!isEditing ?
                <>  
                    <div className="list-item">
                        <label htmlFor="task-completed" className="visually-hidden">Completed</label>
                        <input 
                            type="checkbox" 
                            id="task-completed"
                            value={completed}
                            onChange={() => {
                                setCompleted(!completed)
                                dispatch(todoCompleted(todo.id))
                            }}
                        />
                        <p>{todo.completed ? <s>{todo.todo}</s> : todo.todo}</p>
                    </div>
                    <div className="controls">
                        <button 
                            type="button"
                            onClick={() => 
                                setIsEditing(!isEditing)
                            }
                        >
                            Edit
                        </button>
                        <button 
                            type="button"
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </button>
                    </div>
                </>
            :
                <>
                    <div className="list-item">
                        <label htmlFor="edit-name" className="visually-hidden">Edit Name</label>
                        <input 
                            type="text" 
                            id="edit-name"
                            value={newName}
                            onChange={e => 
                                setNewName(e.target.value)
                            }
                        />
                    </div>
                    <div className="controls">
                        <button 
                            type="button"
                            onClick={() => {
                                    dispatch(updateTodo({todoId: todo.id, newName}))
                                    setIsEditing(false)
                                }
                            }
                        >
                            Save
                        </button>
                        <button 
                            type="button"
                            onClick={() => 
                                setIsEditing(false)
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </>
            }
        </li>
    );
}