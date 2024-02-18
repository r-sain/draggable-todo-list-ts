import React, { useRef, useState } from 'react';
import './inputFieldStyles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (todo: string, priority: string) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const [selectedPriority, setSelectedPriority] = useState<string>('low'); // State to track selected priority
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePrioritySelection = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleAddTask = () => {
    if (todo.trim() !== '') {
      handleAdd(todo, selectedPriority);
      setTodo('');
      setSelectedPriority('low');
      inputRef.current?.blur();
    }
  };

  return (
    <form className="input" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={e => setTodo(e.target.value)}
        className="input__box"
      />
      <div className="buttons">
        <div className="priority-buttons">
          <button
            id="left-edge"
            className={`input_submit1 ${
              selectedPriority === 'high' ? 'selected' : ''
            }`}
            onClick={() => handlePrioritySelection('high')}
          >
            high
          </button>
          <button
            className={`input_submit1 ${
              selectedPriority === 'medium' ? 'selected' : ''
            }`}
            onClick={() => handlePrioritySelection('medium')}
          >
            medium
          </button>
          <button
            id="right-edge"
            className={`input_submit1 ${
              selectedPriority === 'low' ? 'selected' : ''
            }`}
            onClick={() => handlePrioritySelection('low')}
          >
            low
          </button>
        </div>
        <div className="submit-button">
          <button
            type="button"
            onClick={handleAddTask}
            className={`input_submit ${selectedPriority ? '' : 'disabled'}`}
          >
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputField;
