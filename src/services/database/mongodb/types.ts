export type GenericDTO = {
  _id: string,
  createdAt: string | Date,
  updatedAt: string | Date,
  deletedAt: string | Date,
  active: number,
}

export type GenericObject = {
  query: Record<string, any>
}