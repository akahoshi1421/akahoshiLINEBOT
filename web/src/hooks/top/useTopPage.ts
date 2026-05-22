import { useAtomValue } from "jotai";
import { futureSchedulesAtom } from "../../atoms/schedules";

// 未来+未定のスケジュール一覧（取得は jotai-tanstack-query に委譲）
export const useTopPage = () => {
  const { data, isPending } = useAtomValue(futureSchedulesAtom);
  return { schedules: data ?? [], loading: isPending };
};
