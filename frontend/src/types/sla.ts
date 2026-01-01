import type { priorityLabels, SLA_HOURS } from '@/const'

export type Category = keyof typeof SLA_HOURS

export type Priority = keyof typeof priorityLabels
