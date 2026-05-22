import {
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useTopPage } from "../../hooks/top/useTopPage";
import { ScheduleDraftRow } from "./components/ScheduleDraftRow";
import { ScheduleEditRow } from "./components/ScheduleEditRow";

export const TopPage = () => {
  const { schedules, loading } = useTopPage();

  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">スケジュール一覧</Heading>
        <ChakraLink asChild color="blue.600">
          <RouterLink to="/past">過去の予定 →</RouterLink>
        </ChakraLink>
      </Flex>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
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
              <ScheduleEditRow key={schedule.id} schedule={schedule} />
            ))}
            <ScheduleDraftRow />
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
