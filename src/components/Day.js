import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import PublicHolidays from "./PublicHoliday"; // Import PublicHolidays

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    multiDaySelection,
    setMultiDaySelection,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  function handleDayClick() {
    if (multiDaySelection.length > 0) {
      setMultiDaySelection([...multiDaySelection, day]);
    } else {
      setDaySelected(day);
      setShowEventModal(true);
    }
  }

  function handleDayMouseDown() {
    setMultiDaySelection([day]);
  }

  function handleDayMouseUp() {
    if (multiDaySelection.length > 1) {
      setShowEventModal(true);
    }
  }

  return (
    <div
      className="border border-gray-200 flex flex-col"
      onMouseDown={handleDayMouseDown}
      onMouseUp={handleDayMouseUp}
      onClick={handleDayClick}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
      <PublicHolidays country="US" year={2025} /> {/* Add PublicHolidays */}
    </div>
  );
}