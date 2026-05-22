import { Button, HStack, Input } from "@chakra-ui/react";
import { useParticipantAdder } from "../../../hooks/detail/useParticipantAdder";

type Props = {
  scheduleId: number;
};

// 参加者の追加入力（状態と登録ロジックは useParticipantAdder）
export const ParticipantAdder = ({ scheduleId }: Props) => {
  const { name, setName, commit } = useParticipantAdder(scheduleId);

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
