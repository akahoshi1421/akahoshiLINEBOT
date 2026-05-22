import { useEffect, useState } from "react";
import { api } from "../../api/client";
import type { ScheduleDetailDTO } from "../../api/types";
import { onError } from "../../utils/onError";

// 詳細ページのスケジュール取得と参加者の追加・削除を扱う
export const useDetailPage = (scheduleId: number) => {
  const [schedule, setSchedule] = useState<ScheduleDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getSchedule(scheduleId)
      .then(setSchedule)
      .catch(onError)
      .finally(() => setLoading(false));
  }, [scheduleId]);

  const addParticipant = (name: string) => {
    setSchedule((prev) =>
      prev ? { ...prev, participants: [...prev.participants, name] } : prev
    );
    api.addParticipant(scheduleId, name).catch(onError);
  };

  const removeParticipant = (name: string) => {
    setSchedule((prev) =>
      prev
        ? { ...prev, participants: prev.participants.filter((p) => p !== name) }
        : prev
    );
    api.removeParticipant(scheduleId, name).catch(onError);
  };

  return { schedule, loading, addParticipant, removeParticipant };
};
