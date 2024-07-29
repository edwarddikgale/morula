export interface Task {
    id: string;
    refId: string;
    content: string;
    parentTitle: string;
    parentId: string;
    sdg: number;
    status: string;
}