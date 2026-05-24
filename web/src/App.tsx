import { Box, Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { DetailPage } from "./pages/detail/DetailPage";
import { PastPage } from "./pages/past/PastPage";
import { TopPage } from "./pages/top/TopPage";

export const App = () => (
  <Box minH="100vh" bg="gray.50" py={6}>
    <Container maxW="4xl" overflowX="scroll">
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/past" element={<PastPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </Container>
  </Box>
);
