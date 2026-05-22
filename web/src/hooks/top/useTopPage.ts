import { useAtomValue } from "jotai";
import { createScheduleAtom, futureSchedulesAtom } from "../../atoms/schedules";

// 未来+未定のスケジュール一覧（取得は jotai-tanstack-query に委譲）
export const useTopPage = () => {
  const { data, isPending } = useAtomValue(futureSchedulesAtom);
  // 作成は一覧に反映される(refetch 完了)まで isPending が true
  const { isPending: creating } = useAtomValue(createScheduleAtom);
  return { schedules: data ?? [], loading: isPending, creating };
};
