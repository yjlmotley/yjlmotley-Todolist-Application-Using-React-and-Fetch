import React, { useState } from "react";
import FetchAll from "./FetchAll";
import { addTaskToApi, deleteTaskFromApi } from "./UpdateApi";


const TodoList = () => {
    // State variables
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTodo = {
                id: Date.now(),
                label: inputValue.trim(),
                done: false
            };
            setTodos([...todos, newTodo]);

            addTaskToApi(todos, inputValue, setTodos); // Pass on todos, inputValue, and setTodos to addTaskToApi in UpdateApi.jsx
            console.log("New Todo Added to API: " + newTodo.label);

            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((todo, i) => index !== i);
        setTodos(updatedTodos);

        deleteTaskFromApi(updatedTodos, setTodos); // Pass on updatedTodos and setTodos to deleteTaskFromApi in UpdateApi.jsx
    };

    const handleClearTasks = () => {
        setTodos([]);
        deleteTaskFromApi([], setTodos);
    };


    return (
        <div className="container text-center">
            <h1 className="mt-5">todos</h1>
            <div className="card todo-card mx-auto mt-5 mb-5" style={{ maxWidth: "800px" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input 
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)} 
                            value={inputValue}
                            onKeyDown={handleAddTodo}
                            placeholder="What needs to be done?"
                        />
                    </li>
                    {todos.length === 0 ? (
                        <li className="list-group-item no-tasks">-- No tasks, add a task --</li>
                    ) : (
                        todos.map((todo, index) => (
                            <li className="list-group-item" key={todo.id}>
                                <div className="list-group-item-todo" id="screen">
                                    {todo.label}
                                </div>
                                <span className="x-container" onClick={() => handleDeleteTodo(index)}>
                                    <i className="fa-solid fa-x"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-secondary">
                    {todos.length} {todos.length === 1 ? "item" : "items"} left
                </div>
                <FetchAll setTodos={setTodos} />
            </div>
            <button id="clear-btn" className="btn btn-danger mb-5 rounded-0" style={{ backgroundColor: 'hsl(0, 100%, 38%)' }} onClick={handleClearTasks}>
                Clear All Tasks
            </button>
            <p>WARNING: Deleting the last task and/or clicking the [Clear All Tasks] button will delete the list as well as the user.</p>
        </div>
    );
};


export default TodoList;