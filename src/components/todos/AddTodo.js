import { useState } from "react";
import { addTodo } from "./todosSlice";
import { useDispatch } from "react-redux";

export default function AddTodo() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    function handleAddClick() {
        if (name !== '') {
            dispatch(addTodo(name))
        }
        setName('')
    }

    return (
        <div className="add-todo">
            <label htmlFor="todo-name" className="visually-hidden">Add New Todo</label>
            {/* <h3>(+) New Todo</h3> */}
            <div className="add-todo-input">
                <input 
                    type="text" 
                    id="todo-name"
                    placeholder="What needs to be done?"
                    value={name}
                    onChange={(e) => 
                        setName(e.target.value)
                    }
                />
                <button 
                    type="button"
                    onClick={handleAddClick}
                >
                    Add
                </button>
            </div>
        </div>
    );
}