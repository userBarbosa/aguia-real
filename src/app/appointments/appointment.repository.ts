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
import { ObjectId } from "mongodb";

const COLLECTION = "appointments";

export async function list(): Promise<AppointmentDTO[]> {
  try {
    const response = await selectAll<AppointmentDTO>(COLLECTION, {});

    return response;
  } catch (error) {
    throw {
      message: "error while trying to list appointments",
      error,
    };
  }
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
    throw {
      message: "error while trying to list limited appointments",
      error,
    };
  }
}

export async function read(id: string): Promise<AppointmentDTO | null> {
  try {
    const response = await selectById<AppointmentDTO>(COLLECTION, id);
    return response;
  } catch (error) {
    throw {
      message: "error while trying to read appointment",
      id,
      error,
    };
  }
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
    throw {
      message: "error while trying to read appointment by foreign id",
      params: { field, id, limit },
      error,
    };
  }
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
    throw {
      message: "error while trying to read appointment by field",
      params: { field, data, limit },
      error,
    };
  }
}

export async function readByDateRange(
  greaterThanOrEqualDate: Date,
  lesserThanDate: Date,
  patientId?: string,
  employeeId?: string,
  limit?: number
): Promise<AppointmentDTO[]> {
  try {
    let query: Record<string, any> = {
      date: {
        $gte: greaterThanOrEqualDate,
        $lt: lesserThanDate,
      },
    };
    if (patientId) {
      query["patientId"] = new ObjectId(patientId);
    }
    if (employeeId) {
      query["employeeId"] = new ObjectId(employeeId);
    }

    const result = await selectWithLimit<AppointmentDTO>(
      COLLECTION,
      query,
      limit || 50
    );

    return result;
  } catch (error) {
    throw {
      message: "an error occour while getting appointments by date",
      error,
      params: {
        greaterThanOrEqualDate,
        lesserThanDate,
        patientId,
        employeeId,
        limit,
      },
    };
  }
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
    return result;
  } catch (error) {
    throw {
      message: "error finding reserved appointment",
      error,
      params: {
        timeDate,
        patientId,
        employeeId,
        appointmentTime,
      },
    };
  }
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
    throw {
      message: "error while storing appointment",
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
    throw {
      message: "error while updating data",
      data,
      error,
    };
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
    throw {
      message: "error while updating data",
      data: { id, appointmentState },
      error,
    };
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
    throw {
      message: "error while updating data",
      data,
      error,
    };
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    const response = await removeOne(COLLECTION, { _id: new ObjectId(id) });
    return response;
  } catch (error) {
    throw {
      message: "error while removing data",
      error,
      id,
    };
  }
}
