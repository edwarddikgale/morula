export interface Transcription{
    _id?: string,
    eventId?: string,
    createdAt: Date,
    updatedAt: Date,
    timeZone: string,
    language: string | null,
    title: string,
    raw: string,
}
