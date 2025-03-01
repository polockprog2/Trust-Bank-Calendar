import React, { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function WeekView() {
  const { savedEvents } = useContext(GlobalContext);

  // Get the start of the current week
  const startOfWeek = dayjs().startOf("week");

  // Generate an array of days for the current week
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  // Generate an array of hours for a day
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Week View</h2>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map(day => (
          <div key={day.format("YYYY-MM-DD")} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{day.format("dddd, MMM D")}</h3>
            <div className="grid grid-rows-24 gap-1">
              {hoursOfDay.map(hour => (
                <div key={hour} className="border-t border-gray-200 p-1">
                  <span className="text-xs text-gray-500">{dayjs().hour(hour).format("h A")}</span>
                  <ul className="list-disc pl-5">
                    {savedEvents
                      .filter(event => dayjs(event.date).isSame(day.hour(hour), "hour"))
                      .map(event => (
                        <li key={event.id} className="mb-2">
                          <span className="font-medium">{event.title}</span>
                          <p className="text-gray-600">{event.description}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}