export interface TeamMember {
    _id?: string;
    teamIds: string[];
    firstName: string,
    lastName: string,
    nickName: string,
    jobTitle: string,
    description: string,
    isActive: boolean,
    workStartTime: string,
    workEndTime: string,
    timeZone: string,
    language: string | null,
    createdAt: Date,
    updatedAt: Date
}
