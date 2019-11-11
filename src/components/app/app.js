import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default class App extends Component {
  state = {
    todoData: this.readStorage(),
    search: "",
    filter: "all"
  };

  createItem = label => {
    return {
      label,
      important: false,
      done: false,
      id: Date.now()
    };
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(el => el.id === id);
      const newArr = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];
      return {
        todoData: newArr
      };
    });
  };

  addItem = text => {
    const newItem = this.createItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex(el => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      const newArr = this.toggleProperty(todoData, id, "important");
      return {
        todoData: newArr
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      const newArr = this.toggleProperty(todoData, id, "done");
      return {
        todoData: newArr
      };
    });
  };

  onSearch = (items, search) => {
    if (!search) {
      return items;
    }
    return items.filter(el =>
      el.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  onFilter = (items, filter) => {
    switch (filter) {
      case "all": {
        return items;
      }
      case "done": {
        return items.filter(el => el.done);
      }
      case "active": {
        return items.filter(el => !el.done);
      }
      default: {
        return items;
      }
    }
  };

  onSearchItem = search => {
    this.setState({
      search
    });
  };

  onFilterChange = filter => {
    this.setState({
      filter
    });
  };

  persistData = data => {
    localStorage.setItem("items", JSON.stringify(data));
  };

  readStorage () {
    const storage = JSON.parse(localStorage.getItem("items"));
      if(!storage){
        return []
      }
    return storage
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.todoData !== prevState.todoData){
      this.persistData(this.state.todoData);
    }
  }

  render() {
    const { todoData, search, filter } = this.state;
    const filteredItems = this.onFilter(
      this.onSearch(todoData, search),
      filter
    );
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchItem={this.onSearchItem} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={filteredItems}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdd={this.addItem} />
      </div>
    );
  }
}
