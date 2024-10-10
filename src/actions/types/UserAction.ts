import { Action } from "./Action";

export interface UserAction extends Action{
    userId: string | null;
    eventId?: string | null;
}