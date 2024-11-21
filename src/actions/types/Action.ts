export interface Action {
    id?: string | null,
    title: string;
    description: string;
    requirement: string | null,
    frequency: string | null,
    actionType: string | null,
    piResource: string | null,
    resourceUrl: string | null,
    source: string | null,
    sdg: number | null,
    createdAt?: Date
}
