import { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { ScheduleDTO, ScheduleInputDTO } from "../../api/types";
import { onError } from "../../utils/onError";

// トップページのスケジュール一覧の取得・作成・更新・削除を扱う
export const useTopPage = () => {
  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getFutureSchedules()
      .then(setSchedules)
      .catch(onError)
      .finally(() => setLoading(false));
  }, []);

  const updateSchedule = (id: number, patch: Partial<ScheduleInputDTO>) => {
    api.updateSchedule(id, patch).catch(onError);
  };

  const deleteSchedule = (id: number) => {
    api.deleteSchedule(id).catch(onError);
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const createSchedule = (input: ScheduleInputDTO) => {
    api
      .createSchedule(input)
      .then((created) => setSchedules((prev) => [...prev, created]))
      .catch(onError);
  };

  return { schedules, loading, updateSchedule, deleteSchedule, createSchedule };
};
