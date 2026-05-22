import {
  Box,
  Center,
  Heading,
  Link as ChakraLink,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDetailPage } from "../../hooks/detail/useDetailPage";
import { formatForDisplay } from "../../utils/date";
import { ParticipantAdder } from "./components/ParticipantAdder";
import { ParticipantRow } from "./components/ParticipantRow";

export const DetailPage = () => {
  const { scheduleId, schedule, loading } = useDetailPage();

  if (loading)
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );

  if (!schedule)
    return (
      <Stack gap={4}>
        <Text>スケジュールが見つかりませんでした。</Text>
        <ChakraLink asChild color="blue.600">
          <RouterLink to="/">← 一覧へ戻る</RouterLink>
        </ChakraLink>
      </Stack>
    );

  return (
    <Stack gap={6}>
      <ChakraLink asChild color="blue.600">
        <RouterLink to="/">← 一覧へ戻る</RouterLink>
      </ChakraLink>

      <Box bg="white" borderWidth="1px" borderRadius="md" p={6}>
        <Heading size="lg" mb={2}>
          {schedule.eventName}
        </Heading>
        <Text color="gray.700">
          集合時間: {formatForDisplay(schedule.eventDate)}
        </Text>
        {schedule.remarks && (
          <Text color="gray.700">備考: {schedule.remarks}</Text>
        )}
      </Box>

      <Box>
        <Heading size="md" mb={3}>
          参加者一覧
        </Heading>
        <Stack gap={2} mb={4}>
          {schedule.participants.length === 0 && (
            <Text color="gray.500">参加者はいません。</Text>
          )}
          {schedule.participants.map((name) => (
            <ParticipantRow key={name} scheduleId={scheduleId} name={name} />
          ))}
        </Stack>

        <ParticipantAdder scheduleId={scheduleId} />
      </Box>
    </Stack>
  );
};
