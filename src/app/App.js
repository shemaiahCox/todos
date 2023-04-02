import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTodo from '../components/todos/AddTodo';
import TodosList from '../components/todos/TodosList';
import Dashboard from '../components/dashboard/Dashboard';
import { fetchTodos } from '../components/todos/todosSlice';

// TODO
  // Add focus for when todos is edited

function App() {
  const [showCompletedTodos, setShowCompletedTodos] = useState(false)
  const dispatch = useDispatch();
  const status = useSelector(state => state.todos.status)

  useEffect(() => {
    if (status === 'idle') {
      const fecthOptions = {
        skip: Math.floor(Math.random() * 6),
        limit: Math.floor(Math.random() * 11) + 1
      }
      dispatch(fetchTodos(fecthOptions))
    }
  }, [status])

  return (
    <div className="App">
      <header>
        <div className='logo'></div>
        <h1>Todos</h1>
      </header>
      <AddTodo />
      <Dashboard 
        showCompletedTodos={showCompletedTodos}
        setShowCompletedTodos={setShowCompletedTodos}
      />
      <TodosList showCompletedTodos={showCompletedTodos}/>
    </div>
  );
}

export default App;
