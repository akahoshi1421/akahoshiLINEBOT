import { atom } from "jotai";
import {
  atomWithMutation,
  atomWithMutationState,
  atomWithQuery,
} from "jotai-tanstack-query";
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

// ---- ミューテーション ----
// onSuccess で invalidate の Promise を return することで、再取得(refetch)が完了する
// まで mutation の isPending が true のままになる（＝「一覧に反映されるまで」を表せる）。

export const createScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["createSchedule"],
  mutationFn: (input: ScheduleInputDTO) => api.createSchedule(input),
  onSuccess: () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: keys.future }),
      queryClient.invalidateQueries({ queryKey: keys.past }),
    ]),
}));

export const updateScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["updateSchedule"],
  mutationFn: (vars: { id: number; patch: Partial<ScheduleInputDTO> }) =>
    api.updateSchedule(vars.id, vars.patch),
  onSuccess: (_data, vars) =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: keys.future }),
      queryClient.invalidateQueries({ queryKey: keys.past }),
      queryClient.invalidateQueries({ queryKey: keys.detail(vars.id) }),
    ]),
}));

export const deleteScheduleAtom = atomWithMutation(() => ({
  mutationKey: ["deleteSchedule"],
  mutationFn: (id: number) => api.deleteSchedule(id),
  onSuccess: () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: keys.future }),
      queryClient.invalidateQueries({ queryKey: keys.past }),
    ]),
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

// ---- 進行中ミューテーションの集約 ----
// 単一の mutation atom の isPending/variables は「最新の mutate」しか追えないため、
// MutationCache から pending な Mutation を全件読み、同時実行でも各対象を loading にする。

// 削除中のスケジュール id 一覧
export const deletingScheduleIdsAtom = atomWithMutationState(() => ({
  filters: { mutationKey: ["deleteSchedule"], status: "pending" },
  select: (m) => m.state.variables as number,
}));

// 削除中の参加者(scheduleId,name)一覧
export const removingParticipantsAtom = atomWithMutationState(() => ({
  filters: { mutationKey: ["removeParticipant"], status: "pending" },
  select: (m) => m.state.variables as { scheduleId: number; name: string },
}));

// 作成中のスケジュール（>0 件で一覧末尾にスピナー）
export const creatingSchedulesAtom = atomWithMutationState(() => ({
  filters: { mutationKey: ["createSchedule"], status: "pending" },
}));

// 追加中の参加者（>0 件で参加者一覧末尾にスピナー）
export const addingParticipantsAtom = atomWithMutationState(() => ({
  filters: { mutationKey: ["addParticipant"], status: "pending" },
}));
