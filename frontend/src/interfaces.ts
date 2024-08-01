export interface Task {
    id: number;
    name: string;
    user_id: number;
    type: number;
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

export interface UploadFile {
    id: number;
    file_name: string;
}

export interface Comments {
    id: number;
    username: string;
    message: string;
    timestamp: number;
    project_id: number;
}