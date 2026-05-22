import type {
  GassmaSchemaParticipantCreateReturn,
  GassmaSchemaScheduleCreateReturn,
} from "../../generated/gassma/schemaClient";

// スケジュール一覧シートの 1 レコード
export type ScheduleRecord = GassmaSchemaScheduleCreateReturn;

// 参加者シートの 1 レコード
export type ParticipantRecord = GassmaSchemaParticipantCreateReturn;

// include: { participants: true } を付けて取得した際の型。
// 生成される FindResult の戻り値型には include の関連が含まれないため、
// アプリ側でリレーションを足した型を定義してキャストに利用する。
export type ScheduleWithParticipants = ScheduleRecord & {
  participants: ParticipantRecord[];
};
