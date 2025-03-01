import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicHolidays = ({ country, year }) => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          ``
        );
        setHolidays(response.data.response.holidays || []);
      } catch (err) {
        setError("Failed to fetch public holidays.");
      }
    };

    fetchHolidays();
  }, [country, year]);

  const groupedHolidays = holidays.reduce((acc, holiday) => {
    const date = holiday.date.iso;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(holiday);
    return acc;
  }, {});

  return (
    <div className="public-holidays">
     
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {Object.keys(groupedHolidays).map((date) => (
            <li key={date}>
              <strong>{date}</strong>
              <ul>
                {groupedHolidays[date].slice(0, 2).map((holiday) => (
                  <li key={holiday.name}>
                    {holiday.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicHolidays;