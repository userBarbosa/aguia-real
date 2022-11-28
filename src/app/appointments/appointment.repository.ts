import {
  insertOne,
  select,
  selectAll,
  selectById,
  selectWithLimit,
  updateOne,
  removeOne,
} from "../../services/database/index";
import {
  AppointmentDTO,
  AppointmentState,
  Diagnostic,
  PaymentMethod,
  Reason,
} from "./appointment.types";
import logger from "../../utils/logger";
import { ObjectId } from "mongodb";

const COLLECTION = "appointments";

export async function list(): Promise<AppointmentDTO[]> {
  try {
    const response = await selectAll<AppointmentDTO>(COLLECTION, {});

    return response;
  } catch (error) {
    logger.error("Error getting all appointments", error);
  }
  return [];
}

export async function listLimit(
  query: any,
  limit: number
): Promise<AppointmentDTO[]> {
  try {
    const response = await selectWithLimit<AppointmentDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting all appointments", error);
  }
  return [];
}

export async function read(id: string): Promise<AppointmentDTO | null> {
  try {
    const response = await selectById<AppointmentDTO>(COLLECTION, id);

    return response;
  } catch (error) {
    logger.error("Error getting appointment by id", error);
  }
  return null;
}

export async function readByForeignId(
  field: string,
  id: string,
  limit: number
): Promise<AppointmentDTO[]> {
  try {
    let data: { [key: string]: ObjectId } = {};
    data[field] = new ObjectId(id);

    const response = await selectWithLimit<AppointmentDTO>(
      COLLECTION,
      data,
      limit
    );

    return response;
  } catch (error) {
    /* const getErrorObject = (error) =>
      Object.getOwnPropertyNames(error).reduce((acc, curr) => {
        acc[curr] = error[curr];
        return acc;
      }, {});

    getErrorObject(newError);

    if (error instanceof Error && error.stack) {
      for (const property of Object.getOwnPropertyNames(error)) {
      }
    }
    throw {
      message: "Error getting appointment by id",
      error,
    }; */
  
    logger.error("Error getting appointment by id", error);
  }
  return [];
}

export async function readByField(
  data: string | number | boolean,
  field: string,
  limit: number
): Promise<AppointmentDTO[]> {
  try {
    let query: { [key: string]: string | number | boolean } = {};
    query[field] = data;

    const response = await selectWithLimit<AppointmentDTO>(
      COLLECTION,
      query,
      limit
    );

    return response;
  } catch (error) {
    logger.error("Error getting appointment by field", error);
  }
  return [];
}

export async function searchAppointment(
  timeDate: Date,
  patientId?: string,
  employeeId?: string,
  appointmentTime?: number
): Promise<AppointmentDTO | null> {
  try {
    const gteDate = timeDate;
    const ltDate = new Date(
      timeDate.getTime() + (appointmentTime || 30 * 60 * 1000)
    );
    let data: Record<string, any> = {
      date: {
        $gte: gteDate,
        $lt: ltDate,
      },
    };
    if (patientId) {
      data["patientId"] = new ObjectId(patientId);
    } else if (employeeId) {
      data["employeeId"] = new ObjectId(employeeId);
    } else {
      throw {
        error: "missing required property",
      };
    }

    const result = await select<AppointmentDTO>(COLLECTION, data);

    if (result) {
      return result;
    }
  } catch (error) {
    logger.error("error finding reserved appointment", error);
  }
  return null;
}

export async function store(data: {
  patientId: string;
  ownerId: string;
  diagnostic: Diagnostic | undefined;
  employeeId: string;
  appointmentState: AppointmentState;
  observation: string;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value: number;
  date: Date;
}): Promise<string | null> {
  try {
    const response = await insertOne(COLLECTION, {
      patientId: new ObjectId(data.patientId),
      ownerId: new ObjectId(data.ownerId),
      employeeId: new ObjectId(data.employeeId),
      observation: data.observation,
      value: data.value,
      diagnostic: data.diagnostic,
      appointmentState: data.appointmentState,
      paymentMethod: data.paymentMethod,
      reason: data.reason,
      date: data.date,
      createdAt: new Date(),
    });

    return response;
  } catch (error) {
    logger.error("error while storing data", { error, data });
    // should throw ?
    throw {
      message: "error while storing data",
      error,
      data,
    };
  }
}

export async function update(data: {
  id: string;
  employeeId: string;
  appointmentState: AppointmentState;
  paymentMethod: PaymentMethod;
  reason: Reason;
  value: number;
  observation: string;
  date: Date;
}): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(data.id) },
      {
        employeeId: data.employeeId,
        appointmentState: data.appointmentState,
        paymentMethod: data.paymentMethod,
        reason: data.reason,
        value: data.value,
        observation: data.observation,
        date: data.date,
        updatedAt: new Date(),
      }
    );
    return response;
  } catch (error) {
    logger.error("error while updating data", { error, data });
    throw error;
  }
}

export async function updateState(
  id: string,
  appointmentState: AppointmentState
): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(id) },
      {
        appointmentState: appointmentState,
        updatedAt: new Date(),
      }
    );
    return response;
  } catch (error) {
    logger.error("error while updating data", { error, id, appointmentState });
    throw error;
  }
}

export async function insertDiagnostic(data: {
  id: string;
  appointmentState: AppointmentState;
  diagnostic: Diagnostic;
}): Promise<boolean> {
  try {
    const response = await updateOne(
      COLLECTION,
      { _id: new ObjectId(data.id) },
      {
        diagnostic: data.diagnostic,
        appointmentState: data.appointmentState,
        updatedAt: new Date(),
      }
    );
    return response;
  } catch (error) {
    logger.error("error while updating data", { error, data });
    throw error;
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, { _id: new ObjectId(id) });
    return response;
  } catch (error) {
    logger.error("error while removing data", { error, id });
    throw error;
  }
}
