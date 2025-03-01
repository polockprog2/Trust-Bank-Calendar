import React, { useContext, useState } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
import "../assets/styles.css";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCreateEvent = () => {
    setShowEventModal(true);
    setIsOpen(false);
  };

  const handleCreateTask = () => {
    // Logic to create a task with a reminder
    setShowEventModal(true);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      >
        <img src={plusImg} alt="create_event" className="w-7 h-7" />
        <span className="pl-3 pr-7"> Create</span>
      </button>
      {isOpen && (
        <div className="bg-gray-100 shadow-sm rounded-md  ">
          <button
            onClick={handleCreateEvent}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Event
          </button>
          <button
            onClick={handleCreateTask}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Task
          </button>
        </div>
      )}
    </div>
  );
}