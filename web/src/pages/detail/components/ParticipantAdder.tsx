import { Button, HStack, Input } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { addParticipantAtom } from "../../../atoms/schedules";

type Props = {
  scheduleId: number;
};

// 参加者の追加入力。追加はミューテーション atom を直接利用。
export const ParticipantAdder = ({ scheduleId }: Props) => {
  const { mutate: add } = useAtomValue(addParticipantAtom);
  const [name, setName] = useState("");

  const commit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    add({ scheduleId, name: trimmed });
    setName("");
  };

  return (
    <HStack>
      <Input
        value={name}
        placeholder="参加者名"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
        }}
      />
      <Button colorPalette="blue" onClick={commit}>
        追加
      </Button>
    </HStack>
  );
};
