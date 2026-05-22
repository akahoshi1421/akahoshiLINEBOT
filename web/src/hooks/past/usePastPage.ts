import { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { ScheduleDTO } from "../../api/types";
import { onError } from "../../utils/onError";

// 過去ページの過去スケジュール一覧の取得を扱う
export const usePastPage = () => {
  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getPastSchedules()
      .then(setSchedules)
      .catch(onError)
      .finally(() => setLoading(false));
  }, []);

  return { schedules, loading };
};
