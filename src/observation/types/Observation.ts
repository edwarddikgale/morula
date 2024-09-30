import { AgilePattern } from "agilepatterns/types";
import { Hypothesis, ScrumValuesAnalyses } from "./ScrumAnalysis";

export interface Observation{
    _id?: string,
    type: string,
    title: string,
    notes: string,
    source?: string,
    sourceId?: string,
    eventId: string,
    teamId?: string,
    patterns?: AgilePattern[],
    hypotheses?: Hypothesis[],
    scrumValuesAnalyses?: ScrumValuesAnalyses,
    tags?: string[];
    createdById?: string,
    createdAt: Date,
    updatedAt: Date,
}