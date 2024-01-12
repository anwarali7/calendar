export function makeDate(time) {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function makeEventsWithDates(events) {
  return events.map(event => {
    let time = event.start.split(':');
    const startDate = new Date();
    startDate.setHours(time[0]);
    startDate.setMinutes(time[1]);
    startDate.setSeconds(0); // tester si utile ou pas
    startDate.setMilliseconds(0); // tester si utile ou pas
    const endDate = new Date(startDate.getTime() + event.duration * 60 * 1000);
    return { ...event, startDate, endDate };
  })
}

export function assignColumns(events) {
  if (events.length === 0) return [];

  const newEvents = [...events];
  const eventsInColumns = [[newEvents[0]]];

  for (const event of newEvents.slice(1)) {
    let eventAdded = false;
    for (const column of eventsInColumns) {
      if (column.length === 0) {
        column.push(event);
        eventAdded = true;
        break;
      }
      const lastEvent = column.at(-1);
      if (event.startDate >= lastEvent.endDate) {
        column.push(event);
        eventAdded = true;
        break;
      }
    }
    if (!eventAdded) {
      eventsInColumns.push([event]);
    }
  }

  eventsInColumns.forEach((column, index) => {
    column.forEach(event => {
      newEvents.find(e => e.id === event.id).column = index;
    })
  });

  return newEvents;
}


// export function assignGroups(events) {
//   if (events.length === 0) return [];
//   const newEvents = [...events];
//   let currentGroup = 0;
//   newEvents[0].group = currentGroup;
//   for (let i = 1; i < newEvents.length; i++) {
//     let eventOverlapsPrevious = false;
//     for (let j = i - 1; j >= 0; j--) {
//       if (newEvents[i].startDate < newEvents[j].endDate) {
//         eventOverlapsPrevious = true;
//         break;
//       }
//     }
//     if (eventOverlapsPrevious) {
//       newEvents[i].group = currentGroup;
//     } else {
//       currentGroup++;
//       newEvents[i].group = currentGroup;
//     }
//   }
//   return newEvents;
// }

export function assignGroupsAndMaxCol(events) {
  if (events.length === 0) return [];
  const newEvents = [...events];
  let currentGroup = 0;
  let maxCol = 0;
  newEvents[0].group = currentGroup;
  for (let i = 1; i < newEvents.length; i++) {
    maxCol = Math.max(maxCol, newEvents[i].column);
    let eventOverlapsPrevious = false;
    for (let j = i - 1; j >= 0; j--) {
      if (newEvents[i].startDate < newEvents[j].endDate) {
        eventOverlapsPrevious = true;
        break;
      }
    }
    if (eventOverlapsPrevious) {
      newEvents[i].group = currentGroup;
    } else {
      currentGroup++;
      newEvents[i].group = currentGroup;
      newEvents.forEach((event, index) => {
        if(event.group === currentGroup-1) {
          newEvents[index].groupCols = maxCol + 1;
        }
      });
      maxCol = 0;
    }
  }
  newEvents.forEach((event, index) => {
    if(event.group === currentGroup) {
      newEvents[index].groupCols = maxCol + 1;
    }
  });
  return newEvents;
}


export function getTopOffset(event, calendarStartDate, minutesInDay) {
  const diff = event.startDate - calendarStartDate;
  if (diff < 0) {
    return "0%";
  }
  const minutes = Math.floor(diff / 1000 / 60);
  return (minutes / minutesInDay * 100).toFixed(2) + "%";
}

export function getLeftOffset(event) {
  return (event.column * 100 / event.groupCols).toFixed(2) + "%";
}

export function getWidth(event) {
  return (100 / event.groupCols).toFixed(2) + "%";
}

export function getHeight(event, minutesInDay) {
  return (event.duration / minutesInDay * 100).toFixed(2) + "%";
}
