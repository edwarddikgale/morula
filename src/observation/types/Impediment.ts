export interface Impediment{
    _id?: string,
    type: string,
    status?: string,
    title: string,
    notes: string,
    ownerId: string,
    source?: string,
    sourceId?: string,
    eventId: string,
    teamId?: string,
    tags?: string[];
    createdById?: string,
    createdAt: Date,
    updatedAt: Date,
}