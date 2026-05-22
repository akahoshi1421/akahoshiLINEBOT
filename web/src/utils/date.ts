import { format, parseISO } from "date-fns";

// ISO 文字列 ↔ <input type="datetime-local"> の値(ローカル時刻 "yyyy-MM-ddTHH:mm")変換

export const isoToLocalInput = (iso: string | null): string =>
  iso ? format(parseISO(iso), "yyyy-MM-dd'T'HH:mm") : "";

export const localInputToIso = (value: string): string | null =>
  value ? parseISO(value).toISOString() : null;

// 一覧などでの表示用フォーマット
export const formatForDisplay = (iso: string | null): string =>
  iso ? format(parseISO(iso), "yyyy/MM/dd HH:mm") : "日程未定";
