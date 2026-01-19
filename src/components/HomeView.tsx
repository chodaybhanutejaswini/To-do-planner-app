import { useState } from 'react';
import type { Task, Status } from '../types/index';
import TaskItem from './TaskItem';

interface HomeProps {
    tasks: Task[];
    onNavigateAdd: () => void;
    onNavigateEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onSearch: (query: string) => void;
}

const HomeView = ({ tasks, onNavigateAdd, onNavigateEdit, onDelete, onSearch }: HomeProps) => {
    const statuses: Status[] = ['In Progress', 'Pending', 'Completed'];
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({
        'In Progress': false, 'Pending': false, 'Completed': false
    });

    const toggleSection = (status: string) => {
        setCollapsed(prev => ({ ...prev, [status]: !prev[status] }));
    };

    return (
        <div className="card">
            <header className="header">TO-DO APP</header>
            <div className="content">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="Search To-Do" onChange={(e) => onSearch(e.target.value)} />
                </div>

                {statuses.map(status => {
                    const group = tasks.filter(t => t.status === status);
                    const isCollapsed = collapsed[status];

                    return (
                        <div key={status} className="category-section">
                            <div className="category-header" onClick={() => toggleSection(status)}>
                                <span>{status} ({group.length})</span>
                                <span className={`arrow ${isCollapsed ? 'collapsed' : ''}`}>{isCollapsed ? '▶' : '▼'}</span>
                            </div>
                            {!isCollapsed && (
                                <div className="task-list-container">
                                    {group.length > 0 ? (
                                        group.map(task => (
                                            <TaskItem key={task.id} task={task} onNavigateEdit={onNavigateEdit} onDelete={onDelete} />
                                        ))
                                    ) : <div className="empty-msg">No tasks here</div>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button className="fab" onClick={onNavigateAdd}>+</button>
        </div>
    );
};

export default HomeView;