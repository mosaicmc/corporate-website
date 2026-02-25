import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serviceYearsBase(now: Date = new Date()): number {
  const thresholds = [
    { date: new Date('2026-05-01'), value: 45 },
    { date: new Date('2031-05-01'), value: 50 },
    { date: new Date('2036-05-01'), value: 55 },
    { date: new Date('2041-05-01'), value: 60 },
  ]
  let v = 40
  for (const t of thresholds) if (now >= t.date) v = t.value
  return v
}

export function serviceYearsLabel(now: Date = new Date()): string {
  return `${serviceYearsBase(now)}+`
}

export function languagesSpokenBase(): number {
  return 42
}

export function languagesSpokenLabel(): string {
  return `${languagesSpokenBase()}+`
}
