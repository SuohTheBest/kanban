export interface Task {
    id: number;
    name: string;
    user_id: number;
}

export interface Project {
    id: number;
    subject: string;
    creator: string;
    create_date: string;
    start_date: string;
    end_date: string;
    description: string;
    type: number;
    task_id: number;
}