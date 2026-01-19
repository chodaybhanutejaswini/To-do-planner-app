import { useState } from 'react';
import type { Task, Status, SaveNewTaskFn, UpdateTaskFn } from '../types/index';

interface FormProps {
    mode: 'Add' | 'Edit';
    task?: Task | null;
    onSave: SaveNewTaskFn | UpdateTaskFn;
    onCancel: () => void;
}

const AddEditView = ({ mode, task, onSave, onCancel }: FormProps) => {
    const [title, setTitle] = useState(task?.title || '');
    const [desc, setDesc] = useState(task?.description || '');
    const [status, setStatus] = useState<Status>(task?.status || 'Pending');

    const handleAction = () => {
        if (!title.trim()) return alert("Title is required");
        if (mode === 'Edit' && task) {
            (onSave as UpdateTaskFn)({ ...task, title, description: desc, status });
        } else {
            (onSave as SaveNewTaskFn)(title, desc);
        }
    };

    return (
        <div className="card">
            <header className="header blue-bg">
                <button className="back-btn" onClick={onCancel}>←</button>
                {mode} Task
            </header>
            <div className="form-body">
                <input className="input-box" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                <textarea className="input-box textarea" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter description" />
                {mode === 'Edit' && (
                    <div className="dropdown-container">
                        <select value={status} onChange={(e) => setStatus(e.target.value as Status)}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                )}
                <div className="btn-row">
                    <button className="btn outline" onClick={onCancel}>Cancel</button>
                    <button className="btn solid" onClick={handleAction}>{mode === 'Edit' ? 'Update' : 'ADD'}</button>
                </div>
            </div>
        </div>
    );
};

export default AddEditView;