export interface SDG {
    id: number;
    title: string;
    description: string;
}

export interface UserSDG{
    _id: string;
    userId: string;
    sdgs: number[],
    created_at: Date,
    updated_at: Date
}