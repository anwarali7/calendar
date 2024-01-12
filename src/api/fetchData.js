const eventsA = [
  {
    id: 1,
    start: '9:00',
    duration: 90,
  },
  {
    id: 2,
    start: '9:30',
    duration: 90,
  },
  {
    id: 3,
    start: '10:00',
    duration: 90,
  },
  {
    id: 4,
    start: '11:00',
    duration: 30,
  },
  {
    id: 5,
    start: '13:00',
    duration: 60,
  },
  {
    id: 6,
    start: '13:00',
    duration: 30,
  },
  {
    id: 8,
    start: '16:00',
    duration: 120,
  },
  {
    id: 7,
    start: '15:00',
    duration: 90,
  },
  {
    id: 10,
    start: '18:05',
    duration: 100,
  },
  {
    id: 9,
    start: '16:30',
    duration: 100,
  },
];

/**
 * Fake fetch data from API.
 * @returns {Promise<Array>}
 */
export function fetchCalendarEvents() {
  const delay = Math.floor(Math.random() * 1000) + 500;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(eventsA);
    }, delay);
  });
}