import { Button, Input, Table } from "@chakra-ui/react";
import { useScheduleDraft } from "../../../hooks/top/useScheduleDraft";

// 最下部の新規追加行。onBlur では登録せず「追加」ボタン押下で登録する
// （状態と登録ロジックは useScheduleDraft）。
export const ScheduleDraftRow = () => {
  const { draft, update, commit } = useScheduleDraft();

  return (
    <Table.Row bg="blue.50">
      <Table.Cell>
        <Input
          minW="140px"
          value={draft.eventName}
          placeholder="＋ 新規追加"
          onChange={(e) => update({ eventName: e.target.value })}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="140px"
          type="datetime-local"
          value={draft.eventDate}
          onChange={(e) => update({ eventDate: e.target.value })}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="140px"
          value={draft.remarks}
          placeholder="備考"
          onChange={(e) => update({ remarks: e.target.value })}
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
