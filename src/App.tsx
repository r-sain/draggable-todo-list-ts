import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField/InputField';
import TodoList from './components/TodoList/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './models/models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [startedTodos, setStartedTodos] = useState<Array<Todo>>([]);
  console.log(todos);
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedCompletedTodos = localStorage.getItem('completedTodos');
    const storedStartedTodos = localStorage.getItem('startedTodos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }

    if (storedStartedTodos) {
      setStartedTodos(JSON.parse(storedStartedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  useEffect(() => {
    localStorage.setItem('startedTodos', JSON.stringify(startedTodos));
  }, [startedTodos]);

  const handleAdd = (todo: string, priority: string) => {
    if (todo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), todo, isDone: false, priority }]);
      setTodo('');
      toast.success('Task added successfully!');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = [...todos];
    let complete = [...completedTodos];
    let started = [...startedTodos];

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === 'TodosRemove') {
      add = complete[source.index];
      complete.splice(source.index, 1);
    } else {
      add = started[source.index];
      started.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'TodosRemove') {
      complete.splice(destination.index, 0, add);
    } else {
      started.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    setStartedTodos(started);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Todo List</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          startedTodos={startedTodos}
          setStartedTodos={setStartedTodos}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={500}
          pauseOnHover={false}
          theme="dark"
        />
      </div>
    </DragDropContext>
  );
};

export default App;
