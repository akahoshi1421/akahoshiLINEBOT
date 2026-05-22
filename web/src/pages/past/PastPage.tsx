import {
  Center,
  Flex,
  Heading,
  Link as ChakraLink,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { usePastPage } from "../../hooks/past/usePastPage";
import { PastScheduleRow } from "./components/PastScheduleRow";

export const PastPage = () => {
  const { schedules, loading } = usePastPage();
  const navigate = useNavigate();

  return (
    <>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">過去の予定</Heading>
        <ChakraLink asChild color="blue.600">
          <RouterLink to="/">← 一覧へ戻る</RouterLink>
        </ChakraLink>
      </Flex>

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : schedules.length === 0 ? (
        <Text color="gray.500">過去の予定はありません。</Text>
      ) : (
        <Table.Root size="md" variant="outline" bg="white">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>イベント名</Table.ColumnHeader>
              <Table.ColumnHeader>集合時間</Table.ColumnHeader>
              <Table.ColumnHeader>備考</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {schedules.map((schedule) => (
              <PastScheduleRow
                key={schedule.id}
                schedule={schedule}
                onOpen={() => navigate(`/${schedule.id}`)}
              />
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};
