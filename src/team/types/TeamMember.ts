export interface TeamMemberBase{
    _id?: string;
    firstName: string,
    lastName: string,
    nickName: string,   
}

export interface TeamMember extends TeamMemberBase {
    teamIds: string[];
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
