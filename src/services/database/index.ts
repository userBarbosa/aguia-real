import { ObjectId } from 'mongodb'
import { findAll, findOne, insert, remove, update } from './mongodb'

const whichDB = process.env.database

// source -> collection do mongo, ou tabela no sql, para onde o dado vai/sai
export async function selectAll<T>(source: string, query: Record<string, unknown>): Promise<T[]> {
  return await findAll<T>(source, query)
}

export async function selectById<T>(source: string, id: string): Promise<T | null> {
  return await findOne<T>(source, { _id: new ObjectId(id) })
}

export async function select<T>(source: string, data: any): Promise<T | null> {
  return await findOne<T>(source, data)
}

// fallback, caracterisca que impede que a applicação quebre pensando no fluxo de erros durante o desenvolvimento
export async function insertOne(source: string, content: Record<string, unknown>): Promise<string | null> {
  return await insert(source, content)
}

export async function updateOne(source: string, filter: Record<string, unknown>, content: Record<string, unknown>): Promise<boolean> {
  return await update(source, filter, {$set: content})
}

export async function removeOne(source: string, filter: Record<string, unknown>): Promise<boolean> {
  return await remove(source, filter)
}