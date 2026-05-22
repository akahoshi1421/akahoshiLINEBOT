import { Button, Flex, Tag } from "@chakra-ui/react";

type Props = {
  name: string;
  onRemove: () => void;
};

// 参加者 1 名分の行（削除ボタン付き）
export const ParticipantRow = ({ name, onRemove }: Props) => (
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
    <Button size="xs" variant="outline" colorPalette="red" onClick={onRemove}>
      削除
    </Button>
  </Flex>
);
