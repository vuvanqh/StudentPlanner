import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"  // needed for dayClick
import type { EventContentArg } from '@fullcalendar/core'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { EventClickArg } from '@fullcalendar/core'
import type { personalEventResponse } from '../../types/personalEventTypes'
// import { useState } from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
import type { CalendarApi } from '@fullcalendar/core';

const handleEventClick = (arg: EventClickArg) => {
  alert(`Event: ${arg.event.title}`)
}

const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr)
}

export default function Calendar({events}:{events: personalEventResponse[]}) {
  const mappedEvents = events.map(e => ({
    id: e.id,
    title: e.title,
    start: new Date(e.startTime),
    end: new Date(e.endTime),
    extendedProps: {
      description: e.description,
      location: e.location
    }
  }));

  const calendarRef = useRef<any>(null);
  const changeView = (viewName: "dayGridMonth" | "timeGridWeek") => {
    const api = calendarRef.current?.getApi();
    api?.changeView(viewName);
  };

  return <div className="calendar-wrapper">
    <div style={{ marginBottom: "10px" }}>
      <button onClick={() => changeView("dayGridMonth")}>Month</button>
      <button onClick={() => changeView("timeGridWeek")}>Week</button>
    </div>

    <FullCalendar
     ref={calendarRef}
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    weekends={true}
    firstDay={1}
    eventContent={renderEventContent}   
    events={[
        { title: 'event 1', start: '2026-03-28' },
        { title: 'event 2', start: '2019-04-02' },
        ...mappedEvents
    ]}
    eventClick={handleEventClick}
    dateClick={handleDateClick}
    />
  </div>
}



function renderEventContent(eventInfo: EventContentArg) {
  return(
    <div style={{ fontSize: '0.75rem' }}>
      <div>
        <b>{eventInfo.timeText}</b>
      </div>

      <div>
        <i>{eventInfo.event.title}</i>
      </div>      
    </div>
  );
}