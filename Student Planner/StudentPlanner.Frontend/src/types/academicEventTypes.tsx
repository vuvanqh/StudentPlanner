import type { personalEventResponse } from "./personalEventTypes";

export type academicEventResponse = personalEventResponse & {
    facultyId: string;
}