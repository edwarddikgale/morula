export interface TaskSummary {
    taskId: string;
    title: string;
    status: string;
    hasEvidence: boolean;
}

export interface ActionSummary {
    actionId: string;
    actionTitle: string;
    tasks: TaskSummary[];
}

export interface UserSdgSummary {
    _id: string;
    userId: string;
    sdgs: number[];
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface EventDates {
    from: string;
    to: string;
}

export interface ProfileSummary{
    organisation: string;
    country: string;
    fullName: string;
}

export interface IOrgSettingSummary{
    year: number | null,
    companyPurpose: string | null,
    iso20121Scope: string | null,
}

export interface IEventSummary{
    eventTitle: string;
    eventSummary: string;
    eventDescription: string;
    attendee_estimate: string;
    userSdg: UserSdgSummary;
    eventDates: EventDates;
    actions: ActionSummary[];
    completionRate: string;
    profile: ProfileSummary;
    orgSettings: IOrgSettingSummary;
}
