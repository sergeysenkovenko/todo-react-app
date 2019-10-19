import React from "react";
import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDelete, onToggleImportant, onToggleDone }) => {
  const placeholder = () => {
    return <div className="list-placeholder">Nothing to show</div>;
  };

  const elements = todos.map(item => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDelete={() => onDelete(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });
  return (
    <ul className="list-group todo-list">
      {elements.length > 0 ? elements : placeholder()}
    </ul>
  );
};

export default TodoList;
