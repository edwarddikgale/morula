export interface Team {
    _id?: string;
    userId: string;
    parentTeamId?: string;
    parentName?: string;
    organisationId?: string;
    name: string,
    description: string,
    code: string,
    isActive: boolean,
    dailyStartTime: string,
    dailyEndTime: string,
    timeZone: string,
    language: string | null,
    createdAt: Date,
    updatedAt: Date,
    memberCount?: number
}
