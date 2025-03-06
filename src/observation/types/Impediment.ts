export interface IGenericImpediment {
    type: string,
    title: string,
    description?: string,
    status?: string
}

export interface Impediment extends IGenericImpediment{
    _id?: string,
    notes: string,
    ownerId?: string,
    creatorId: string,
    source?: string,
    sourceId?: string,
    eventId: string,
    teamId?: string,
    tags?: string[];
    createdById?: string,
    createdAt: Date,
    updatedAt: Date,
}

export function convertToImpediment(
    genericImpediment: IGenericImpediment,
    eventId: string,
    creatorId: string,
    notes: string,
): Impediment {
    const now = new Date();

    return {
        ...genericImpediment,
        notes: notes,                   // Default notes field, you can modify as needed
        creatorId: creatorId,
        eventId: eventId,
        createdAt: now,
        updatedAt: now,
    };
}

export interface ImpedimentType {
    code: string;
    title: string;
}

export interface ImpedimentStatus {
    value: string;
    title: string;
}

export interface ImpedimentOwner {
    _id: string,
    firstName: string,
    lastName: string,
    nickName?: string
}