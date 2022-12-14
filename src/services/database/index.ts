import { ObjectId, Document } from "mongodb";
import {
  findAll,
  findWithLimit,
  findOne,
  insert,
  remove,
  update,
} from "./mongodb";

export async function selectAll<T extends Document>(
  source: string,
  query: Record<string, unknown>
): Promise<T[]> {
  return await findAll<T>(source, query);
}

export async function selectById<T>(
  source: string,
  id: string
): Promise<T | null> {
  return await findOne<T>(source, { _id: new ObjectId(id) });
}

export async function selectWithLimit<T extends Document>(
  source: string,
  query: Record<string, unknown>,
  limit: number
): Promise<T[]> {
  return await findWithLimit<T>(source, query, limit);
}

export async function select<T>(source: string, data: any): Promise<T | null> {
  return await findOne<T>(source, data);
}

export async function insertOne(
  source: string,
  content: Record<string, unknown>
): Promise<string | null> {
  return await insert(source, content);
}

export async function updateOne(
  source: string,
  filter: Record<string, unknown>,
  content: Record<string, unknown>
): Promise<boolean> {
  return await update(source, filter, { $set: content });
}

export async function pushOne(
  source: string,
  filter: Record<string, unknown>,
  contentPush: Record<string, unknown>,
  contentSet: Record<string, unknown>
): Promise<boolean> {
  return await update(
    source,
    filter,
    { $push: contentPush },
    { $set: contentSet }
  );
}

export async function pullOne(
  source: string,
  filter: Record<string, unknown>,
  contentPull: Record<string, unknown>,
  contentSet: Record<string, unknown>
): Promise<boolean> {
  return await update(
    source,
    filter,
    { $push: contentPull },
    { $set: contentSet }
  );
}

export async function removeOne(
  source: string,
  filter: Record<string, unknown>
): Promise<boolean> {
  return await remove(source, filter);
}
