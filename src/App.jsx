import { useState, useEffect } from 'react';
import { fetchCalendarEvents } from './api/fetchData';
import { 
  makeDate,
  makeEventsWithDates,
  assignColumns,
  // assignGroups,
  assignGroupsAndMaxCol,
  getTopOffset,
  getLeftOffset,
  getWidth,
  getHeight,
} from './utils/eventsUtils';

import Event from './components/Event';

import './App.css'

const START_TIME = makeDate("8:00");
const END_TIME = makeDate("21:00");
const MINUTES = Math.floor((END_TIME - START_TIME) / 1000 / 60);

function App() {
  const [events, setEvents] = useState([]);
  const [preparedEvents, setPreparedEvents] = useState([]);

  useEffect(() => {
    fetchCalendarEvents()
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []); // empty dependency array to fetch data once

  useEffect(() => {
    console.log(events);

    console.log("Events with dates");
    let newEvents = makeEventsWithDates(events);
    console.log(JSON.parse(JSON.stringify(newEvents)));
    
    console.log("Sorted events by start date");
    newEvents.sort((a, b) => {
      return a.startDate - b.startDate;
    });
    console.log(JSON.parse(JSON.stringify(newEvents)));

    console.log("Assing columns to events");
    newEvents = assignColumns(newEvents);
    console.log(JSON.parse(JSON.stringify(newEvents)));

    // console.log("Find groups of overlapping events")
    // newEvents = assignGroups(newEvents);
    // console.log(JSON.parse(JSON.stringify(newEvents)));

    console.log("Assign max column of group to each event");
    newEvents = assignGroupsAndMaxCol(newEvents);
    console.log(JSON.parse(JSON.stringify(newEvents)));

    newEvents.forEach(element => {
      element.top = getTopOffset(element, START_TIME, MINUTES);
      element.left = getLeftOffset(element);
      element.width = getWidth(element);
      element.height = getHeight(element, MINUTES);
    });

    setPreparedEvents(newEvents);
  }, [events]);

  return (
    <div className="app">
      {
        preparedEvents.map(event => (
          <Event key={event.id} {...event} />
        ))
      }
    </div>
  )
}

export default App
