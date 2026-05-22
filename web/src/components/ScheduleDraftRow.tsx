import { Button, Input, Table } from "@chakra-ui/react";
import { useState } from "react";
import type { ScheduleInputDTO } from "../api/types";
import { localInputToIso } from "../utils/date";

type Props = {
  onCreate: (input: ScheduleInputDTO) => void;
};

const empty = { eventName: "", eventDate: "", remarks: "" };

// 最下部の新規追加行。既存行と違い onBlur では登録せず、「追加」ボタン押下で登録する。
export const ScheduleDraftRow = ({ onCreate }: Props) => {
  const [draft, setDraft] = useState(empty);

  const commit = () => {
    if (!draft.eventName.trim()) return;
    onCreate({
      eventName: draft.eventName,
      eventDate: localInputToIso(draft.eventDate),
      remarks: draft.remarks,
    });
    setDraft(empty);
  };

  return (
    <Table.Row bg="blue.50">
      <Table.Cell>
        <Input
          value={draft.eventName}
          placeholder="＋ 新規追加"
          onChange={(e) => setDraft({ ...draft, eventName: e.target.value })}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          type="datetime-local"
          value={draft.eventDate}
          onChange={(e) => setDraft({ ...draft, eventDate: e.target.value })}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={draft.remarks}
          placeholder="備考"
          onChange={(e) => setDraft({ ...draft, remarks: e.target.value })}
        />
      </Table.Cell>
      <Table.Cell>
        <Button size="sm" colorPalette="blue" onClick={commit}>
          追加
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
