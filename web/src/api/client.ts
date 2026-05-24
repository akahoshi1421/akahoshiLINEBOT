import { mockApi, type MockApi } from "./mock";
import type { ScheduleDetailDTO, ScheduleDTO, ScheduleInputDTO } from "./types";

type ScriptRunner = {
  withSuccessHandler: (cb: (res: unknown) => void) => ScriptRunner;
  withFailureHandler: (cb: (err: Error) => void) => ScriptRunner;
} & Record<string, (...args: unknown[]) => void>;

type GoogleScript = {
  script?: { run?: ScriptRunner };
};

const getRunner = (): ScriptRunner | null => {
  const g = (window as unknown as { google?: GoogleScript }).google;
  return g?.script?.run ?? null;
};

// google.script.run の関数呼び出しを Promise 化する。
// GAS 外(vite dev)では mock にフォールバックする。
const call = <T>(fn: keyof MockApi, ...args: unknown[]): Promise<T> => {
  const runner = getRunner();

  if (!runner) {
    return Promise.resolve(
      (mockApi[fn] as (...a: unknown[]) => T)(...args)
    );
  }

  return new Promise<T>((resolve, reject) => {
    runner
      .withSuccessHandler((res) => resolve(res as T))
      .withFailureHandler((err) => reject(err))
      [fn](...args);
  });
};

export const api = {
  getFutureSchedules: () => call<ScheduleDTO[]>("apiGetFutureSchedules"),
  getPastSchedules: () => call<ScheduleDTO[]>("apiGetPastSchedules"),
  getSchedule: (id: number) =>
    call<ScheduleDetailDTO | null>("apiGetSchedule", id),
  createSchedule: (input: ScheduleInputDTO) =>
    call<ScheduleDTO>("apiCreateSchedule", input),
  updateSchedule: (id: number, patch: Partial<ScheduleInputDTO>) =>
    call<void>("apiUpdateSchedule", id, patch),
  deleteSchedule: (id: number) => call<void>("apiDeleteSchedule", id),
  addParticipant: (scheduleId: number, name: string) =>
    call<void>("apiAddParticipant", scheduleId, name),
  removeParticipant: (scheduleId: number, name: string) =>
    call<void>("apiRemoveParticipant", scheduleId, name),
};
