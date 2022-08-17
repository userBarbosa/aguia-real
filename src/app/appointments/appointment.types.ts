import { GenericDTO } from "../../services/database/mongodb/types";

export type Appointment = {
  id: string;
  patiendId: string;
  ownerId: string;
  employeeId: string;
  observation: string;
  appointmentState: AppointmentState;
  payment: Payment;
  value: number;
};

export type AppointmentDTO = {
  id: string;
  patiendId: string;
  ownerId: string;
  employeeId: string;
  appointmentState: string;
};

export type Payment = {
  installments: number;
  monthlyInstallments: number;
  firstInstallmentDate: string | Date;
  lastInstallmentsDate: string | Date;
};

export enum AppointmentState {
  draft = 1,
  registered = 2,
  scheduled = 4,
  closed = 8,
  canceled = 16,
  paid = 32,
  deleted = 64,
};