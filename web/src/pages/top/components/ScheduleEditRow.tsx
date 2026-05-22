import { Button, Flex, Input, Table } from "@chakra-ui/react";
import { useState } from "react";
import type { ScheduleDTO, ScheduleInputDTO } from "../../../api/types";
import { isoToLocalInput, localInputToIso } from "../../../utils/date";

type Props = {
  schedule: ScheduleDTO;
  onUpdate: (patch: Partial<ScheduleInputDTO>) => void;
  onDelete: () => void;
  onOpen: () => void;
};

// onBlur で変更があったフィールドのみ保存する編集行
export const ScheduleEditRow = ({
  schedule,
  onUpdate,
  onDelete,
  onOpen,
}: Props) => {
  const [eventName, setEventName] = useState(schedule.eventName);
  const [eventDate, setEventDate] = useState(isoToLocalInput(schedule.eventDate));
  const [remarks, setRemarks] = useState(schedule.remarks);

  return (
    <Table.Row>
      <Table.Cell>
        <Input
          value={eventName}
          placeholder="イベント名"
          onChange={(e) => setEventName(e.target.value)}
          onBlur={() => {
            if (eventName !== schedule.eventName) onUpdate({ eventName });
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          onBlur={() => {
            const iso = localInputToIso(eventDate);
            if (iso !== schedule.eventDate) onUpdate({ eventDate: iso });
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={remarks}
          placeholder="備考"
          onChange={(e) => setRemarks(e.target.value)}
          onBlur={() => {
            if (remarks !== schedule.remarks) onUpdate({ remarks });
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2}>
          <Button size="sm" variant="outline" onClick={onOpen}>
            詳細
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorPalette="red"
            onClick={onDelete}
          >
            削除
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
