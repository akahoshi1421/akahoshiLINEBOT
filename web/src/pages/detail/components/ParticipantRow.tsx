import { Button, Flex, Tag } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import {
  removeParticipantAtom,
  removingParticipantsAtom,
} from "../../../atoms/schedules";

type Props = {
  scheduleId: number;
  name: string;
};

// 参加者 1 名分の行。削除はミューテーション atom を直接利用。
export const ParticipantRow = ({ scheduleId, name }: Props) => {
  const { mutate: remove } = useAtomValue(removeParticipantAtom);
  const removingParticipants = useAtomValue(removingParticipantsAtom);

  // 同時削除でも対象だけ loading にする（pending な全削除の変数を見る）
  const removing = removingParticipants.some(
    (v) => v?.scheduleId === scheduleId && v?.name === name
  );

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      px={4}
      py={2}
    >
      <Tag.Root size="lg" colorPalette="teal">
        <Tag.Label>{name}</Tag.Label>
      </Tag.Root>
      <Button
        size="xs"
        variant="outline"
        colorPalette="red"
        onClick={() => remove({ scheduleId, name })}
        loading={removing}
      >
        削除
      </Button>
    </Flex>
  );
};
