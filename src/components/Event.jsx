import { useMemo } from 'react';
import './Event.css';

/**
 * The event prop has an id, start and end time.
 * @param {event: {
 *  id: string,
 *  top: string,
 *  left: string,
 *  width: string,
 *  height: string
 * }} param0 
 * @returns 
 */
function Event({ id, top, left, width, height }) {

  return (
    <div
      className="event"
      style={{
        top,
        left,
        width,
        height
      }}
    >
      {id}
    </div>
  )
}

export default Event;