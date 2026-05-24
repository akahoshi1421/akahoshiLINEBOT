import { useAtomValue } from "jotai";
import { useState } from "react";
import { addParticipantAtom } from "../../atoms/schedules";

// 参加者追加入力の状態と、Enter/「追加」での登録ロジック
export const useParticipantAdder = (scheduleId: number) => {
  const { mutate: add } = useAtomValue(addParticipantAtom);
  const [name, setName] = useState("");

  const commit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    add({ scheduleId, name: trimmed });
    setName("");
  };

  return { name, setName, commit };
};
