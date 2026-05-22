import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { scheduleDetailAtom, scheduleIdAtom } from "../../atoms/schedules";

// 指定 id のスケジュール詳細。
// 取得は scheduleDetailAtom(atomWithQuery) が宣言的に担当する。
// ここでの useEffect は「ルートパラメータを atom に同期するだけ」で、API は呼ばない。
export const useDetailPage = (scheduleId: number) => {
  const setScheduleId = useSetAtom(scheduleIdAtom);
  useEffect(() => {
    setScheduleId(scheduleId);
  }, [scheduleId, setScheduleId]);

  const { data, isPending } = useAtomValue(scheduleDetailAtom);
  return { schedule: data ?? null, loading: isPending };
};
