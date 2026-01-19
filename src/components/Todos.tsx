import { useState, useEffect } from 'react';
import HomeView from './HomeView';
import AddEditView from './AddEditView';
import type { Task } from '../types/index'
import '../App.css';

const Todos = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('todo_tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [view, setView] = useState<'home' | 'add' | 'edit'>('home');
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        localStorage.setItem('todo_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSaveNewTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            status: 'Pending',
            date: new Date().toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        };
        setTasks([...tasks, newTask]);
        setView('home');
    };

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setView('home');
    };

    const deleteTask = (id: number) => {
        if (window.confirm("Delete this task?")) setTasks(tasks.filter(t => t.id !== id));
    };

    const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="app-container">
            {view === 'home' ? (
                <HomeView tasks={filteredTasks} onNavigateAdd={() => { setCurrentTask(null); setView('add') }} onNavigateEdit={(t) => { setCurrentTask(t); setView('edit'); }} onDelete={deleteTask} onSearch={setSearchQuery} />
            ) : (
                <AddEditView mode={view === 'add' ? 'Add' : 'Edit'} task={currentTask} onSave={view === 'add' ? handleSaveNewTask : handleUpdateTask} onCancel={() => setView('home')} />
            )}
        </div>
    );
};

export default Todos;