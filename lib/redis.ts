import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function incr(key: string, by = 1) {
  return redis.incrby(key, by)
}

export async function getNumber(key: string) {
  const val = await redis.get<number>(key)
  return typeof val === "number" ? val : 0
}

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const v = await redis.get<T>(key)
  return v ?? fallback
}

export async function setJSON<T>(key: string, value: T) {
  return redis.set(key, value)
}

export async function get(key: string) {
  return redis.get<string>(key)
}

export async function set(key: string, value: string) {
  return redis.set(key, value)
}

export async function del(key: string) {
  return redis.del(key)
}