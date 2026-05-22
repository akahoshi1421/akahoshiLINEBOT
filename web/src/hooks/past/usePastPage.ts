import { useAtomValue } from "jotai";
import { pastSchedulesAtom } from "../../atoms/schedules";

// 過去のスケジュール一覧（取得は jotai-tanstack-query に委譲）
export const usePastPage = () => {
  const { data, isPending } = useAtomValue(pastSchedulesAtom);
  return { schedules: data ?? [], loading: isPending };
};
