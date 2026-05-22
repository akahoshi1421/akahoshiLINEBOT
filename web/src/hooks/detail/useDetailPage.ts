import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addParticipantAtom,
  scheduleDetailAtom,
  scheduleIdAtom,
} from "../../atoms/schedules";

// ルートパラメータから対象 id を解決し、スケジュール詳細を取得する。
// 取得は scheduleDetailAtom(atomWithQuery) が宣言的に担当。
// useEffect は「ルートパラメータを atom に同期するだけ」で、API は呼ばない。
export const useDetailPage = () => {
  const { id } = useParams();
  const scheduleId = Number(id);

  const setScheduleId = useSetAtom(scheduleIdAtom);
  useEffect(() => {
    setScheduleId(scheduleId);
  }, [scheduleId, setScheduleId]);

  const { data, isPending } = useAtomValue(scheduleDetailAtom);
  // 参加者追加が一覧に反映される(refetch 完了)まで isPending が true
  const { isPending: adding } = useAtomValue(addParticipantAtom);

  return { scheduleId, schedule: data ?? null, loading: isPending, adding };
};
