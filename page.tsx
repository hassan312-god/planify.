"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { AppointmentList } from "@/components/AppointmentList";
import { CalendarView } from "@/components/CalendarView";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Modal } from "@/components/Modal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider>
      <AppointmentProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="container mx-auto py-6 px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Appointments</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary flex items-center"
              >
                <FiPlus className="mr-1" />
                New Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-4 border-b dark:border-gray-700">
                  <h3 className="text-lg font-medium">Calendar</h3>
                </div>
                <div className="p-4">
                  <CalendarView />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-4 border-b dark:border-gray-700">
                  <h3 className="text-lg font-medium">Upcoming</h3>
                </div>
                <AppointmentList />
              </div>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="Add Appointment"
            >
              <AppointmentForm onClose={handleCloseModal} />
            </Modal>
          </main>

          <footer className="py-4 px-4 md:px-6 mt-12 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} Planify. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </AppointmentProvider>
    </ThemeProvider>
  );
}
