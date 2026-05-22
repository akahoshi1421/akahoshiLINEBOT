import type { ScheduleDetailDTO, ScheduleDTO, ScheduleInputDTO } from "./types";

// vite dev (google.script.run が無い環境) 用のインメモリ実装。
// 本番(GAS)では使われない。
type MockSchedule = ScheduleDTO & { participants: string[] };

let seq = 3;
const store: MockSchedule[] = [
  {
    id: 1,
    eventName: "新歓コンパ",
    eventDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    remarks: "会費5000円",
    participants: ["Alice", "Ken"],
  },
  {
    id: 2,
    eventName: "合宿",
    eventDate: null,
    remarks: "",
    participants: [],
  },
  {
    id: 3,
    eventName: "去年の総会",
    eventDate: new Date(Date.now() - 30 * 86400000).toISOString(),
    remarks: "終了済み",
    participants: ["John"],
  },
];

const isFuture = (s: MockSchedule) =>
  s.eventDate === null || new Date(s.eventDate).getTime() >= Date.now();

export const mockApi = {
  apiGetFutureSchedules: (): ScheduleDTO[] => store.filter(isFuture),
  apiGetPastSchedules: (): ScheduleDTO[] => store.filter((s) => !isFuture(s)),
  apiGetSchedule: (id: number): ScheduleDetailDTO | null =>
    store.find((s) => s.id === id) ?? null,
  apiCreateSchedule: (input: ScheduleInputDTO): ScheduleDTO => {
    const created: MockSchedule = { id: ++seq, ...input, participants: [] };
    store.push(created);
    return created;
  },
  apiUpdateSchedule: (id: number, patch: Partial<ScheduleInputDTO>): void => {
    const target = store.find((s) => s.id === id);
    if (target) Object.assign(target, patch);
  },
  apiDeleteSchedule: (id: number): void => {
    const i = store.findIndex((s) => s.id === id);
    if (i >= 0) store.splice(i, 1);
  },
  apiAddParticipant: (scheduleId: number, name: string): void => {
    store.find((s) => s.id === scheduleId)?.participants.push(name);
  },
  apiRemoveParticipant: (scheduleId: number, name: string): void => {
    const target = store.find((s) => s.id === scheduleId);
    if (target)
      target.participants = target.participants.filter((p) => p !== name);
  },
};

export type MockApi = typeof mockApi;
