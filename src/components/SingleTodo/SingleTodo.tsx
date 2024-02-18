import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Todo } from '../../models/models';
import { Draggable } from 'react-beautiful-dnd';
import './singleTodoStyles.css';
import { toast } from 'react-toastify';

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
    toast.success('Task edited successfully!');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.error('Task deleted successfully!');
  };

  console.log(todo);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''} ${
            todo.priority
          }`}
        >
          <form onSubmit={e => handleEdit(e, todo.id)}>
            {edit ? (
              <input
                value={editTodo}
                onChange={e => setEditTodo(e.target.value)}
                className="todos__single--text"
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todos__single--text">
                {todo.todo.length > 40
                  ? todo.todo.slice(0, 40) + '...'
                  : todo.todo}
              </s>
            ) : (
              <span className="todos__single--text">
                {todo.todo.length > 40
                  ? todo.todo.slice(0, 40) + '...'
                  : todo.todo}
              </span>
            )}
            <div className="icons">
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <BiEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <BiTrash />
              </span>
            </div>
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
