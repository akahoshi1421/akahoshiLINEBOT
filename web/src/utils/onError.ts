// API 呼び出し失敗時の共通ハンドラ
export const onError = (err: unknown) =>
  window.alert(err instanceof Error ? err.message : String(err));
