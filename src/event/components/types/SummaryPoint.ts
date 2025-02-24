import { Impediment } from "../types";

export interface SummaryPoint {
    title: string;
    points: string[];
}
  
export interface ScrumEventSummaryResponse {
    summary: SummaryPoint[];
    impediments: Impediment[];
    transcriptionId?: string;
}