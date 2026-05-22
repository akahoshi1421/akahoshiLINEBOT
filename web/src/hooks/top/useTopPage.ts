import { useAtomValue } from "jotai";
import { creatingSchedulesAtom, futureSchedulesAtom } from "../../atoms/schedules";

// 未来+未定のスケジュール一覧（取得は jotai-tanstack-query に委譲）
export const useTopPage = () => {
  const { data, isPending } = useAtomValue(futureSchedulesAtom);
  // 作成中(refetch 完了まで pending)が 1 件以上ならスピナーを出す
  const creating = useAtomValue(creatingSchedulesAtom).length > 0;
  return { schedules: data ?? [], loading: isPending, creating };
};
