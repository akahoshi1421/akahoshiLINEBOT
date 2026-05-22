import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onAdd: (name: string) => void;
};

// 参加者の追加入力（Enter または「追加」ボタンで確定）
export const ParticipantAdder = ({ onAdd }: Props) => {
  const [name, setName] = useState("");

  const commit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
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
