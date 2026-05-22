import { Button, Input, Table } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { createScheduleAtom } from "../../../atoms/schedules";
import { localInputToIso } from "../../../utils/date";

const empty = { eventName: "", eventDate: "", remarks: "" };

// 最下部の新規追加行。onBlur では登録せず「追加」ボタン押下で登録する。
// 作成はグローバルなミューテーション atom を直接利用するので props は不要。
export const ScheduleDraftRow = () => {
  const { mutate: create } = useAtomValue(createScheduleAtom);
  const [draft, setDraft] = useState(empty);

  const commit = () => {
    if (!draft.eventName.trim()) return;
    create({
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
