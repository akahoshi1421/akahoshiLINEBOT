// ISO 文字列 ↔ <input type="datetime-local"> の値(ローカル時刻 "YYYY-MM-DDTHH:mm")変換

export const isoToLocalInput = (iso: string | null): string => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

export const localInputToIso = (value: string): string | null => {
  if (!value) return null;
  return new Date(value).toISOString();
};

// 一覧などでの表示用フォーマット
export const formatForDisplay = (iso: string | null): string => {
  if (!iso) return "日程未定";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};
