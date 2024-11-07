import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Adjust the path if necessary


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/api/todos'); // Adjust the URL if needed
        console.log(response)
        setTodos(response.data.data);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        const newTodo = {
            taskName,
            taskDescription,
            taskStatus,
            taskPriority
        };

        await axios.post('/api/todos', newTodo);
        fetchTodos(); // Refresh the list after adding
        resetForm();
    };

    const deleteTodo = async (id) => {
        await axios.delete(`/api/todos/${id}`);
        fetchTodos(); // Refresh the list after deletion
    };

    const updateTodo = async (e) => {
        e.preventDefault();
        const updatedTodo = {
            taskName,
            taskDescription,
            taskStatus,
            taskPriority
        };

        await axios.put(`/api/todos/${editId}`, updatedTodo);
        fetchTodos(); // Refresh the list after updating
        resetForm();
    };

    const editTodo = (todo) => {
        setTaskName(todo.taskName);
        setTaskDescription(todo.taskDescription);
        setTaskStatus(todo.taskStatus);
        setTaskPriority(todo.taskPriority);
        setEditId(todo._id);
    };

    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskStatus('');
        setTaskPriority('');
        setEditId(null);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <form onSubmit={editId ? updateTodo : addTodo}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                />
                 <input
                    type="text"
                    placeholder="Status"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    required
                />
                <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    required
                >

                    <option value="" disabled>Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit">{editId ? 'Update' : 'Add'} Task</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <h3>{todo.taskName}</h3>
                        <p>{todo.taskDescription}</p>
                        <p>Status: {todo.taskStatus}</p>
                        <p>Date: {new Date(todo.taskDate).toLocaleDateString()}</p>
                        <p>Priority: {todo.taskPriority}</p>
                        <button onClick={() => editTodo(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
