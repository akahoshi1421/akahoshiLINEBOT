import { Button, Table } from "@chakra-ui/react";
import type { ScheduleDTO } from "../../../api/types";
import { formatForDisplay } from "../../../utils/date";

type Props = {
  schedule: ScheduleDTO;
  onOpen: () => void;
};

// 過去の予定 1 件分の表示行（イベント名から詳細へ遷移）
export const PastScheduleRow = ({ schedule, onOpen }: Props) => (
  <Table.Row>
    <Table.Cell>
      <Button variant="plain" color="blue.600" p={0} h="auto" onClick={onOpen}>
        {schedule.eventName}
      </Button>
    </Table.Cell>
    <Table.Cell>{formatForDisplay(schedule.eventDate)}</Table.Cell>
    <Table.Cell>{schedule.remarks}</Table.Cell>
  </Table.Row>
);
