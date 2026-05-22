import { Button, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { ScheduleDTO } from "../../../api/types";
import { formatForDisplay } from "../../../utils/date";

type Props = {
  schedule: ScheduleDTO;
};

// 過去の予定 1 件分の表示行（イベント名から詳細へ遷移）
export const PastScheduleRow = ({ schedule }: Props) => {
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Table.Cell>
        <Button
          variant="plain"
          color="blue.600"
          p={0}
          h="auto"
          onClick={() => navigate(`/${schedule.id}`)}
        >
          {schedule.eventName}
        </Button>
      </Table.Cell>
      <Table.Cell>{formatForDisplay(schedule.eventDate)}</Table.Cell>
      <Table.Cell>{schedule.remarks}</Table.Cell>
    </Table.Row>
  );
};
