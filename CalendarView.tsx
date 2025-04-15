"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useAppointments } from "@/context/AppointmentContext";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CalendarView() {
  const [date, setDate] = useState<Value>(new Date());
  const { appointments } = useAppointments();

  // Function to check if a date has appointments
  const hasAppointments = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return appointments.some((appointment) => appointment.date === formattedDate);
  };

  // Custom tile content to highlight dates with appointments
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && hasAppointments(date)) {
      return <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>;
    }
    return null;
  };

  const handleDateChange = (value: Value) => {
    setDate(value);
  };

  return (
    <div className="calendar-container">
      <style jsx global>{`
        .react-calendar {
          width: 100%;
          border: none;
          border-radius: 0.5rem;
          font-family: inherit;
          background-color: transparent;
        }
        .react-calendar button {
          margin: 0;
          border: 0;
          outline: none;
        }
        .react-calendar button:enabled:hover {
          cursor: pointer;
        }
        .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
        }
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
        }
        .react-calendar__navigation button:disabled {
          background-color: #f0f0f0;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #e6e6e6;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75em;
        }
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5em;
        }
        .react-calendar__month-view__weekNumbers .react-calendar__tile {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75em;
          font-weight: bold;
        }
        .react-calendar__tile {
          height: 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: none;
          text-align: center;
          line-height: 16px;
          padding: 8px 6px;
        }
        .react-calendar__tile:disabled {
          background-color: #f0f0f0;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #e6e6e6;
        }
        .react-calendar__tile--now {
          background-color: rgba(59, 130, 246, 0.1);
        }
        .react-calendar__tile--active {
          background-color: #3b82f6;
          color: white;
        }
        .react-calendar__tile--active:hover {
          background-color: #2563eb;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #ef4444;
        }
        .dark .react-calendar {
          color: #e5e7eb;
        }
        .dark .react-calendar__tile--now {
          background-color: rgba(59, 130, 246, 0.2);
        }
        .dark .react-calendar__month-view__days__day--weekend {
          color: #f87171;
        }
        .dark .react-calendar__navigation button:disabled,
        .dark .react-calendar__navigation button:hover:disabled {
          background-color: transparent;
        }
        .dark .react-calendar__tile:disabled {
          background-color: transparent;
          color: #6b7280;
        }
      `}</style>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
        className="rounded-lg shadow-sm bg-white dark:bg-gray-800"
      />
    </div>
  );
} 