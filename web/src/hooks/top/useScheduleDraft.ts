import { useAtomValue } from "jotai";
import { useState } from "react";
import { createScheduleAtom } from "../../atoms/schedules";
import { localInputToIso } from "../../utils/date";

const empty = { eventName: "", eventDate: "", remarks: "" };

// 新規追加行の入力状態と、「追加」押下での登録ロジック
export const useScheduleDraft = () => {
  const { mutate: create } = useAtomValue(createScheduleAtom);
  const [draft, setDraft] = useState(empty);

  const update = (patch: Partial<typeof empty>) =>
    setDraft((prev) => ({ ...prev, ...patch }));

  const commit = () => {
    if (!draft.eventName.trim()) return;
    create({
      eventName: draft.eventName,
      eventDate: localInputToIso(draft.eventDate),
      remarks: draft.remarks,
    });
    setDraft(empty);
  };

  return { draft, update, commit };
};
