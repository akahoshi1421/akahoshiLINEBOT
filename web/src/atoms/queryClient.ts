import { MutationCache, QueryCache, QueryClient } from "@tanstack/query-core";
import { onError } from "../utils/onError";

// アプリ全体で共有する QueryClient。
// main.tsx で queryClientAtom にハイドレートし、atomWithQuery/atomWithMutation と
// 直接の invalidateQueries が同じインスタンスを使うようにする。
// クエリ/ミューテーションの失敗はここで一括ハンドリングする。
export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
});
