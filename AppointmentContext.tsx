"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Appointment, AppointmentFormData } from "@/types/appointment";
import toast from "react-hot-toast";

type AppointmentContextType = {
  appointments: Appointment[];
  addAppointment: (data: AppointmentFormData) => void;
  updateAppointment: (id: string, data: AppointmentFormData) => void;
  deleteAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from localStorage on initial render
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments));
      } catch (error) {
        console.error("Failed to parse appointments:", error);
        localStorage.removeItem("appointments");
      }
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      ...data,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, newAppointment]);
    toast.success("Appointment added successfully");
  };

  const updateAppointment = (id: string, data: AppointmentFormData) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...data, id } : appointment
      )
    );
    toast.success("Appointment updated successfully");
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    toast.success("Appointment deleted successfully");
  };

  const getAppointment = (id: string) => {
    return appointments.find((appointment) => appointment.id === id);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
} 