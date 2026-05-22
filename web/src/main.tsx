import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";
import { queryClient } from "./atoms/queryClient";

// 共有 QueryClient を jotai の queryClientAtom にハイドレートし、
// すべての atomWithQuery/atomWithMutation が同じインスタンスを使うようにする
const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <HydrateAtoms>
        <ChakraProvider value={defaultSystem}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ChakraProvider>
      </HydrateAtoms>
    </Provider>
  </React.StrictMode>
);
