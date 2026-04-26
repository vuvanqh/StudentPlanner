import { useQuery } from "@tanstack/react-query";
import type { academiEventResponse } from "../../../types/academic-event.types";
import { getAcademicEvent, getAcademicEventByFaculty, getAcademicEvents } from "../../../api/academic-events.api";
import { useUser } from "../../../global-hooks/authHooks";

export function useGetAllAcademicEvents(){
    const {data, isLoading} = useQuery<academiEventResponse[]>({
        queryKey: ["academic-events"],
        queryFn: getAcademicEvents
    })
    return {
        events: data??[],
        isLoading
    }
}

export function useGetAcademicEvent(eventId:string){
    const {data, isLoading} = useQuery<academiEventResponse>({
        queryKey: ["academic-event", eventId],
        queryFn: () => getAcademicEvent(eventId),
    })

    return {
        event: data as academiEventResponse,
        isLoading,
    }
}

export function useGetAcademicEventByFaculty(){
    const {user} = useUser();
    const {data, isLoading} = useQuery<academiEventResponse>({
        queryKey: ["academic-event", user? user.facultyId: "faculty"],
        queryFn: getAcademicEventByFaculty
    })

    return {
        event: data as academiEventResponse,
        isLoading,
    }
}