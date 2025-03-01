import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import WeekView from "./components/WeekView";
import DayView from "./components/DayView";
import GlobalContext, { ContextWrapper } from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, viewMode, savedEvents, dispatchCalEvent } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const updatedEvents = Array.from(savedEvents);
    const [movedEvent] = updatedEvents.splice(source.index, 1);
    updatedEvents.splice(destination.index, 0, movedEvent);

    dispatchCalEvent({ type: "update", payload: updatedEvents });
  };

  return (
    <ContextWrapper>
      <React.Fragment>
        {showEventModal && <EventModal />}
        
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            {viewMode === "month" && <Month month={currentMonth} />}
            {viewMode === "week" && <WeekView />}
            {viewMode === "day" && <DayView />}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="calendar">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {savedEvents.map((event, index) => (
                      <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="event-card">
                              <h3>{event.title}</h3>
                              <p>{event.description}</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </React.Fragment>
    </ContextWrapper>
  );
}

export default App;