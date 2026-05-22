import { Button, Flex, Input, Table } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteScheduleAtom, updateScheduleAtom } from "../../../atoms/schedules";
import type { ScheduleDTO } from "../../../api/types";
import { isoToLocalInput, localInputToIso } from "../../../utils/date";

type Props = {
  schedule: ScheduleDTO;
};

// onBlur で変更フィールドのみ更新する編集行。
// 更新/削除はグローバルなミューテーション atom を直接利用するので props は schedule のみ。
export const ScheduleEditRow = ({ schedule }: Props) => {
  const navigate = useNavigate();
  const { mutate: update } = useAtomValue(updateScheduleAtom);
  const { mutate: remove } = useAtomValue(deleteScheduleAtom);

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
            if (eventName !== schedule.eventName)
              update({ id: schedule.id, patch: { eventName } });
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
            if (iso !== schedule.eventDate)
              update({ id: schedule.id, patch: { eventDate: iso } });
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={remarks}
          placeholder="備考"
          onChange={(e) => setRemarks(e.target.value)}
          onBlur={() => {
            if (remarks !== schedule.remarks)
              update({ id: schedule.id, patch: { remarks } });
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/${schedule.id}`)}
          >
            詳細
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorPalette="red"
            onClick={() => remove(schedule.id)}
          >
            削除
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
