import { GenericDTO } from "../../services/database/mongodb/types";

export type Appointment = {
  id?: string;
  patiendId: string;
  ownerId: string;
  diagnostic: Diagnostic;
  employeeId: string;
  appointmentState: AppointmentState;
  observation?: string;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value?: number;
  date: Date;
};

// "de-para" é um enum no typescript, e seu data type é 'type' / objeto

export type AppointmentDTO = {
  id: string;
  patiendId: string;
  ownerId: string;
  employeeId: string;
  appointmentState: AppointmentState;
} & GenericDTO;

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
}

export type Diagnostic = {
  exam: string;
  result: string;
  doctorSign: string;
  exameFullfilled: boolean;
  medicinePrescription: Array<MedicinePrescription>;
};

export enum PaymentMethod {
  creditCard = 1,
  debitCard = 2,
  cash = 4,
  pix = 8,
}

export enum Reason {
  emergency = 1,
  routine = 2,
  checkUp = 4,
  labExam = 8,
  surgery = 16,
}

export type MedicinePrescription = {
  medicine: string;
  dose: string;
  period: number;
};
