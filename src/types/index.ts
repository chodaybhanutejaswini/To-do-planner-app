export type Status = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    date: string;
}

export type SaveNewTaskFn = (title: string, description: string) => void;
export type UpdateTaskFn = (task: Task) => void;