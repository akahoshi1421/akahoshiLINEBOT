import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ScheduleDTO } from "../../api/types";
import { deleteScheduleAtom, updateScheduleAtom } from "../../atoms/schedules";
import { isoToLocalInput, localInputToIso } from "../../utils/date";

// 編集行の入力状態と、onBlur で変更フィールドのみ更新するロジック
export const useScheduleEditRow = (schedule: ScheduleDTO) => {
  const navigate = useNavigate();
  const { mutate: update } = useAtomValue(updateScheduleAtom);
  const {
    mutate: remove,
    isPending: deletePending,
    variables: deletingId,
  } = useAtomValue(deleteScheduleAtom);

  // 削除 mutation は全行で共有されるため、変数(id)が一致する行だけ loading にする
  const removing = deletePending && deletingId === schedule.id;

  const [eventName, setEventName] = useState(schedule.eventName);
  const [eventDate, setEventDate] = useState(isoToLocalInput(schedule.eventDate));
  const [remarks, setRemarks] = useState(schedule.remarks);

  const commitEventName = () => {
    if (eventName !== schedule.eventName)
      update({ id: schedule.id, patch: { eventName } });
  };

  const commitEventDate = () => {
    const iso = localInputToIso(eventDate);
    if (iso !== schedule.eventDate)
      update({ id: schedule.id, patch: { eventDate: iso } });
  };

  const commitRemarks = () => {
    if (remarks !== schedule.remarks)
      update({ id: schedule.id, patch: { remarks } });
  };

  return {
    eventName,
    setEventName,
    commitEventName,
    eventDate,
    setEventDate,
    commitEventDate,
    remarks,
    setRemarks,
    commitRemarks,
    remove: () => remove(schedule.id),
    removing,
    openDetail: () => navigate(`/${schedule.id}`),
  };
};
