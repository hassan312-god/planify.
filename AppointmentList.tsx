"use client";

import { useState } from "react";
import { useAppointments } from "@/context/AppointmentContext";
import { FiEdit2, FiTrash2, FiClock, FiCalendar } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { Modal } from "./Modal";
import { AppointmentForm } from "./AppointmentForm";

export function AppointmentList() {
  const { appointments, deleteAppointment } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);

  const handleEdit = (id: string) => {
    setSelectedAppointmentId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointment(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointmentId(undefined);
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-500 dark:text-gray-400">No appointments scheduled.</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Add a new appointment to get started.
        </p>
      </div>
    );
  }

  // Sort appointments by date and time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedAppointments.map((appointment) => {
          // Try to parse the date
          let formattedDate = appointment.date;
          try {
            formattedDate = format(parseISO(appointment.date), "MMM d, yyyy");
          } catch (error) {
            console.error("Error parsing date:", error);
          }

          return (
            <div
              key={appointment.id}
              className="py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{appointment.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(appointment.id)}
                    className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                    aria-label="Edit appointment"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Delete appointment"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center mt-1">
                  <FiClock className="w-4 h-4 mr-2" />
                  <span>{appointment.time}</span>
                </div>
                {appointment.description && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {appointment.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedAppointmentId ? "Edit Appointment" : "Add Appointment"}
      >
        <AppointmentForm
          appointmentId={selectedAppointmentId}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
} 