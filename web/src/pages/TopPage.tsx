import {
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { ScheduleDTO, ScheduleInputDTO } from "../api/types";
import { ScheduleEditRow } from "../components/ScheduleEditRow";
import { ScheduleDraftRow } from "../components/ScheduleDraftRow";

const onError = (err: unknown) =>
  window.alert(err instanceof Error ? err.message : String(err));

export const TopPage = () => {
  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getFutureSchedules()
      .then((res) => setSchedules(res))
      .catch(onError)
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (id: number, patch: Partial<ScheduleInputDTO>) => {
    api.updateSchedule(id, patch).catch(onError);
  };

  const handleDelete = (id: number) => {
    api.deleteSchedule(id).catch(onError);
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreate = (input: ScheduleInputDTO) => {
    api
      .createSchedule(input)
      .then((created) => setSchedules((prev) => [...prev, created]))
      .catch(onError);
  };

  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">スケジュール一覧</Heading>
        <ChakraLink asChild color="blue.600">
          <RouterLink to="/past">過去の予定 →</RouterLink>
        </ChakraLink>
      </Flex>

      {loading ? (
        <Spinner />
      ) : (
        <Table.Root size="md" variant="outline" bg="white">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>イベント名</Table.ColumnHeader>
              <Table.ColumnHeader>集合時間</Table.ColumnHeader>
              <Table.ColumnHeader>備考</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {schedules.map((schedule) => (
              <ScheduleEditRow
                key={schedule.id}
                schedule={schedule}
                onUpdate={(patch) => handleUpdate(schedule.id, patch)}
                onDelete={() => handleDelete(schedule.id)}
                onOpen={() => navigate(`/${schedule.id}`)}
              />
            ))}
            <ScheduleDraftRow onCreate={handleCreate} />
          </Table.Body>
        </Table.Root>
      )}

      {!loading && schedules.length === 0 && (
        <Text mt={4} color="gray.500">
          予定はありません。下の行から追加できます。
        </Text>
      )}
    </>
  );
};
