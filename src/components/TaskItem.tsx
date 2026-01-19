import type { Task } from '../types/index';

interface TaskItemProps {
    task: Task;
    onNavigateEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

const TaskItem = ({ task, onNavigateEdit, onDelete }: TaskItemProps) => {
    return (
        <div className="task-item">
            <div className="task-avatar">{task.title[0].toUpperCase()}</div>
            <div className="task-info">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <small>{task.date}</small>
            </div>
            <div className="task-meta">
                <div className="status-label">
                    <span className={`dot ${task.status.toLowerCase().replace(' ', '-')}`}></span>
                    {task.status}
                </div>
                <div className="task-actions">
                    <button className="edit-icon" onClick={(e) => { e.stopPropagation(); onNavigateEdit(task); }}>✎</button>
                    <button className="delete-icon" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>🗑</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;