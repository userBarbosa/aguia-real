// DTO - data transfer object
// generic dto, objeto generico para transferencia de dados
export type GenericDTO = {
  _id: string,
  createdAt: string | Date,
  updatedAt: string | Date,
  deletedAt: string | Date,
  active: number,
}

export type GenericAuditStruct = {
  auditedAt: string | Date,
  auditedBy: string,
  pass: boolean
}