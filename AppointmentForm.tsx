"use client";

import { useState, useEffect } from "react";
import { useAppointments } from "@/context/AppointmentContext";
import { AppointmentFormData } from "@/types/appointment";
import { format } from "date-fns";

interface AppointmentFormProps {
  appointmentId?: string;
  onClose: () => void;
}

export function AppointmentForm({ appointmentId, onClose }: AppointmentFormProps) {
  const { addAppointment, updateAppointment, getAppointment } = useAppointments();
  const [formData, setFormData] = useState<AppointmentFormData>({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: format(new Date(), "HH:mm"),
    description: "",
  });

  const isEditMode = !!appointmentId;

  useEffect(() => {
    if (appointmentId) {
      const appointment = getAppointment(appointmentId);
      if (appointment) {
        setFormData({
          title: appointment.title,
          date: appointment.date,
          time: appointment.time,
          description: appointment.description,
        });
      }
    }
  }, [appointmentId, getAppointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && appointmentId) {
      updateAppointment(appointmentId, formData);
    } else {
      addAppointment(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input"
          placeholder="Meeting with Client"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="input"
          placeholder="Add details about your appointment"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {isEditMode ? "Update" : "Add"} Appointment
        </button>
      </div>
    </form>
  );
} 