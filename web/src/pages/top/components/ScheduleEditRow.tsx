import { Button, Flex, Input, Table } from "@chakra-ui/react";
import type { ScheduleDTO } from "../../../api/types";
import { useScheduleEditRow } from "../../../hooks/top/useScheduleEditRow";

type Props = {
  schedule: ScheduleDTO;
};

// onBlur で変更フィールドのみ更新する編集行（ロジックは useScheduleEditRow）
export const ScheduleEditRow = ({ schedule }: Props) => {
  const {
    eventName,
    setEventName,
    commitEventName,
    eventDate,
    setEventDate,
    commitEventDate,
    remarks,
    setRemarks,
    commitRemarks,
    remove,
    openDetail,
  } = useScheduleEditRow(schedule);

  return (
    <Table.Row>
      <Table.Cell>
        <Input
          value={eventName}
          placeholder="イベント名"
          onChange={(e) => setEventName(e.target.value)}
          onBlur={commitEventName}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          onBlur={commitEventDate}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={remarks}
          placeholder="備考"
          onChange={(e) => setRemarks(e.target.value)}
          onBlur={commitRemarks}
        />
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2}>
          <Button size="sm" variant="outline" onClick={openDetail}>
            詳細
          </Button>
          <Button size="sm" variant="outline" colorPalette="red" onClick={remove}>
            削除
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
