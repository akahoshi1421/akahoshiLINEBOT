import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { api } from "../api/client";
import type { ScheduleInputDTO } from "../api/types";
import { queryClient } from "./queryClient";

const keys = {
  future: ["futureSchedules"] as const,
  past: ["pastSchedules"] as const,
  detail: (id: number) => ["schedule", id] as const,
};

// ---- クエリ ----

export const futureSchedulesAtom = atomWithQuery(() => ({
  queryKey: keys.future,
  queryFn: () => api.getFutureSchedules(),
}));

export const pastSchedulesAtom = atomWithQuery(() => ({
  queryKey: keys.past,
  queryFn: () => api.getPastSchedules(),
}));

// 詳細ページで表示中のスケジュール id
export const scheduleIdAtom = atom(0);

// get で scheduleIdAtom を読み、queryKey を id 依存にする。
// id が変わると別クエリ扱いになり、TanStack Query が id ごとに結果をキャッシュする
// （atomFamily 不要。一度取得した id のデータはキャッシュから即時返る）。
export const scheduleDetailAtom = atomWithQuery((get) => {
  const id = get(scheduleIdAtom);
  return {
    queryKey: keys.detail(id),
    queryFn: () => api.getSchedule(id),
    enabled: id > 0,
  };
});

// ---- ミューテーション（成功時に関連クエリを無効化して再取得）----

export const createScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["createSchedule"],
  mutationFn: (input: ScheduleInputDTO) => api.createSchedule(input),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: keys.future });
    queryClient.invalidateQueries({ queryKey: keys.past });
  },
}));

export const updateScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["updateSchedule"],
  mutationFn: (vars: { id: number; patch: Partial<ScheduleInputDTO> }) =>
    api.updateSchedule(vars.id, vars.patch),
  onSuccess: (_data, vars) => {
    queryClient.invalidateQueries({ queryKey: keys.future });
    queryClient.invalidateQueries({ queryKey: keys.past });
    queryClient.invalidateQueries({ queryKey: keys.detail(vars.id) });
  },
}));

export const deleteScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["deleteSchedule"],
  mutationFn: (id: number) => api.deleteSchedule(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: keys.future });
    queryClient.invalidateQueries({ queryKey: keys.past });
  },
}));

export const addParticipantAtom = atomWithMutation(() => ({
  mutationKey: ["addParticipant"],
  mutationFn: (vars: { scheduleId: number; name: string }) =>
    api.addParticipant(vars.scheduleId, vars.name),
  onSuccess: (_data, vars) =>
    queryClient.invalidateQueries({ queryKey: keys.detail(vars.scheduleId) }),
}));

export const removeParticipantAtom = atomWithMutation(() => ({
  mutationKey: ["removeParticipant"],
  mutationFn: (vars: { scheduleId: number; name: string }) =>
    api.removeParticipant(vars.scheduleId, vars.name),
  onSuccess: (_data, vars) =>
    queryClient.invalidateQueries({ queryKey: keys.detail(vars.scheduleId) }),
}));
