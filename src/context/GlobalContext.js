import React, { useState } from "react";
import dayjs from "dayjs";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
  viewMode: "month", // Default to "month" view
  setViewMode: () => {}, // Function placeholder
});

export function ContextWrapper({ children }) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [viewMode, setViewMode] = useState("month");
  const [showEventModal, setShowEventModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth: 0,
        setSmallCalendarMonth: () => {},
        daySelected: null,
        setDaySelected: () => {},
        showEventModal,
        setShowEventModal,
        dispatchCalEvent: () => {},
        savedEvents: [],
        selectedEvent: null,
        setSelectedEvent: () => {},
        setLabels: () => {},
        labels: [],
        updateLabel: () => {},
        filteredEvents: [],
        viewMode, // Provide viewMode state
        setViewMode, // Provide setViewMode function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;