export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

export type AppointmentFormData = Omit<Appointment, "id">; 